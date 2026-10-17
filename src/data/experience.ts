// Experience and leadership. Dates are left undefined until confirmed —
// add `period: 'Jul 2025 – Present'` (for example) and it will render.

export type Role = {
  title: string
  organisation: string
  period?: string
  description: string
  kind: 'Experience' | 'Leadership'
}

export const roles: Role[] = [
  {
    title: 'Sponsorship Lead',
    organisation: 'InnovateX 4.0 · Build Club, Presidency University',
    kind: 'Leadership',
    description:
      'Led sponsorship coordination for a university technology and innovation festival with 100+ events and 5,000+ participants — reaching out to partners, communicating the festival’s value and securing five sponsors.',
  },
  {
    title: 'Brand Manager Intern',
    organisation: 'The House of Edits',
    kind: 'Experience',
    description: 'Branding and digital marketing work for clients, collaborating with design and strategy teams.',
  },
  {
    title: 'Campus Ambassador',
    organisation: 'Shaastra, IIT Madras',
    kind: 'Leadership',
    description: 'Represented Shaastra on campus and supported student outreach for the festival’s events.',
  },
  {
    title: "Campus Ambassador — BECon '26",
    organisation: 'Entrepreneurship Development Cell, IIT Delhi',
    kind: 'Leadership',
    description: "Represented BECon '26 on campus and promoted its entrepreneurship initiatives among students.",
  },
  {
    title: 'Class Representative',
    organisation: 'Presidency University',
    kind: 'Leadership',
    description: 'Represent my class, coordinating communication between students and faculty.',
  },
]
