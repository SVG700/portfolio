// Skills, grouped. Each group lists projects where the skills are used.
// `level` qualifies the few that are still being learned — no percentages.

export type Skill = { name: string; level?: 'learning' | 'basic' }

export type SkillGroup = {
  title: string
  skills: Skill[]
  evidence: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'Python' },
      { name: 'C' },
      { name: 'HTML/CSS' },
      { name: 'Java', level: 'learning' },
      { name: 'XML', level: 'basic' },
    ],
    evidence: ['heliohub', 'paimana', 'owaste'],
  },
  {
    title: 'Frontend',
    skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'Tailwind CSS' }, { name: 'Vite' }, { name: 'Framer Motion' }],
    evidence: ['nexora', 'heliohub', 'nyayalens'],
  },
  {
    title: 'Backend & AI',
    skills: [{ name: 'FastAPI' }, { name: 'Supabase' }, { name: 'REST APIs' }, { name: 'Gemini API' }],
    evidence: ['paimana', 'heliohub', 'ecobuddy'],
  },
  {
    title: 'Mobile & Web3',
    skills: [{ name: 'Android Studio' }, { name: 'Firebase' }, { name: 'Algorand' }],
    evidence: ['owaste', 'payperview'],
  },
  {
    title: 'Tools',
    skills: [{ name: 'Git' }, { name: 'GitHub' }, { name: 'Vercel' }, { name: 'VS Code' }],
    evidence: [],
  },
]
