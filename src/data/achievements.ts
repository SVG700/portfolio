// Content lives in src/content/*.json (edited via the admin portal, Pages CMS).
// This file only adds TypeScript types.
import content from '../content/achievements.json'
export const achievements = content.achievements as Achievement[]

// Recognition. Each result appears once on the site — here — and links to its
// project where there is one. Wording and years match the resume.

export type Achievement = {
  /** Short figure set large in the UI — only real, confirmed values. */
  figure: string
  title: string
  detail: string
  year?: string
  project?: string
  /** Optional certificate or evidence URL. Never add one that doesn't exist. */
  evidenceUrl?: string
}
