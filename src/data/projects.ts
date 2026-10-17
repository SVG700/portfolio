// Project content. Every claim here should be traceable to a repo README,
// source code, the resume, or details Samhith has confirmed. Leave fields
// undefined rather than guessing — the UI hides anything that is missing.
//
// Competition results (SIH, RIFT, Expo placings) live in achievements.ts and
// are shown once there; projects only mention the context they were built in.

export type ProjectStatus = 'Live demo' | 'In development' | 'Prototype' | 'Local prototype'

/**
 * What the project shows visually (tablet and desktop only — on phones the
 * cards are text-only so nothing renders illegibly small).
 * - `screenshot`: a real capture of the deployed app (public/work/*.webp).
 * - `mock`: an interface preview built in code for projects with no public
 *   build. These use synthetic values and are labelled as such.
 */
export type ProjectVisual =
  | { type: 'screenshot'; src: string; alt: string; caption: string }
  | { type: 'mock'; kind: 'nexora' | 'paimana' | 'ecobuddy' }

export type Project = {
  id: string
  name: string
  category: string
  /** One-line problem statement. */
  problem: string
  summary: string
  status: ProjectStatus
  /** featured = large cards at the top; more = compact grid. */
  tier: 'featured' | 'more'
  role?: string
  context?: string
  features: string[]
  stack: string[]
  /** repoLabel overrides the "Code" link text where the repo needs context. */
  links: { repo?: string; repoLabel?: string; demo?: string }
  /** Honest caveats shown in the project overview. */
  notes?: string[]
  visual?: ProjectVisual
}

