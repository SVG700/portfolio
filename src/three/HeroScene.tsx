// WebGL node-graph sphere for the hero. Loaded lazily (its own chunk) by
// HeroBackdrop, which decides whether to render it at all.
import { PerformanceMonitor } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState, type RefObject } from 'react'
import * as THREE from 'three'
import { EDGES, NODES } from './graph'

const LIME = new THREE.Color('#d4f36a')
const HIGHLIGHTS = 7 // edges lit at once
const SWAP_EVERY = 2.4 // seconds between highlight changes

const pointVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aPhase;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float pulse = 0.75 + 0.25 * sin(uTime * 1.6 + aPhase);
    gl_PointSize = uSize * pulse * (3.2 / -mv.z);
    // nodes on the far side of the sphere are dimmer
    vAlpha = smoothstep(-4.4, -2.2, mv.z) * (0.55 + 0.45 * pulse);
    gl_Position = projectionMatrix * mv;
  }
`
const pointFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.15, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(uColor, a);
  }
`

function edgePositions(list: [number, number][]) {
  const arr = new Float32Array(list.length * 6)
  list.forEach(([a, b], i) => {
    arr.set(NODES[a], i * 6)
    arr.set(NODES[b], i * 6 + 3)
  })
  return arr
}

function Network({ pointer }: { pointer: RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)
  const hiMat = useRef<THREE.LineBasicMaterial>(null)
  const hiGeo = useRef<THREE.BufferGeometry>(null)
  const lastSwap = useRef(-SWAP_EVERY)

  const { edges, points, uniforms } = useMemo(() => {
    const e = new THREE.BufferGeometry()
    e.setAttribute('position', new THREE.BufferAttribute(edgePositions(EDGES), 3))
    const p = new THREE.BufferGeometry()
    p.setAttribute('position', new THREE.BufferAttribute(new Float32Array(NODES.flat()), 3))
    p.setAttribute('aPhase', new THREE.BufferAttribute(new Float32Array(NODES.map((_, i) => (i * 2.399) % (Math.PI * 2))), 1))
    return { edges: e, points: p, uniforms: { uTime: { value: 0 }, uSize: { value: 12 }, uColor: { value: LIME } } }
  }, [])

  const hiPositions = useMemo(() => new Float32Array(HIGHLIGHTS * 6), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t
    const g = group.current
    if (g) {
      // slow spin, plus a gentle lean toward the pointer (desktop only)
      g.rotation.y += delta * 0.07
      const p = pointer.current
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -0.3 + p.y * 0.25, 3, delta)
      g.position.x = THREE.MathUtils.damp(g.position.x, p.x * 0.08, 3, delta)
    }
    // every few seconds a handful of connections light up, then fade
    if (t - lastSwap.current > SWAP_EVERY && hiGeo.current) {
      lastSwap.current = t
      const pick = Array.from({ length: HIGHLIGHTS }, () => EDGES[Math.floor(Math.random() * EDGES.length)])
      hiPositions.set(edgePositions(pick))
      const attr = hiGeo.current.getAttribute('position') as THREE.BufferAttribute
      attr.needsUpdate = true
    }
    if (hiMat.current) {
      const phase = (t - lastSwap.current) / SWAP_EVERY // 0 → 1
      hiMat.current.opacity = Math.sin(phase * Math.PI) * 0.85
    }
  })

  return (
    <group ref={group} rotation={[-0.35, 0.6, 0]}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={LIME} transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
      <lineSegments>
        <bufferGeometry ref={hiGeo}>
          <bufferAttribute attach="attributes-position" args={[hiPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={hiMat} color={LIME} transparent opacity={0} depthWrite={false} />
      </lineSegments>
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
  onReady,
  onGiveUp,
}: {
  running: boolean
  pointer: RefObject<{ x: number; y: number }>
  onReady: () => void
  /** Called if the device keeps struggling even at 1× — show the static image instead. */
  onGiveUp: () => void
}) {
  // Start at up to 1.5× pixel ratio; drop to 1× if the device struggles.
  const [dpr, setDpr] = useState(1.5)
  return (
    <Canvas
      dpr={[1, dpr]}
      frameloop={running ? 'always' : 'never'}
      camera={{ position: [0, 0, 3.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={() => onReady()}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} flipflops={3} onFallback={onGiveUp} />
      <Network pointer={pointer} />
    </Canvas>
  )
}
