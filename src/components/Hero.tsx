import { profile } from '../data/profile'
import { Magnetic } from '../motion'
import { ArrowDown, GitHubIcon, LinkedInIcon, Mail } from './icons'
import { ResumeButton } from './ResumeButton'
import { Portrait } from './Portrait'
import { WorkCollage } from './WorkCollage'
import { HeroBackdrop } from '../three/HeroBackdrop'

const LINES = [
  { text: 'Building technology', className: '' },
  { text: 'that solves', className: 'lg:pl-[1.6em]' },
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-x-clip pt-24 pb-16 md:pt-32 md:pb-24" style={{ marginTop: 'var(--safe-top)' }}>
      <div className="container-page">
        <div className="enter flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line pb-5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
            <span className="size-2 bg-accent" aria-hidden="true" />
            <span className="font-medium whitespace-nowrap">{profile.name}</span>
            <span className="hidden text-dim sm:inline">/</span>
            <span className="basis-full pl-5 text-muted sm:basis-auto sm:pl-0">
              {profile.degree}, {profile.university}
            </span>
          </p>
          <p className="meta">{profile.location}</p>
        </div>

        <h1 className="display-xl mt-9 text-balance md:mt-12">
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

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="enter flex flex-col lg:col-span-5" style={{ animationDelay: '380ms' }}>
            <div className="flex items-center gap-5">
              <Portrait className="w-[104px] md:w-32" />
              <p className="flex flex-col gap-1">
                <span className="inline-flex items-center gap-2 text-[15px] font-medium leading-snug">
                  <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {profile.currentRole.split(' · ')[0]}
                </span>
                <span className="meta pl-3.5">{profile.currentRole.split(' · ')[1]}</span>
              </p>
            </div>

            <p className="lede mt-7 max-w-md text-ink/85">{profile.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href="#work" className="btn-primary">
                  View projects <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </Magnetic>
              <ResumeButton />
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-muted lg:mt-auto lg:pt-8">
              <li>
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                >
                  <GitHubIcon /> <span className="link-underline">SVG700</span>
                  <span className="sr-only">on GitHub (opens in a new tab)</span>
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
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                >
                  <Mail className="size-4" aria-hidden="true" /> <span className="link-underline">Email</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Real screenshots of live builds — tablet and up only, so they are never shown illegibly small. */}
          <div className="relative isolate hidden md:block lg:col-span-7">
            {/* 3D network behind the screenshots (tablet and up; static image in the app / reduced motion). */}
            <HeroBackdrop className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[118%] -translate-x-1/2 -translate-y-[46%] opacity-80 [mask-image:radial-gradient(closest-side,#000_62%,transparent)]" />
            <WorkCollage />
            <p className="meta mt-4">Live builds — HelioHub, NyayaLens, PayPerView</p>
          </div>
        </div>
      </div>
    </section>
  )
}
