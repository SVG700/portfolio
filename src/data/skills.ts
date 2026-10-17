// Grouped skills. `level` is only set where it needs qualifying — no
// percentage bars. `evidence` lists project ids from projects.ts.

export type Skill = { name: string; level?: 'Learning' | 'Basic' }

export type SkillGroup = {
  title: string
  description: string
  skills: Skill[]
  evidence: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    description: 'TypeScript for most web work, Python for backend and data work, and C.',
    skills: [
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Python' },
      { name: 'C' },
      { name: 'Java', level: 'Learning' },
      { name: 'XML', level: 'Basic' },
    ],
    evidence: ['heliohub', 'ecobuddy', 'paimana'],
  },
  {
    title: 'Frontend',
    description: 'Responsive interfaces, dashboards and data views.',
    skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'HTML & CSS' }, { name: 'Tailwind CSS' }],
    evidence: ['nexora', 'heliohub', 'nyayalens'],
  },
  {
    title: 'Backend & data',
    description: 'APIs, auth and Postgres-backed persistence.',
    skills: [{ name: 'FastAPI' }, { name: 'Supabase' }, { name: 'REST APIs' }],
    evidence: ['paimana', 'payperview', 'ecobuddy'],
  },
  {
    title: 'Applied AI',
    description: 'Integrating LLMs into product features, with server-side keys and offline fallbacks.',
    skills: [{ name: 'Gemini API integration' }, { name: 'Forecasting concepts' }, { name: 'Graph analysis concepts' }],
    evidence: ['ecobuddy', 'nyayalens', 'nexora'],
  },
  {
    title: 'Mobile & Web3',
    description: 'Android from my first project; blockchain through team hackathon work.',
    skills: [{ name: 'Android development' }, { name: 'Web3 / Algorand' }],
    evidence: ['owaste', 'payperview'],
  },
  {
    title: 'Tools',
    description: 'Version control and deployment.',
    skills: [{ name: 'Git & GitHub' }, { name: 'Vercel' }],
    evidence: [],
  },
]
