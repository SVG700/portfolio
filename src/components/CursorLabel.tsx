import { AnimatePresence, m, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePointerFx } from '../motion-shared'

/**
 * A small round label ("View") that follows the cursor while it is over an
 * element marked with `data-cursor`. Desktop pointers only; never rendered on
 * touch, in the Android app or with reduced motion. Purely decorative — the
 * marked elements are also reachable through their normal buttons.
 */
export function CursorLabel() {
  const enabled = usePointerFx()
  const [text, setText] = useState<string | null>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 500, damping: 40, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      setText(el ? el.getAttribute('data-cursor') : null)
    }
    const clear = () => setText(null)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', clear, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', clear)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <AnimatePresence>
      {text && (
        <m.div
          aria-hidden="true"
          className="cursor-label"
          style={{ x, y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {text}
        </m.div>
      )}
    </AnimatePresence>
  )
}
