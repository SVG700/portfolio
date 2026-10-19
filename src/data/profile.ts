// Personal details shown across the site. Edit here, not in components.

export const profile = {
  name: 'Samhith V Gupta',
  headline: 'Building technology that solves real-world problems.',
  summary:
    'Computer Science undergraduate who builds full-stack web, Android and AI-integrated applications — from hackathon prototypes to live demos.',
  degree: 'B.Tech, Computer Science and Engineering',
  university: 'Presidency University, Bengaluru',
  currentRole: 'Google Student Ambassador · 2026 – Present',
  location: 'Bengaluru, India',
  email: 'samhithvgupta@gmail.com',
  links: {
    github: 'https://github.com/SVG700',
    linkedin: 'https://linkedin.com/in/samhith-v-gupta',
  },
  /**
   * Resume lives at public/resume.pdf and is served at /resume.pdf.
   * Resume buttons only render once a real PDF is there.
   */
  resumePath: '/resume.pdf',
  /** Keep false unless you explicitly want an "Open to internships" badge. */
  openToInternships: false,
  /**
   * Android app download, shown on the website only (hidden inside the app).
   * Points at the latest GitHub Release, which has the signed APK attached.
   * Set to null to hide the link.
   */
  androidAppUrl: 'https://github.com/SVG700/portfolio/releases/latest' as string | null,
} as const

export type Education = {
  institution: string
  degree: string
  period: string
  note?: string
}

export const education: Education[] = [
  {
    institution: 'Presidency University, Bengaluru',
    degree: 'B.Tech, Computer Science and Engineering',
    period: 'Aug 2025 – 2029 (expected)',
    note: 'Class Representative',
  },
  {
    institution: 'Sri Ramakrishna Vidyashala, Mysore',
    degree: 'High School & Pre-University (PCMC)',
    period: 'Apr 2021 – Mar 2025',
  },
]

/** From the resume. */
export const activities = [
  'Attended the GSoC community meetup at Google Ananta, Bengaluru — organised by GDG Bangalore (Jul 2026)',
  'Competitive programming, hackathons and CTF (IISc)',
  "NCC 'A' Certificate (2022)",
  'Photo and video editing',
  'Community service',
]

export const languages = [
  { name: 'English', level: 'fluent' },
  { name: 'Kannada', level: 'native' },
  { name: 'Hindi', level: 'fluent' },
  { name: 'Telugu', level: 'conversational' },
]
