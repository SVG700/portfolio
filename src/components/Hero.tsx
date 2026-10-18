import { m } from 'framer-motion'
import { profile } from '../data/profile'
import { Magnetic } from '../motion'
import { EASE } from '../motion-shared'
import { HeroBackdrop } from '../three/HeroBackdrop'
import { HeroComposition } from './HeroComposition'
import { ArrowDown, GitHubIcon, LinkedInIcon, Mail } from './icons'
import { Portrait } from './Portrait'
import { ResumeButton } from './ResumeButton'
import { WorkCollage } from './WorkCollage'

const LINES = [
  { text: 'Building technology', className: '' },
  { text: 'that solves', className: 'xl:pl-[1.2em]' },
]

/** Fade-and-rise for the hero's text blocks, in sequence after the name. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
})

export function Hero() {
  const [role, since] = profile.currentRole.split(' · ')

  return (
    <section
      id="top"
      className="relative overflow-x-clip pt-24 pb-14 md:pt-28 md:pb-20"
      style={{ marginTop: 'var(--safe-top)' }}
    >
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          {/* Identity first: photo (phones/tablets) beside name, degree and current role. */}
          <div className="flex items-center gap-4 sm:gap-5">
            <Portrait className="w-[92px] sm:w-[112px] lg:hidden" sizes="112px" delay={0.1} />
            <div className="min-w-0">
              <m.p className="font-display text-[1.6rem] leading-tight font-semibold tracking-[-0.025em] sm:text-[1.9rem]" {...rise(0.15)}>
                <span className="relative inline-block">
                  {profile.name}
                  {/* lime accent that draws under the name */}
                  <m.span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
                  />
                </span>
              </m.p>
              <m.p className="mt-2.5 text-[14px] leading-snug text-muted" {...rise(0.25)}>
                {profile.degree} · {profile.university}
              </m.p>
              <m.p className="mt-2 inline-flex flex-wrap items-center gap-x-2 text-[13.5px]" {...rise(0.32)}>
                <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span className="font-medium">{role}</span>
                <span className="meta">{since}</span>
              </m.p>
            </div>
          </div>

          <h1 className="display-hero mt-8 text-balance md:mt-10">
            <span className="sr-only">{profile.name} — </span>
            {LINES.map((l, i) => (
              <span key={l.text} className="line-mask">
                <span className={l.className} style={{ animationDelay: `${200 + i * 90}ms` }}>
                  {l.text}
                </span>
              </span>
            ))}
            <span className="line-mask">
              <span style={{ animationDelay: '380ms' }}>
                <span className="text-accent">real-world</span> problems.
              </span>
            </span>
          </h1>

          <m.p className="lede mt-6 max-w-xl text-ink/85" {...rise(0.5)}>
            {profile.summary}
          </m.p>

          <m.div className="mt-8 flex flex-wrap gap-3" {...rise(0.62)}>
            <Magnetic>
              <a href="#work" className="btn-primary group">
                View projects
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <ResumeButton />
          </m.div>

          <m.ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-muted" {...rise(0.72)}>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="hero-link">
                <GitHubIcon /> <span className="link-underline">SVG700</span>
                <span className="sr-only">on GitHub (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="hero-link">
                <LinkedInIcon /> <span className="link-underline">LinkedIn</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="hero-link">
                <Mail className="size-4" aria-hidden="true" /> <span className="link-underline">Email</span>
              </a>
            </li>
          </m.ul>
        </div>

        {/* Desktop: portrait in front of live-build screenshots and the 3D network. */}
        <div className="hidden lg:col-span-5 lg:block">
          <HeroComposition />
        </div>

        {/* Tablet: live builds below the intro (the portrait is already in the identity row). */}
        <div className="relative isolate hidden md:block lg:hidden">
          <HeroBackdrop
            media="(min-width: 768px) and (max-width: 1023.98px)"
            className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[110%] -translate-x-1/2 -translate-y-1/2 opacity-70 [mask-image:radial-gradient(closest-side,#000_62%,transparent)]"
          />
          <WorkCollage />
          <p className="meta mt-4">Live builds — HelioHub, NyayaLens, PayPerView</p>
        </div>
      </div>
    </section>
  )
}
