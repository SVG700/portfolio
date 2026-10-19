import { m, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { DURATION, EASE, VIEW_ONCE, useMotionAllowed } from '../motion-shared'

// The visible state is inset by -12% so the clip ends *outside* the element
// and never trims its drop shadow; hidden states keep the same units so the
// values interpolate smoothly.
const FROM = {
  left: 'inset(-12% 100% -12% -12%',
  bottom: 'inset(100% -12% -12% -12%',
} as const

/**
 * Wipes its content in with a clip-path (no layout change). Runs once when
 * it enters the viewport, or on mount with `immediate`. With reduced motion
 * it renders a plain element.
 *
 * The viewport is watched on an unclipped outer wrapper: Chrome's
 * IntersectionObserver honours the target's own clip-path, so a fully
 * clipped element would never report itself as visible.
 */
export function ClipReveal({
  children,
  from = 'left',
  radius = 10,
  delay = 0,
  immediate = false,
  className = '',
}: {
  children: ReactNode
  from?: keyof typeof FROM
  radius?: number
  delay?: number
  immediate?: boolean
  className?: string
}) {
  const allowed = useMotionAllowed()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEW_ONCE)
  if (!allowed) return <div className={className}>{children}</div>
  const hidden = { clipPath: `${FROM[from]} round ${radius}px)` }
  const shown = { clipPath: `inset(-12% -12% -12% -12% round ${radius}px)` }
  const transition = { duration: DURATION.slow, ease: EASE, delay }
  return (
    <div ref={ref} className={className}>
      <m.div initial={hidden} animate={immediate || inView ? shown : hidden} transition={transition}>
        {children}
      </m.div>
    </div>
  )
}
