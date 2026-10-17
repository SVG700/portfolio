import { m, useScroll, useSpring } from 'framer-motion'

/** Thin lime reading-progress bar along the top edge (transform only). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX, top: 'var(--safe-top)' }}
    />
  )
}
