import { useReducedMotion } from 'framer-motion'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useOpenProject } from '../drawer'
import { isNativeApp } from '../platform'
import { GraphFallback } from './GraphFallback'
import type { ScenePointer } from './HeroScene'
import { K_NODES } from './knowledge'

const HeroScene = lazy(() => import('./HeroScene'))

const FINE = '(hover: hover) and (pointer: fine)'
const LABELS = K_NODES.filter((n) => n.kind === 'project')

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Phones and tablets only get the live scene when they look capable. */
function capableDevice() {
  if (window.matchMedia(FINE).matches) return true
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return false
  return (nav.deviceMemory ?? 4) >= 4 && (nav.hardwareConcurrency ?? 4) >= 6
}

/**
 * Hero backdrop: a static SVG of the knowledge graph is always rendered
 * first. The WebGL version replaces it only when motion is allowed, WebGL
 * works, the device looks capable and we're not in the Android app; it loads
 * after the page is idle and stops rendering whenever it's off-screen or the
 * tab is hidden. On desktop pointers the graph is interactive: the node under
 * the cursor lights up, and clicking a project node opens that project.
 */
export function HeroBackdrop({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const open = useOpenProject()
  const box = useRef<HTMLDivElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const pointer = useRef<ScenePointer>({ x: 0, y: 0, cx: -1, cy: -1, active: false })
  const hover = useRef(-1)
  const [want3d, setWant3d] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)
  const [gaveUp, setGaveUp] = useState(false)
  const running = inView && tabVisible
  const live = want3d && !gaveUp

  // Decide, then fetch three.js (~250 KB gzipped) only after the page has
  // fully loaded and the browser is idle, so it never competes with first paint.
  useEffect(() => {
    if (reduce || isNativeApp || !webglAvailable() || !capableDevice()) return
    let cancelled = false
    const start = () => {
      if (cancelled) return
      setInteractive(window.matchMedia(FINE).matches)
      setWant3d(true)
    }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    const whenIdle = () => (w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 4000 }) : window.setTimeout(start, 1500))
    if (document.readyState === 'complete') whenIdle()
    else window.addEventListener('load', whenIdle, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', whenIdle)
    }
  }, [reduce])

  // Pause when off-screen or when the tab is hidden.
  useEffect(() => {
    if (!want3d || !box.current) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '100px' })
    io.observe(box.current)
    const onVis = () => setTabVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [want3d])

  // Pointer lean, hover picking and click-to-open — fine pointers only.
  useEffect(() => {
    if (!live || !interactive) return
    const onMove = (e: PointerEvent) => {
      const el = box.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = pointer.current
      p.x = e.clientX / window.innerWidth - 0.5
      p.y = e.clientY / window.innerHeight - 0.5
      p.cx = e.clientX - r.left
      p.cy = e.clientY - r.top
      // Controls and text links keep their own hover; the graph yields to them.
      const overControl = e.target instanceof Element && !!e.target.closest('a, button, header, [data-terminal]')
      p.active = !overControl && p.cx >= 0 && p.cy >= 0 && p.cx <= r.width && p.cy <= r.height
    }
    const onClick = (e: MouseEvent) => {
      const id = hover.current >= 0 ? K_NODES[hover.current].projectId : undefined
      if (!id || !pointer.current.active) return
      if (e.target instanceof Element && e.target.closest('a, button, header, dialog, [data-terminal]')) return
      open(id)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('click', onClick)
      document.body.style.cursor = ''
    }
  }, [live, interactive, open])

  return (
    <div
      ref={box}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      data-scene={live ? (running ? 'running' : 'paused') : 'static'}
    >
      <GraphFallback
        labels
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready && !gaveUp ? 'opacity-0' : 'opacity-100'}`}
      />
      {live && (
        <Suspense fallback={null}>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
            <HeroScene
              running={running}
              pointer={pointer}
              overlay={overlay}
              hover={hover}
              interactive={interactive}
              onReady={() => setReady(true)}
              onGiveUp={() => setGaveUp(true)}
            />
            {/* Labels: one per project node, then the hover tip. Positioned by the scene. */}
            <div ref={overlay} className="absolute inset-0 overflow-hidden">
              {LABELS.map((n) => (
                <span
                  key={n.label}
                  className="graph-label absolute top-0 left-0 hidden opacity-0 sm:block"
                >
                  <span className="block translate-x-3.5 -translate-y-1/2">{n.label}</span>
                </span>
              ))}
              <span className="graph-tip absolute top-0 left-0 opacity-0" />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  )
}
