import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { DURATION, useMotionAllowed } from '../motion-shared'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·<>#*'

/**
 * Mono label that "decodes": characters scramble and resolve left to right
 * (~0.4 s) the first time it scrolls into view. Final text is identical to
 * `text`, is what screen readers get, and shows as-is with reduced motion.
 * Only for monospace text, so the width never changes while it runs.
 */
export function Decode({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 1 })
  const allowed = useMotionAllowed()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || !allowed) return
    const total = DURATION.fast * 1000
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total)
      const revealed = Math.floor(p * text.length)
      el.textContent = [...text]
        .map((ch, i) => (i < revealed || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join('')
      if (p < 1) raf = requestAnimationFrame(tick)
      else el.textContent = text
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      el.textContent = text
    }
  }, [inView, allowed, text])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
