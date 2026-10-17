import type { ReactNode } from 'react'

/** Small running label used to open each section: "(01) Selected work". */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="meta flex items-center gap-3 text-muted">
      <span className="text-accent">({index})</span>
      {children}
    </p>
  )
}
