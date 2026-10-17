import { ArrowDown } from 'lucide-react'
import { achievements } from '../data/achievements'
import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './icons'
import { ResumeButton } from './ResumeButton'
import { WorkCollage } from './WorkCollage'

// Credentials surfaced in the first screen. Pulled from achievements.ts so
// wording stays in one place.
const STRIP = ['INSPIRE Award', 'ATL Tinkerpreneur — Top 100', 'Google Student Ambassador', 'RIFT Hackathon — Top 10 / semifinalist']

const STRIP_LABEL: Record<string, string> = {
  'INSPIRE Award': 'Award · DST, Government of India',
  'ATL Tinkerpreneur — Top 100': 'NITI Aayog ATL Tinkerpreneur',
  'Google Student Ambassador': 'Google Student Ambassador',
  'RIFT Hackathon — Top 10 / semifinalist': 'RIFT Hackathon · semifinalist',
}

const LINES = [
  { text: 'Building technology', className: '' },
  { text: 'that solves', className: 'lg:pl-[1.6em]' },
]

export function Hero() {
  const strip = STRIP.map((t) => achievements.find((a) => a.title === t)).filter((a) => a !== undefined)

  return (
    <section id="top" className="relative pt-28 md:pt-36" style={{ marginTop: 'var(--safe-top)' }}>
      <div className="container-page">
        <div className="enter flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line pb-5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
            <span className="size-2 bg-accent" aria-hidden="true" />
            <span className="font-medium whitespace-nowrap">{profile.name}</span>
            <span className="hidden text-dim sm:inline">/</span>
            <span className="basis-full pl-5 text-muted sm:basis-auto sm:pl-0">
              Computer Science & Engineering, {profile.university}
            </span>
          </p>
          <p className="meta">{profile.location}</p>
        </div>

        <h1 className="display-xl mt-10 text-balance md:mt-14">
          <span className="sr-only">{profile.name} — </span>
          {LINES.map((l, i) => (
            <span key={l.text} className="line-mask">
              <span className={l.className} style={{ animationDelay: `${80 + i * 90}ms` }}>
                {l.text}
              </span>
            </span>
          ))}
          <span className="line-mask">
            <span style={{ animationDelay: '260ms' }}>
              <span className="text-accent">real-world</span> problems.
            </span>
          </span>
        </h1>

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="enter flex flex-col lg:col-span-5 lg:pt-4" style={{ animationDelay: '380ms' }}>
            <p className="lede max-w-md text-[1.1875rem] text-ink/85">{profile.intro}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#work" className="btn-primary">
                Explore my work <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <ResumeButton />
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[14px] text-muted lg:mt-auto lg:pt-10">
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                >
                  <GitHubIcon /> <span className="link-underline">github.com/SVG700</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                >
                  <LinkedInIcon /> <span className="link-underline">LinkedIn</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <WorkCollage />
            <p className="meta mt-5 flex items-center justify-between gap-4">
              <span>Live builds — HelioHub, NyayaLens, PayPerView</span>
              <a href="#work" className="link-underline shrink-0 text-muted hover:text-ink">
                All work ↓
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 border-y border-line bg-bg-alt md:mt-28">
        <ul className="container-page grid grid-cols-2 lg:grid-cols-4" aria-label="Recognition highlights">
          {strip.map((a, i) => (
            <li
              key={a.title}
              className={`py-6 pr-4 md:py-8 ${i % 2 === 1 ? 'border-l border-line pl-4 md:pl-8' : ''} ${
                i >= 2 ? 'border-t border-line lg:border-t-0' : ''
              } ${i === 2 ? 'lg:border-l lg:pl-8' : ''}`}
            >
              <p className="font-display text-[1.65rem] leading-none font-semibold tracking-[-0.03em] md:text-[2rem]">
                {a.figure}
              </p>
              <p className="mt-2.5 text-[13px] leading-snug text-muted">{STRIP_LABEL[a.title]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
