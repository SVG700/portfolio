// Project content. Every claim here should be traceable to a repo README,
// source code, or details Samhith has confirmed. Leave fields undefined
// rather than guessing — the UI hides anything that is missing.

export type ProjectStatus = 'Prototype' | 'In development' | 'Concept' | 'Live demo'

/**
 * What the project shows visually.
 * - `screenshot`: a real capture of the deployed app (public/work/*.webp).
 * - `mock`: an interface preview built in code for projects with no public
 *   build yet. These use synthetic values and are labelled as such.
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
  /** Where the project sits: lead (wide card), featured (grid), more (compact list). */
  tier: 'lead' | 'featured' | 'more'
  role?: string
  context?: string
  approach?: string[]
  features: string[]
  stack: string[]
  links: { repo?: string; demo?: string }
  /** Honest caveats shown in the project overview. */
  notes?: string[]
  visual?: ProjectVisual
}

export const projects: Project[] = [
  {
    id: 'nexora',
    name: 'NEXORA',
    category: 'AI · Data intelligence · Graph analytics',
    problem: 'Investigators work across scattered records where the links between people, calls and money are hard to see.',
    summary:
      'An AI-assisted criminal network analysis prototype that helps analysts explore relationships between entities and examine patterns across heterogeneous, synthetic datasets.',
    status: 'In development',
    tier: 'lead',
    context: 'Smart India Hackathon 2026 — internal university selection, idea submitted on the SIH portal',
    approach: [
      'Records from different sources are normalised into entities (people, phone numbers, accounts, locations) and the relationships between them.',
      'Entity resolution merges records that refer to the same real-world entity, so the network is not fragmented by spelling or format differences.',
      'Analysts explore the resulting graph and timelines through investigation-oriented dashboards rather than raw tables.',
    ],
    features: [
      'Entity and relationship extraction',
      'Entity resolution across sources',
      'Network and relationship visualisation',
      'Spatiotemporal pattern exploration',
      'Synthetic FIR, call-detail, transaction and intelligence datasets',
      'Investigation dashboards and case management',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Graph analysis', 'REST APIs'],
    links: {},
    notes: [
      'Prototype built with synthetic data only. It is not deployed for law enforcement and its outputs are not operationally validated.',
      'No public repository or demo yet.',
    ],
    visual: { type: 'mock', kind: 'nexora' },
  },
  {
    id: 'paimana',
    name: 'AI Project Monitoring & Forecasting',
    category: 'AI · Data analytics · Public infrastructure',
    problem: 'Large public infrastructure portfolios make it hard to spot slipping projects before delays compound.',
    summary:
      'An AI-assisted monitoring platform concept, inspired by public-sector project monitoring, that analyses progress, flags unusual changes and estimates future progress from historical observations.',
    status: 'In development',
    tier: 'lead',
    approach: [
      'Adaptive Run-Rate Velocity: estimates how fast a project is progressing from its recent monthly history, adapting as new observations arrive.',
      'Empirical Bayesian Sector Shrinkage: projects with little history borrow strength from others in the same sector, which keeps early forecasts from swinging wildly.',
      'Forecasts and delay-risk / anomaly signals are served by a FastAPI backend and consumed by a web dashboard, with horizons configurable from 1 to 24 months.',
    ],
    features: [
      'Progress forecasting, 1–24 month horizons',
      'Delay-risk and anomaly analysis',
      'Sector-level shrinkage for sparse histories',
      'API-driven dashboard integration',
    ],
    stack: ['Python', 'FastAPI', 'Forecasting', 'Anomaly detection', 'REST APIs'],
    links: {},
    notes: [
      'Dataset scope: ~2,100 Central Sector projects and 11,011 monthly progress observations assembled from PAIMANA reports (July 2025 – March 2026). These figures describe the data, not model accuracy.',
      'Not an official government system. No public repository or demo yet.',
    ],
    visual: { type: 'mock', kind: 'paimana' },
  },
  {
    id: 'heliohub',
    name: 'HelioHub',
    category: 'Full-stack · Clean energy · AI',
    problem: 'People considering solar rarely have a simple way to check feasibility, schemes and costs in one place.',
    summary:
      'A smart solar charging station platform with a feasibility tool, a Gemini-powered assistant, a live dashboard simulation and government scheme information.',
    status: 'Live demo',
    tier: 'featured',
    role: 'Full-stack developer — built the website end to end',
    context: 'Team project with Madhan B V and Ruchika Amol Patil, guided by Dr. Divyarani M S',
    features: [
      'Solar feasibility tool',
      'Helios AI assistant (Gemini) with Supabase knowledge lookup and feedback logging',
      'Live dashboard simulation (Chart.js)',
      'Government schemes information and team pages',
    ],
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini API', 'Framer Motion'],
    links: { repo: 'https://github.com/SVG700/HelioHub', demo: 'https://helio-hub.vercel.app' },
    notes: ['The dashboard displays simulated data, not readings from a physical station.'],
    visual: {
      type: 'screenshot',
      src: '/work/heliohub.webp',
      alt: 'HelioHub home page: Smart Solar Charging Station hero with panel, battery and USB output specs',
      caption: 'helio-hub.vercel.app',
    },
  },
  {
    id: 'ecobuddy',
    name: 'EcoBuddy AI',
    category: 'AI · Sustainability · PWA',
    problem: 'Most people have no clear picture of the carbon cost of their daily travel, fuel and electricity use.',
    summary:
      'A mobile-first progressive web app for tracking and reducing a personal carbon footprint, with a Gemini-powered sustainability coach and weekly reports.',
    status: 'Live demo',
    tier: 'featured',
    features: [
      'Travel tracking with the Geolocation API',
      'Fuel and grid-electricity emission logs',
      'Gemini sustainability coach and weekly AI reports',
      'Challenges, streaks and Recharts analytics',
      'Supabase auth with row-level security, plus a sandbox mode',
    ],
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Gemini API', 'Recharts', 'PWA'],
    links: { repo: 'https://github.com/SVG700/ecobuddy-ai', demo: 'https://ecobuddy-ai-eight.vercel.app' },
    notes: ['Electricity-bill OCR is simulated in the current build.'],
    visual: { type: 'mock', kind: 'ecobuddy' },
  },
  {
    id: 'payperview',
    name: 'PayPerView',
    category: 'Web3 · Blockchain · Full-stack',
    problem: 'Creators on ad-based platforms get little visibility into how engagement turns into payouts.',
    summary:
      'A decentralised, ad-based video platform that records valid views off-chain and settles creator rewards as Algorand transactions, with videos stored on IPFS.',
    status: 'Prototype',
    tier: 'featured',
    context: 'RIFT Hackathon (Physics Wallah) · Team COREMATES · Top 10 / semifinalist',
    features: [
      'Pera Wallet sign-in with Algorand signature verification and JWT',
      'View tracking with basic fraud filtering',
      'Off-chain reward calculation, on-chain settlement',
      'Video uploads pinned to IPFS via Pinata',
    ],
    stack: ['React', 'Vite', 'FastAPI', 'Algorand', 'Pera Wallet', 'IPFS / Pinata', 'PostgreSQL'],
    links: {
      repo: 'https://github.com/SVG700/Web3-Youtube-Decentralised-Platform',
      demo: 'https://ffrg-srgvs.vercel.app/',
    },
    notes: ['Team project. Runs on Algorand Testnet.'],
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
    problem: 'Contracts are written in dense legalese, so people often sign without understanding their obligations.',
    summary:
      'A legal document understanding assistant that explains clauses in plain English, extracts obligations and deadlines, and answers questions with citations — information, not legal advice.',
    status: 'Live demo',
    tier: 'featured',
    context: 'Built for a Hack2Skill “AI for Legal Assistance & Access” challenge',
    features: [
      'Split-screen clause analysis and categorisation',
      'Grounded document Q&A with clause citations',
      'Draft comparison and deadline timeline with .ics export',
      'Offline heuristic fallback when no API key is set',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini 2.5 Flash', 'Recharts'],
    links: { repo: 'https://github.com/SVG700/NyayaLens', demo: 'https://nyayalens-pink.vercel.app' },
    visual: {
      type: 'screenshot',
      src: '/work/nyayalens.webp',
      alt: 'NyayaLens analyze view: a rental agreement on the left, clause categories and risk profile on the right',
      caption: 'nyayalens-pink.vercel.app/analyze',
    },
  },
  {
    id: 'owaste',
    name: "O' Waste",
    category: 'Android · Social impact',
    problem: 'Restaurants throw away surplus food while NGOs struggle to source meals.',
    summary:
      'An Android application that connects restaurants with NGOs to redirect surplus food. The project behind my INSPIRE Award and ATL Tinkerpreneur Top 100 recognition.',
    status: 'Prototype',
    tier: 'more',
    features: ['OTP-based login', 'Real-time notifications', 'Restaurant–NGO matching by location'],
    stack: ['Android', 'Java', 'Firebase Auth', 'FCM', 'Google Maps API'],
    links: {},
    notes: ['Not published on the Play Store; runs as a private build.'],
  },
  {
    id: 'ev-lowarage',
    name: 'EV Lowarage',
    category: 'Entrepreneurship · Mobility',
    problem: 'Fixed charging stations leave gaps where and when EV drivers need power.',
    summary:
      'A co-founded entrepreneurial concept exploring mobile EV charging — charging units on wheels — with app-based customer access and demand planning.',
    status: 'Concept',
    tier: 'more',
    role: 'Co-founder',
    features: [
      'Customer-facing mobile app (planned)',
      'Franchise / operator app (planned)',
      'Route and demand analytics (planned)',
    ],
    stack: ['Product design', 'Market research', 'System design'],
    links: {},
    notes: ['Concept under development. No patents, revenue or commercial deployment are claimed.'],
  },
  {
    id: 'stadiumos',
    name: 'StadiumOS AI',
    category: 'Generative AI · Operations',
    problem: 'Stadium systems for fans, staff and organisers usually run in isolation.',
    summary:
      'A smart-stadium operations platform concept with separate visitor, staff and executive portals and role-specific Gemini assistants.',
    status: 'Live demo',
    tier: 'more',
    context: 'Built for PromptWars Challenge 4 — Smart Stadiums & Tournament Operations',
    features: ['Three role-based portals', 'Crowd and incident simulation', 'Natural-language command palette'],
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Gemini API', 'Recharts'],
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
    category: 'Multi-agent AI · Decision support',
    problem: 'Municipal teams need to combine live signals and policy documents quickly during incidents.',
    summary:
      'A multi-agent decision intelligence dashboard where data, forecast, vision, recommendation, report and notification agents work together on a query.',
    status: 'Live demo',
    tier: 'more',
    features: ['Visual agent orchestration', 'TF-IDF retrieval over policy documents', 'Interactive SVG risk map', 'PDF briefings'],
    stack: ['Next.js', 'TypeScript', 'Gemini API', 'Recharts', 'jsPDF'],
    links: { repo: 'https://github.com/SVG700/CivicMind-AI', demo: 'https://civic-mind-ai-xi.vercel.app' },
    notes: ['Cloud services are mocked; falls back to simulated agent output without an API key.'],
  },
]
