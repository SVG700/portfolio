// Content lives in src/content/*.json (edited via the admin portal, Pages CMS).
// This file only adds TypeScript types.
import content from '../content/projects.json'
// The admin portal can leave a half-filled visual behind; drop it so the UI
// falls back to text instead of rendering a broken frame.
const usable = (v?: ProjectVisual) =>
  v && ((v.type === 'screenshot' && v.src) || (v.type === 'mock' && v.kind)) ? v : undefined

export const projects = (content.projects as Project[]).map((p) => ({ ...p, visual: usable(p.visual) }))

// Project content. Every claim here should be traceable to a repo README,
// source code, the resume, or details Samhith has confirmed. Leave fields
// undefined rather than guessing — the UI hides anything that is missing.
//
// Competition results (SIH, RIFT, Expo placings) live in achievements.ts and
// are shown once there; projects only mention the context they were built in.

export type ProjectStatus = 'Live demo' | 'In development' | 'Prototype' | 'Local prototype'

/**
 * What the project shows visually (tablet and desktop only — on phones the
 * cards are text-only so nothing renders illegibly small).
 * - `screenshot`: a real capture of the deployed app (public/work/*.webp).
 * - `mock`: an interface preview built in code for projects with no public
 *   build. These use synthetic values and are labelled as such.
 */
export type ProjectVisual =
  | { type: 'screenshot'; src: string; alt: string; caption: string }
  | { type: 'mock'; kind: 'nexora' | 'paimana' | 'ecobuddy' }

export type Project = {
  id: string
  name: string
  category: string
  /** One-line problem statement. */
  problem: string
  summary: string
  status: ProjectStatus
  /** featured = large cards at the top; more = compact grid. */
  tier: 'featured' | 'more'
  role?: string
  context?: string
  features: string[]
  stack: string[]
  /** repoLabel overrides the "Code" link text where the repo needs context. */
  links: { repo?: string; repoLabel?: string; demo?: string }
  /** Honest caveats shown in the project overview. */
  notes?: string[]
  visual?: ProjectVisual
}
