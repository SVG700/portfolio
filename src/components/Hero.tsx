import { m } from 'framer-motion'
import { achievements } from '../data/achievements'
import { profile } from '../data/profile'
import { CountUp, Magnetic } from '../motion'
import { EASE } from '../motion-shared'
import { isNativeApp } from '../platform'
import { HeroBackdrop } from '../three/HeroBackdrop'
import { HeroTerminal } from './HeroTerminal'
import { ArrowDown, ArrowUpRight, GitHubIcon, LinkedInIcon, Mail } from './icons'
import { ResumeButton } from './ResumeButton'

/** Fade-and-rise for the hero's text blocks, in sequence after the name. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE, delay },
})

// "Samhith" / "V Gupta" — the name is the headline, split after the first word.
const [FIRST, ...REST] = profile.name.split(' ')
const NAME_LINES = [FIRST, REST.join(' ')]

// The headline sentence with its key phrase set in the serif italic.
const KEY = 'real-world'
const [BEFORE, AFTER] = profile.headline.split(KEY)

// The three results shown under the hero — the first three in achievements.json.
const PROOF = achievements.slice(0, 3)

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-clip pt-20 md:pt-28"
      style={{ marginTop: 'var(--safe-top)' }}
    >
      {/* Atmosphere: two soft lights behind the graph (gradients, no blur filter). */}
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0 -z-20" />

      {/* The knowledge graph: the ambient layer, behind the text and the terminal. */}
      <HeroBackdrop className="absolute top-12 -right-[42%] -z-10 aspect-square w-[135%] opacity-45 [mask-image:radial-gradient(closest-side,#000_55%,transparent)] sm:-right-[20%] sm:w-[90%] lg:inset-y-0 lg:top-0 lg:right-0 lg:aspect-auto lg:h-full lg:w-[62%] lg:opacity-80 lg:[mask-image:linear-gradient(90deg,transparent,#000_22%)]" />

      <div className="container-page flex flex-1 flex-col justify-center pb-10">
        {/* Phones: intro, terminal, then actions. Desktop: text left, terminal right over the graph. */}
        <div className="grid gap-x-10 gap-y-5 sm:gap-y-7 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <m.div className="flex flex-wrap items-center gap-x-3 gap-y-2" {...rise(0.05)}>
              {profile.openToInternships && (
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1.5 text-[12.5px] font-medium text-accent">
                  <span className="relative flex size-2" aria-hidden="true">
                    <span className="pulse-ring absolute inline-flex size-full rounded-full bg-accent" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent" />
                  </span>
                  Open to internships
                </span>
              )}
              <span className="meta text-muted">{profile.location}</span>
            </m.div>

            <h1 className="display-name mt-4 sm:mt-6">
              {NAME_LINES.map((line, i) => (
                <span key={line} className="line-mask">
                  <span style={{ animationDelay: `${60 + i * 70}ms` }}>
                    {line}
                    {i === NAME_LINES.length - 1 && <span className="text-accent">.</span>}
                  </span>
                </span>
              ))}
            </h1>

            <m.p className="display-tagline mt-4 max-w-[34rem] text-balance sm:mt-6" {...rise(0.2)}>
              {AFTER === undefined ? (
                profile.headline
              ) : (
                <>
                  {BEFORE}
                  <span className="serif-accent">{KEY}</span>
                  {AFTER}
                </>
              )}
            </m.p>
          </div>

          {/* Identity: photo, degree and current role, shown as a terminal running whoami. */}
          <m.div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1" {...rise(0.25)}>
            <HeroTerminal className="w-full max-w-[27rem] lg:ml-auto" />
          </m.div>

          <div className="flex flex-col lg:col-span-7">
            <m.p className="lede order-2 mt-7 max-w-xl text-[1.02rem] text-muted lg:order-1 lg:mt-0" {...rise(0.3)}>
              {profile.summary}
            </m.p>

            <m.div className="order-1 flex flex-wrap gap-3 lg:order-2 lg:mt-8" {...rise(0.35)}>
              <Magnetic>
                <a href="#work" className="btn-primary group">
                  View projects
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                </a>
              </Magnetic>
              <ResumeButton />
            </m.div>

            <m.ul className="order-3 mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-muted" {...rise(0.4)}>
              <li>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="hero-link">
                  <GitHubIcon /> <span className="link-underline">GitHub</span>
                  <span className="sr-only">(opens in a new tab)</span>
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
        </div>

        {/* What the graph shows (desktop, where it is interactive). */}
        {!isNativeApp && (
          <m.p className="meta pointer-events-none absolute top-28 right-10 hidden items-center gap-4 lg:flex" aria-hidden="true" {...rise(0.8)}>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-accent" />Projects</span>
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-ion" />Skills</span>
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-ink" />Awards</span>
            <span className="text-muted">Hover a node, click a project</span>
          </m.p>
        )}
      </div>

      {/* Proof strip: the strongest results, on the first screen. */}
      <m.div className="border-t border-line bg-bg/60 backdrop-blur-sm" {...rise(0.45)}>
        <ul className="container-page grid sm:grid-cols-3">
          {PROOF.map((a, i) => (
            <li key={a.title} className={`${i > 0 ? 'border-t border-line sm:border-t-0 sm:border-l' : ''}`}>
              <a
                href="#experience"
                className={`group flex items-baseline gap-4 py-4 sm:flex-col sm:gap-1.5 sm:py-5 ${i === 0 ? 'sm:pr-6 lg:pr-8' : 'sm:px-6 lg:px-8'}`}
              >
                <span className="w-24 shrink-0 font-display text-[1.5rem] leading-none font-semibold tracking-[-0.03em] text-accent sm:w-auto sm:text-[1.9rem]">
                  <CountUp text={a.figure} />
                </span>
                <span className="flex min-w-0 items-center gap-1.5 text-[13.5px] leading-snug text-muted transition-colors group-hover:text-ink">
                  <span className="line-clamp-2">{a.title}</span>
                  <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </m.div>
    </section>
  )
}
