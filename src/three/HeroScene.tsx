// WebGL knowledge graph for the hero. Loaded lazily (its own chunk) by
// HeroBackdrop, which decides whether to render it at all.
//
// Nodes are the site's real projects, skills and awards (see knowledge.ts).
// On desktop the graph leans toward the pointer; the node nearest the cursor
// lights up together with everything it is linked to. Scrolling pushes the
// camera into the graph. Labels are plain DOM elements positioned from here
// each frame (no React re-renders).
import { PerformanceMonitor } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'
import { K_DUST, K_EDGES, K_NEIGHBOURS, K_NODES, K_SHELL_EDGES, K_SHELL_NODES, KIND_COLOR, KIND_SIZE } from './knowledge'

export type ScenePointer = { x: number; y: number; cx: number; cy: number; active: boolean }

const PICK_RADIUS = 30 // px
const EDGE_DIM = new THREE.Color('#8f9bb5').multiplyScalar(0.34)
const EDGE_HOT = new THREE.Color('#c8f560')

const pointVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPx;
  attribute float aSize;
  attribute float aPhase;
  attribute float aHot;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float pulse = 0.82 + 0.18 * sin(uTime * 1.4 + aPhase);
    gl_PointSize = aSize * uPx * (pulse + aHot * 0.7) * (4.0 / -mv.z);
    // nodes on the far side are dimmer; lit nodes are always bright
    float depth = smoothstep(-6.0, -2.8, mv.z);
    vAlpha = mix(depth * (0.5 + 0.5 * pulse), 1.0, aHot);
    vColor = aColor;
    gl_Position = projectionMatrix * mv;
  }
`
const pointFragment = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.26, 0.2, d);
    float halo = smoothstep(0.5, 0.1, d) * 0.35;
    float a = (core + halo) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`

