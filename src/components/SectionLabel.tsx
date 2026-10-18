import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '../motion-shared'

/**
 * Small running label that opens each section: "(01) ——— Selected work".
 * The lime rule draws in when the label scrolls into view (static with
 * reduced motion, since MotionConfig drops the transform).
 */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="meta flex items-center gap-3 text-muted">
      <span className="text-accent">({index})</span>
      <m.span
        aria-hidden="true"
        className="h-px w-8 origin-left bg-accent/70"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
      />
      {children}
    </p>
  )
}
