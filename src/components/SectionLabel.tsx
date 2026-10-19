import { m } from 'framer-motion'
import { EASE } from '../motion-shared'
import { Decode } from './Decode'

/**
 * Small running label that opens each section: "(01) ——— Selected work".
 * The lime rule draws in and the text decodes when the label scrolls into
 * view (both static with reduced motion).
 */
export function SectionLabel({ index, children }: { index: string; children: string }) {
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
      <Decode text={children} />
    </p>
  )
}