export const projects: Project[] = [
  {
    id: 'nexora',
    name: 'NEXORA',
    category: 'AI · Graph analytics',
    problem: 'Links between people, calls and transactions are hard to see across scattered records.',
    summary:
      'An AI-powered criminal-network analysis prototype for entity extraction and resolution, network visualisation and spatio-temporal pattern analysis — built on synthetic data.',
    status: 'Prototype',
    tier: 'featured',
    context: 'Smart India Hackathon 2026 project',
    features: [
      'Entity extraction and resolution',
      'Network visualisation',
      'Spatio-temporal pattern analysis',
      'Synthetic FIR, call-detail and transaction data',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    links: {},
    notes: [
      'Uses synthetic data only. Not deployed, and not used by any law-enforcement agency.',
      'No public repository or demo.',
    ],
    visual: { type: 'mock', kind: 'nexora' },
  },
  {
    id: 'paimana',
    name: 'PAIMANA Monitoring & Forecasting',
    category: 'AI · Data analytics',
    problem: 'Slipping infrastructure projects are hard to spot before delays compound.',
    summary:
      'A local prototype exploring AI-assisted project monitoring: a FastAPI service that forecasts project progress and flags delay risk and anomalies, built on a dataset assembled from PAIMANA progress reports.',
    status: 'Local prototype',
    tier: 'featured',
    features: ['Progress forecasting (1–24 months)', 'Delay-risk and anomaly flags', 'REST API for a web dashboard'],
    stack: ['Python', 'FastAPI'],
    links: {},
    notes: [
      'Dataset: ~2,100 Central Sector projects and 11,011 monthly observations from PAIMANA reports (Jul 2025 – Mar 2026). Historical report data, not live government data.',
      'Runs locally; not deployed and code not public. Not an official or MoSPI system.',
    ],
    visual: { type: 'mock', kind: 'paimana' },
  },
  {
    id: 'heliohub',
    name: 'HelioHub',
    category: 'Full-stack · Clean energy',
    problem: 'Checking solar feasibility, schemes and costs usually means visiting several places.',
    summary:
      'A platform for solar-powered charging stations with a Solar Feasibility Tool, the Gemini-powered Helios AI assistant and an admin dashboard that runs on demo data.',
    status: 'Live demo',
    tier: 'more',
    role: 'Full-Stack Developer',
    features: [
      'Solar Feasibility Tool',
      'Helios AI assistant (Gemini) with Supabase knowledge lookup',
      'Demo dashboard — simulated data until connected to real hardware',
      'Government schemes information',
    ],
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini API', 'Framer Motion'],
    links: { repo: 'https://github.com/SVG700/HelioHub', demo: 'https://helio-hub.vercel.app' },
    notes: ['The dashboard shows demo data; it is not connected to live station readings.'],
    visual: {
      type: 'screenshot',
      src: '/work/heliohub.webp',
      alt: 'HelioHub home page: Smart Solar Charging Station hero with panel, battery and USB output specs',
      caption: 'helio-hub.vercel.app',
    },
  },
  {
    id: 'payperview',
    name: 'PayPerView',
    category: 'Web3 · Blockchain',
    problem: 'Creators on ad-based platforms see little of how engagement turns into payouts.',
    summary:
      'A decentralised video-ad platform on Algorand that records valid views and settles creator rewards on-chain. Built as a team in a 24-hour hackathon.',
    status: 'Prototype',
    tier: 'more',
    role: 'Team Developer — collaborated across the project',
    context: "RIFT '26 hackathon (Physics Wallah) · Team COREMATES",
    features: [
      'Pera Wallet sign-in with signature verification',
      'Off-chain view tracking, on-chain reward settlement',
      'Video storage on IPFS via Pinata',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'Algorand', 'IPFS'],
    links: {
      repo: 'https://github.com/SVG700/Web3-Youtube-Decentralised-Platform',
      repoLabel: 'Team repo',
      demo: 'https://ffrg-srgvs.vercel.app/',
    },
    notes: [
      'Team project. The repository is my fork of the team’s shared codebase, pushed by a teammate.',
      'Runs on Algorand Testnet.',
    ],
    visual: {
      type: 'screenshot',
      src: '/work/payperview.webp',
      alt: 'PayPerView landing page: Decentralized Creator Monetization, live on Algorand Testnet',
      caption: 'ffrg-srgvs.vercel.app',
    },
  },
  {
    id: 'nyayalens',
    name: 'NyayaLens',
    category: 'Generative AI · Legal tech',
    problem: 'Contracts are dense, so people often sign without understanding their obligations.',
    summary:
      'Explains contract clauses in plain English, extracts obligations and deadlines, and answers questions with clause citations — legal information, not legal advice.',
    status: 'Live demo',
    tier: 'more',
    context: 'Built for a Hack2Skill “AI for Legal Assistance & Access” challenge',
    features: [
      'Clause analysis and categorisation',
      'Document Q&A with clause citations',
      'Draft comparison and deadline timeline',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini API'],
    links: { repo: 'https://github.com/SVG700/NyayaLens', demo: 'https://nyayalens-pink.vercel.app' },
    visual: {
      type: 'screenshot',
      src: '/work/nyayalens.webp',
      alt: 'NyayaLens analyze view: a rental agreement on the left, clause categories and risk profile on the right',
      caption: 'nyayalens-pink.vercel.app/analyze',
    },
  },
  {
    id: 'ecobuddy',
    name: 'EcoBuddy AI',
    category: 'AI · Sustainability',
    problem: 'Most people can’t see the carbon cost of their daily travel, fuel and electricity.',
    summary:
      'A mobile-first web app for tracking a personal carbon footprint, with a Gemini-powered sustainability coach and weekly reports.',
    status: 'Live demo',
    tier: 'more',
    features: [
      'Travel, fuel and electricity emission logs',
      'Gemini sustainability coach and weekly reports',
      'Supabase auth with row-level security',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Gemini API'],
    links: { repo: 'https://github.com/SVG700/ecobuddy-ai', demo: 'https://ecobuddy-ai-eight.vercel.app' },
    notes: ['Electricity-bill OCR is simulated in the current build.'],
    visual: { type: 'mock', kind: 'ecobuddy' },
  },
  {
    id: 'owaste',
    name: "O' Waste",
    category: 'Android · Social impact',
    problem: 'Restaurants throw away surplus food while NGOs struggle to source meals.',
    summary:
      'An Android app that connects restaurants with NGOs to redistribute surplus food. The project behind my INSPIRE Award and ATL Tinkerpreneur recognition.',
    status: 'In development',
    tier: 'more',
    role: 'Android Developer · Oct 2021 – Present',
    features: ['Firebase OTP sign-in', 'Firebase Cloud Messaging for donor–volunteer matching', 'Google Maps integration (in progress)'],
    stack: ['Java', 'Android Studio', 'Firebase'],
    links: {},
    notes: ['Not published on the Play Store.'],
  },
  {
    id: 'stadiumos',
    name: 'StadiumOS AI',
    category: 'Generative AI · Operations',
    problem: 'Stadium systems for fans, staff and organisers usually run in isolation.',
    summary: 'A smart-stadium operations demo with visitor, staff and executive portals and role-specific Gemini assistants.',
    status: 'Live demo',
    tier: 'more',
    context: 'Built for PromptWars Challenge 4',
    features: ['Three role-based portals', 'Simulated crowd and incident data', 'Natural-language command palette'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Gemini API'],
    links: { repo: 'https://github.com/SVG700/StadiumOS-AI', demo: 'https://stadium-os-ai-topaz.vercel.app' },
    notes: ['Telemetry is simulated.'],
    visual: {
      type: 'screenshot',
      src: '/work/stadiumos.webp',
      alt: 'StadiumOS AI executive dashboard with command search and demo account',
      caption: 'stadium-os-ai-topaz.vercel.app/dashboard/fifa',
    },
  },
  {
    id: 'civicmind',
    name: 'CivicMind AI',
    category: 'Multi-agent AI',
    problem: 'Municipal teams need to combine live signals and policy documents quickly during incidents.',
    summary:
      'A multi-agent decision-support demo where data, forecast, recommendation and report agents work together on a query.',
    status: 'Live demo',
    tier: 'more',
    features: ['Visual agent orchestration', 'Retrieval over policy documents', 'PDF briefings'],
    stack: ['Next.js', 'TypeScript', 'Gemini API'],
    links: { repo: 'https://github.com/SVG700/CivicMind-AI', demo: 'https://civic-mind-ai-xi.vercel.app' },
    notes: ['Cloud services are mocked; falls back to simulated agent output without an API key.'],
  },
]
