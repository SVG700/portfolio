// Content lives in src/content/*.json (edited via the admin portal, Pages CMS).
// This file only adds TypeScript types.
import content from '../content/profile.json'
export const education = content.education as Education[]
export const activities = content.activities as string[]
export const languages = content.languages as { name: string; level: string }[]
export const profile = content.profile as Omit<typeof content.profile, 'androidAppUrl'> & {
  /** Null hides the "Get the Android app" link. */
  androidAppUrl: string | null
}


export type Education = {
  institution: string
  degree: string
  period: string
  note?: string
}
