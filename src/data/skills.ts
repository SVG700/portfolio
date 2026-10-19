// Content lives in src/content/*.json (edited via the admin portal, Pages CMS).
// This file only adds TypeScript types.
import content from '../content/skills.json'
export const skillGroups = content.skillGroups as SkillGroup[]

// Skills, grouped. Each group lists projects where the skills are used.
// `level` qualifies the few that are still being learned — no percentages.

export type Skill = { name: string; level?: 'learning' | 'basic' }

export type SkillGroup = {
  title: string
  skills: Skill[]
  evidence: string[]
}
