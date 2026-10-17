// Personal details shown across the site. Edit here, not in components.

export const profile = {
  name: 'Samhith V Gupta',
  firstName: 'Samhith',
  label: 'CS Student · Developer · Builder',
  headline: 'Building technology that solves real-world problems.',
  intro:
    "I'm Samhith, a Computer Science student, developer, and aspiring engineer exploring AI, software development, and emerging technologies. I enjoy turning ideas into working products and building solutions with real-world applications.",
  location: 'Bengaluru, India',
  university: 'Presidency University, Bengaluru',
  email: 'sammithvgupta@gmail.com',
  links: {
    github: 'https://github.com/SVG700',
    linkedin: 'https://www.linkedin.com/in/samhith-v-gupta',
  },
  /**
   * Resume lives at public/resume.pdf and is served at /resume.pdf.
   * The button checks that a real PDF exists before enabling itself.
   */
  resumePath: '/resume.pdf',
  /** Keep false unless you explicitly want an "Open to internships" badge. */
  openToInternships: false,
  /**
   * Android app download, shown on the website only (hidden inside the app).
   * TODO: once the "portfolio" repo exists and the APK is attached to a GitHub
   * Release, set this to the release URL, e.g.
   *   'https://github.com/SVG700/portfolio/releases/latest'
   * While it is null the button renders disabled ("Coming soon").
   */
  androidAppUrl: null as string | null,
} as const

export const about = {
  paragraphs: [
    "I'm a Computer Science and Engineering student at Presidency University, Bengaluru. I'm interested in building software that goes beyond demonstrations and addresses practical problems.",
    'My work spans AI-powered applications, web development, Android applications, data-driven systems and emerging technologies such as blockchain. I learn best by building — experimenting with new tools and collaborating on projects that combine technical thinking with real-world utility.',
    "Alongside development, I've explored entrepreneurship, student innovation programmes and event leadership. Those experiences taught me that useful technology needs more than code: it needs an understanding of people, clear communication and consistent execution.",
  ],
  interests: [
    'Artificial intelligence and applied machine learning',
    'Full-stack and application development',
    'Data-driven software systems',
    'Blockchain and Web3',
    'Entrepreneurship and social-impact technology',
    'Developer communities and collaborative innovation',
  ],
}

export type Education = {
  degree: string
  institution: string
  period?: string
  note?: string
}

export const education: Education[] = [
  {
    degree: 'B.Tech, Computer Science and Engineering',
    institution: 'Presidency University, Bengaluru',
    period: '2025 – 2029',
  },
  {
    degree: 'School education',
    institution: 'Sri Ramakrishna Vidyashala, Mysuru',
  },
]

export const roleFit = [
  'Software Engineering Intern',
  'Frontend / Full-Stack Developer Intern',
  'AI Application Development Intern',
  'Android Development Intern',
  'Developer & innovation programmes',
]
