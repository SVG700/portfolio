// Experience and leadership, newest first. Wording follows the resume; leave
// `detail` out rather than inventing duties.

export type Role = {
  title: string
  organisation: string
  period?: string
  detail?: string
}

export const roles: Role[] = [
  {
    title: 'Google Student Ambassador',
    organisation: 'Google Student Ambassador Program',
    period: '2026 – Present',
    detail: 'Conducted one online event; publish monthly programme highlights on LinkedIn and Instagram.',
  },
  {
    title: 'Sponsorship Lead',
    organisation: 'InnovateX 4.0 · Build Club, Presidency University',
    period: 'Jan – Apr 2026',
    detail: 'Led sponsor relations for the university’s international tech fest (5,000+ participants); brought in five sponsors.',
  },
  {
    title: 'Marketing Intern — Campus Ambassador Program',
    organisation: 'Shaastra 2025–26, IIT Madras',
    period: 'Dec 2025 – Mar 2026',
  },
  {
    title: 'Campus Ambassador',
    organisation: "eDC IIT Delhi · BECon '26",
    period: 'Dec 2025 – Feb 2026',
    detail: "Promoted BECon '26 entrepreneurship events on campus and coordinated student outreach.",
  },
  {
    title: 'Student Coordinator',
    organisation: 'DRR Club, Presidency University',
    period: 'Nov 2025 – Present',
    detail: 'Organised the AgroTech Innovation Challenge 2026.',
  },
  {
    title: 'Co-Founder',
    organisation: 'EV Lowarage',
    period: 'Oct 2025 – Present',
    // NDA: this approved line is the only public description.
    detail: 'Early-stage EV-charging venture.',
  },
  {
    title: 'Brand Manager Intern',
    organisation: 'The House of Edits',
    period: 'Jul 2025 – Present',
    detail: 'Plan and run social media branding campaigns, using analytics to refine performance.',
  },
]
