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

export const achievements: Achievement[] = [
  {
    figure: 'INSPIRE',
    title: 'INSPIRE Award',
    detail: 'DST, Govt. of India · ₹10,000 national grant',
    year: 'Dec 2021',
    project: 'owaste',
  },
  {
    figure: 'Top 100',
    title: 'ATL Tinkerpreneur',
    detail: 'Top 100 nationally · NITI Aayog',
    year: '2021',
    project: 'owaste',
  },
  {
    figure: '6th',
    title: '8th Innovative Project Expo',
    detail: '6th of 350+ teams',
    project: 'heliohub',
  },
  {
    figure: 'Top 90',
    title: 'Smart India Hackathon 2026 — internal round',
    detail: '456 teams → internal hackathon of 150 teams → shortlisted in the top 90',
    year: '2026',
    project: 'nexora',
  },
  {
    figure: 'Semifinalist',
    title: "RIFT '26 Hackathon",
    detail: 'Physics Wallah · Team COREMATES',
    year: '2026',
    project: 'payperview',
  },
  {
    figure: '7th',
    title: 'Ramakrishna Mission Student Innovation Competition',
    detail: 'South Zone',
    year: '2023',
  },
]
