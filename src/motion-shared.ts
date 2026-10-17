// Motion constants and hooks shared by components (kept out of motion.tsx so
// that file only exports components, which React Fast Refresh needs).
import { useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { isNativeApp } from './platform'

export const EASE = [0.16, 1, 0.3, 1] as const
/** Android app: lighter, shorter motion. */
export const LITE = isNativeApp
export const DIST = LITE ? 8 : 18
export const DUR = LITE ? 0.35 : 0.65

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

