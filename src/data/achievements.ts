// Recognition. Years are intentionally omitted until confirmed —
// add `year: '20XX'` and it will appear in the UI.

export type Achievement = {
  /** Short figure set large in the UI — only real, confirmed values. */
  figure: string
  title: string
  issuer: string
  description: string
  year?: string
  project?: string
  highlight?: boolean
  /** Optional certificate or evidence URL. Never add one that doesn't exist. */
  evidenceUrl?: string
}

export const achievements: Achievement[] = [
  {
    figure: 'INSPIRE',
    title: 'INSPIRE Award',
    issuer: 'Department of Science and Technology, Government of India',
    description: "Recognised for O' Waste, with a ₹10,000 grant supporting the innovation idea.",
    project: 'owaste',
    highlight: true,
  },
  {
    figure: 'Top 100',
    title: 'ATL Tinkerpreneur — Top 100',
    issuer: 'NITI Aayog · Atal Tinkering Labs',
    description: "Selected among the Top 100 in the Tinkerpreneur initiative for O' Waste.",
    project: 'owaste',
    highlight: true,
  },
  {
    figure: '2026',
    title: 'Google Student Ambassador',
    issuer: 'Google Student Ambassador programme',
    year: '2026',
    description:
      'Selected for the 2026 programme. Conducted one online event, shared monthly programme highlights on LinkedIn and Instagram, and took part in student community and content activities.',
    highlight: true,
  },
  {
    figure: 'Top 100',
    title: 'Google Ananta event selection',
    issuer: 'Associated with Google Summer of Code',
    description:
      'Selected among the top 100 participants from thousands of applicants for an opportunity associated with Google Summer of Code at the Google Ananta office.',
  },
  {
    figure: 'Top 90',
    title: 'Smart India Hackathon 2026 — internal selection',
    issuer: 'Presidency University internal round',
    description:
      'With NEXORA, our team was shortlisted from 456 teams for the university’s internal hackathon (~150 teams), then into the internal top 90. The idea has been submitted on the official SIH portal; results are awaited.',
    project: 'nexora',
  },
  {
    figure: 'Top 10',
    title: 'RIFT Hackathon — Top 10 / semifinalist',
    issuer: 'Physics Wallah · Team COREMATES',
    description: 'Reached the Top 10 / semifinalist stage with PayPerView.',
    project: 'payperview',
  },
  {
    figure: '7th',
    title: '7th place',
    issuer: 'Ramakrishna Mission Student Innovation Competition',
    description: 'Placed 7th in the student innovation competition.',
  },
]