function Graph({
  pointer,
  overlay,
  hover,
  interactive,
}: {
  pointer: RefObject<ScenePointer>
  overlay: RefObject<HTMLDivElement | null>
  hover: RefObject<number>
  interactive: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const { camera, gl, size } = useThree()
  const lastHover = useRef(-2)
  const intro = useRef(0)
  const v = useMemo(() => new THREE.Vector3(), [])

  const { points, edges, dust, shell, uniforms } = useMemo(() => {
    const n = K_NODES.length
    const p = new THREE.BufferGeometry()
    const color = new THREE.Color()
    const colors = new Float32Array(n * 3)
    K_NODES.forEach((node, i) => color.set(KIND_COLOR[node.kind]).toArray(colors, i * 3))
    p.setAttribute('position', new THREE.BufferAttribute(new Float32Array(K_NODES.flatMap((k) => k.pos)), 3))
    p.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    p.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(K_NODES.map((k) => KIND_SIZE[k.kind])), 1))
    p.setAttribute('aPhase', new THREE.BufferAttribute(new Float32Array(K_NODES.map((_, i) => (i * 2.399) % (Math.PI * 2))), 1))
    p.setAttribute('aHot', new THREE.BufferAttribute(new Float32Array(n), 1))

    const e = new THREE.BufferGeometry()
    const ep = new Float32Array(K_EDGES.length * 6)
    const ec = new Float32Array(K_EDGES.length * 6)
    K_EDGES.forEach(([a, b], i) => {
      ep.set(K_NODES[a].pos, i * 6)
      ep.set(K_NODES[b].pos, i * 6 + 3)
      EDGE_DIM.toArray(ec, i * 6)
      EDGE_DIM.toArray(ec, i * 6 + 3)
    })
    e.setAttribute('position', new THREE.BufferAttribute(ep, 3))
    e.setAttribute('color', new THREE.BufferAttribute(ec, 3))

    const d = new THREE.BufferGeometry()
    d.setAttribute('position', new THREE.BufferAttribute(new Float32Array(K_DUST.flat()), 3))
    const sh = new THREE.BufferGeometry()
    const sp = new Float32Array(K_SHELL_EDGES.length * 6)
    K_SHELL_EDGES.forEach(([a, b], i) => {
      sp.set(K_SHELL_NODES[a], i * 6)
      sp.set(K_SHELL_NODES[b], i * 6 + 3)
    })
    sh.setAttribute('position', new THREE.BufferAttribute(sp, 3))
    return { points: p, edges: e, dust: d, shell: sh, uniforms: { uTime: { value: 0 }, uPx: { value: 1 } } }
  }, [])

  /** Light a node, its links and its neighbours (or clear with -1). */
  const highlight = (index: number) => {
    const hot = points.getAttribute('aHot') as THREE.BufferAttribute
    const col = edges.getAttribute('color') as THREE.BufferAttribute
    for (let i = 0; i < K_NODES.length; i++) hot.setX(i, 0)
    K_EDGES.forEach(([a, b], i) => {
      const on = index >= 0 && (a === index || b === index)
      const c = on ? EDGE_HOT : EDGE_DIM
      col.setXYZ(i * 2, c.r, c.g, c.b)
      col.setXYZ(i * 2 + 1, c.r, c.g, c.b)
    })
    if (index >= 0) {
      hot.setX(index, 1)
      for (const j of K_NEIGHBOURS[index]) hot.setX(j, 0.55)
    }
    hot.needsUpdate = true
    col.needsUpdate = true
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t
    uniforms.uPx.value = gl.getPixelRatio()
    const g = group.current
    if (!g) return
    const p = pointer.current
    const hovering = hover.current >= 0

    // The graph assembles on load: it grows from a point while spinning in.
    intro.current = Math.min(1, intro.current + delta * 0.55)
    const k = 1 - Math.pow(1 - intro.current, 3)

    // Slow spin (slower while a node is lit), plus a lean toward the pointer.
    g.rotation.y += delta * (hovering ? 0.012 : 0.06) + (1 - k) * delta * 1.4
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -0.22 + p.y * 0.3, 3, delta)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, p.x * -0.08, 3, delta)
    g.position.x = THREE.MathUtils.damp(g.position.x, p.x * 0.12, 3, delta)

    // Scroll pushes the camera through the graph.
    const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 0.9))
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 4.6 - scroll * 2.4, 5, delta)
    g.scale.setScalar(k * (1 + scroll * 0.25))
    g.updateMatrixWorld()

    // Project every node to the screen: place labels, find the hovered node.
    const el = overlay.current
    const labels = el?.children
    let best = -1
    let bestD = PICK_RADIUS
    let li = 0
    for (let i = 0; i < K_NODES.length; i++) {
      const node = K_NODES[i]
      v.set(node.pos[0], node.pos[1], node.pos[2]).applyMatrix4(g.matrixWorld)
      const camZ = camera.position.z - v.z
      v.project(camera)
      const sx = (v.x * 0.5 + 0.5) * size.width
      const sy = (-v.y * 0.5 + 0.5) * size.height
      if (interactive && p.active && camZ > 0.4) {
        const d = Math.hypot(sx - p.cx, sy - p.cy)
        // prefer project nodes slightly so they are easy to hit
        const reach = node.kind === 'project' ? d * 0.75 : d
        if (reach < bestD) {
          bestD = reach
          best = i
        }
      }
      if (node.kind === 'project' && labels && labels[li]) {
        const label = labels[li] as HTMLElement
        const front = THREE.MathUtils.clamp((5.3 - camZ) / 1.9, 0, 1)
        const lit = hover.current === i || (hover.current >= 0 && K_NEIGHBOURS[hover.current].includes(i))
        label.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0)`
        label.style.opacity = String((lit ? 1 : 0.18 + front * 0.6) * k * (1 - scroll))
        label.style.color = lit ? '#c8f560' : ''
        li++
      }
    }

    if (best !== lastHover.current) {
      lastHover.current = best
      hover.current = best
      highlight(best)
      const tip = el?.lastElementChild as HTMLElement | null
      if (tip) {
        const node = best >= 0 ? K_NODES[best] : null
        // project nodes already carry a label; the tip names skills and awards
        tip.textContent = node && node.kind !== 'project' ? node.label : ''
        tip.style.opacity = node && node.kind !== 'project' ? '1' : '0'
      }
      document.body.style.cursor = best >= 0 && K_NODES[best].projectId ? 'pointer' : ''
    }
    const tip = el?.lastElementChild as HTMLElement | null
    if (tip && best >= 0) tip.style.transform = `translate3d(${p.cx + 14}px, ${p.cy + 14}px, 0)`
  })

  return (
    <group ref={group} rotation={[-0.22, 0.5, 0]} scale={0.001}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <lineSegments geometry={shell}>
        <lineBasicMaterial color="#7c8cff" transparent opacity={0.11} depthWrite={false} />
      </lineSegments>
      <points geometry={dust}>
        <pointsMaterial color="#8f9bb5" size={0.014} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
      </points>
      <points geometry={points}>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={pointVertex}
          fragmentShader={pointFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function HeroScene({
  running,
  pointer,
  overlay,
  hover,
  interactive,
  onReady,
  onGiveUp,
}: {
  running: boolean
  pointer: RefObject<ScenePointer>
  /** Container whose children are the project labels, then the hover tip. */
  overlay: RefObject<HTMLDivElement | null>
  /** Index of the node under the cursor (-1 for none); read by click handling. */
  hover: RefObject<number>
  /** Hover picking is desktop-only; touch devices just watch it turn. */
  interactive: boolean
  onReady: () => void
  /** Called if the device keeps struggling even at 1× — show the static image instead. */
  onGiveUp: () => void
}) {
  // Start at up to 1.5× pixel ratio; drop to 1× if the device struggles.
  const [dpr, setDpr] = useState(1.5)
  const slow = useRef(0)
  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={running ? 'always' : 'never'}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={() => onReady()}
    >
      <PerformanceMonitor
        onDecline={() => {
          // First drop to 1×. Only if the frame rate is still poor there,
          // three times over, hand back to the static image.
          if (dpr > 1) return setDpr(1)
          if (++slow.current >= 3) onGiveUp()
        }}
      />
      <Graph pointer={pointer} overlay={overlay} hover={hover} interactive={interactive} />
    </Canvas>
  )
}
