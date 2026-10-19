// Content lives in src/content/*.json (edited via the admin portal, Pages CMS).
// This file only adds TypeScript types.
import content from '../content/experience.json'
export const roles = content.roles as Role[]

// Experience and leadership, newest first. Wording follows the resume; leave
// `detail` out rather than inventing duties.

export type Role = {
  title: string
  organisation: string
  period?: string
  detail?: string
}
