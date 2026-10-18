import { useReducedMotion } from 'framer-motion'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { isNativeApp } from '../platform'
import { GraphFallback } from './GraphFallback'

const HeroScene = lazy(() => import('./HeroScene'))

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Hero backdrop: a static SVG of the network is always rendered first. The
 * WebGL version replaces it only when motion is allowed, WebGL works, and
 * we're not in the Android app; it loads after the page is idle and stops
 * rendering whenever it's off-screen or the tab is hidden.
 */
export function HeroBackdrop({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [want3d, setWant3d] = useState(false)
  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)
  const [gaveUp, setGaveUp] = useState(false)
  const running = inView && tabVisible

  // Decide, then fetch three.js (~250 KB gzipped) only after the page has
  // fully loaded and the browser is idle, so it never competes with first paint.
  useEffect(() => {
    if (reduce || isNativeApp || !webglAvailable()) return
    // The hero's right column (and this backdrop) only shows from tablet width
    // up — never download three.js for a phone layout.
    const wide = window.matchMedia('(min-width: 768px)')
    let cancelled = false
    const start = () => {
      if (cancelled) return
      if (wide.matches) setWant3d(true)
      else wide.addEventListener('change', () => wide.matches && !cancelled && setWant3d(true), { once: true })
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

  // Pointer lean on fine pointers only; touch devices just auto-rotate.
  useEffect(() => {
    if (!want3d || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth - 0.5
      pointer.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [want3d])

  return (
    <div
      ref={box}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      data-scene={want3d && !gaveUp ? (running ? 'running' : 'paused') : 'static'}
    >
      <GraphFallback
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${ready && !gaveUp ? 'opacity-0' : 'opacity-100'}`}
      />
      {want3d && !gaveUp && (
        <Suspense fallback={null}>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
            <HeroScene running={running} pointer={pointer} onReady={() => setReady(true)} onGiveUp={() => setGaveUp(true)} />
          </div>
        </Suspense>
      )}
    </div>
  )
}
