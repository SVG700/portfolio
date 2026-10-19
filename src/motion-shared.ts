// Motion constants and hooks shared by components (kept out of motion.tsx so
// that file only exports components, which React Fast Refresh needs).
import { useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { isNativeApp } from './platform'

/**
 * Motion tokens — the one motion language for the whole site. Every entry
 * animation uses EASE and one of these durations/staggers; CSS animations
 * mirror them via --ease-out-expo and --dur-* in index.css.
 */
export const EASE = [0.16, 1, 0.3, 1] as const
/** Android app: lighter, shorter motion. */
export const LITE = isNativeApp
export const DIST = LITE ? 8 : 18
export const DUR = LITE ? 0.35 : 0.65
export const DURATION = { fast: 0.4, base: DUR, slow: LITE ? 0.6 : 1.1 } as const
export const STAGGER = { chars: 0.012, words: 0.05, items: LITE ? 0.03 : 0.06 } as const
/** Shared viewport rule: animate once, as content approaches the viewport. */
export const VIEW_ONCE = { once: true, amount: 0.3, margin: '0px 0px -8% 0px' } as const

/**
 * Framer's reducedMotion="user" only drops transform animations; effects
 * built on clip-path, text scrambling or CSS loops check this instead.
 */
export function useMotionAllowed() {
  return !useReducedMotion()
}

/** True on desktop-class pointers, outside the app, with motion allowed. */
export function usePointerFx() {
  const reduce = useReducedMotion()
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return fine && !reduce && !isNativeApp
}

export const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: LITE ? 0.03 : 0.06 } },
}
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: DIST * 0.7 },
  show: { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } },
}

