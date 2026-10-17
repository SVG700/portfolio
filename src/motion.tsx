// Shared motion primitives (Framer Motion, lazily loaded features).
//
// Rules this file enforces:
// - Only opacity/transform are animated.
// - prefers-reduced-motion: MotionConfig drops transform animations, and the
//   count-up / pointer effects below opt out entirely, so the page is complete
//   with motion off.
// - Android app ("lite"): shorter, smaller reveals; no pointer-driven effects.
// - Print: index.css forces every element visible.
import {
  animate,
  domAnimation,
  LazyMotion,
  m,
  MotionConfig,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { DIST, DUR, EASE, itemVariants, LITE, listVariants, usePointerFx } from './motion-shared'


export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' } as const

const tags = { div: m.div, li: m.li, article: m.article, p: m.p, h2: m.h2 }

/** Fades and slides its content in once, when it scrolls into view. */
export function Reveal({
  as = 'div',
  delay = 0,
  className,
  children,
}: {
  as?: keyof typeof tags
  delay?: number
  className?: string
  children: ReactNode
}) {
  const Tag = tags[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: DIST }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR, ease: EASE, delay }}
    >
      {children}
    </Tag>
  )
}

const lists = { ul: m.ul, ol: m.ol, div: m.div, dl: m.dl }

/** A list whose children (StaggerItem) reveal one after another. */
export function Stagger({
  as = 'ul',
  className,
  children,
}: {
  as?: keyof typeof lists
  className?: string
  children: ReactNode
}) {
  const Tag = lists[as]
  return (
    <Tag className={className} variants={listVariants} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </Tag>
  )
}

const items = { li: m.li, div: m.div, article: m.article }

export function StaggerItem({
  as = 'li',
  className,
  children,
}: {
  as?: keyof typeof items
  className?: string
  children: ReactNode
}) {
  const Tag = items[as]
  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  )
}

/**
 * Counts the first number in `text` up from zero the first time it scrolls
 * into view. The final text is identical to `text`, is what screen readers
 * get, and is shown as-is with reduced motion.
 */
export function CountUp({ text, className }: { text: string; className?: string }) {
  const match = text.match(/\d[\d,]*/)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const target = match ? Number(match[0].replace(/,/g, '')) : 0
  const commas = match ? match[0].includes(',') : false
  const format = (n: number) => (commas ? Math.round(n).toLocaleString('en-US') : String(Math.round(n)))

  // Before first paint, start from zero (only when motion is on).
  useLayoutEffect(() => {
    if (match && !reduce && ref.current) ref.current.textContent = format(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!match || reduce || !inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, target, {
      duration: LITE ? 0.8 : Math.min(1.6, 0.6 + Math.log10(target + 1) * 0.3),
      ease: EASE,
      onUpdate: (v) => (node.textContent = format(v)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce])

  if (!match) return <span className={className}>{text}</span>
  const [num] = match
  const i = match.index ?? 0
  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, i)}
        <span ref={ref} className="tabular-nums">
          {num}
        </span>
        {text.slice(i + num.length)}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

/** Counts up every "N+" figure inside a sentence (e.g. "350+", "5,000+"). */
export function CountText({ text }: { text: string }) {
  const parts = text.split(/(\d[\d,]*\+)/)
  if (parts.length === 1) return <>{text}</>
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <CountUp key={i} text={p} /> : p))}
    </>
  )
}

/** Gently pulls its child toward the pointer (desktop only). */
export function Magnetic({ children, strength = 0.22 }: { children: ReactNode; strength?: number }) {
  const enabled = usePointerFx()
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.4 })
  if (!enabled) return <>{children}</>
  return (
    <m.span
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </m.span>
  )
}
