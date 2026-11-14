import { useEffect, useState } from 'react'
import { projects, type Project } from '../data/projects'
import { Reveal, Stagger, StaggerItem } from '../motion'
import { ProjectActions, ProjectVisual, Stack, Status } from './projectBits'
import { useOpenProject } from '../drawer'
import { SectionLabel } from './SectionLabel'
import { Depth, Tilt } from './Tilt'
import { AnimatedHeading } from './AnimatedHeading'
import { Decode } from './Decode'
import { FeatureStory } from './FeatureStory'
import { useMotionAllowed } from '../motion-shared'
import { isNativeApp } from '../platform'

/* Featured: text beside an interface preview. The lead project shows its
   details (problem, features, scope notes) in full from tablet width up; the
   others, and every project on phones, keep them behind a "Read more" toggle
   so the section stays short. */
function Featured({ p, flip, expanded = false }: { p: Project; flip: boolean; expanded?: boolean }) {
  const open = useOpenProject()
  const [more, setMore] = useState(false)
  const show = expanded || more
  return (
    <article className="group/feature grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12" aria-labelledby={`${p.id}-h`}>
      <div className={`flex min-w-0 flex-col lg:col-span-5 ${flip ? 'lg:order-last' : ''}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Status status={p.status} />
          <p className="meta"><Decode text={p.category} /></p>
        </div>
        <h3 id={`${p.id}-h`} className="display-md mt-4 text-balance">
          {p.name}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-muted text-pretty">{p.summary}</p>
        {p.context && <p className="mt-4 border-l border-accent pl-3 text-[14px] text-ink/85">{p.context}</p>}
        {show && (
          <div id={`${p.id}-more`} className={`enter mt-5 text-[14.5px] leading-relaxed text-muted ${expanded && !more ? 'hidden md:block' : ''}`}>
            <p className="text-ink">{p.problem}</p>
            <ul className="mt-3 space-y-1.5 text-ink/85">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="mt-[11px] h-px w-2.5 shrink-0 bg-accent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            {p.notes?.map((n) => (
              <p key={n} className="mt-3">
                {n}
              </p>
            ))}
          </div>
        )}
        {
          <button
            type="button"
            aria-expanded={more}
            aria-controls={`${p.id}-more`}
            onClick={() => setMore((v) => !v)}
            className={`meta mt-4 self-start text-muted transition-colors hover:text-ink ${expanded ? 'md:hidden' : ''}`}
          >
            <span className="link-underline">{more ? 'Show less' : 'Read more'}</span>
            <span className="sr-only"> about {p.name}</span>
            <span aria-hidden="true"> {more ? '−' : '+'}</span>
          </button>
        }
        <div className="mt-6">
          <Stack items={p.stack} />
        </div>
        <div className="mt-5">
          <ProjectActions project={p} />
        </div>
      </div>
      {/* Preview: tilts toward the cursor and opens the overview when clicked. */}
      <div className="-order-1 min-w-0 md:order-none lg:col-span-7">
        <Tilt max={5} className="sheen glow-border relative cursor-pointer rounded-[10px]" data-cursor="View" onClick={() => open(p.id)}>
          <Depth z={18}>
            <ProjectVisual project={p} />
          </Depth>
        </Tilt>
      </div>
    </article>
  )
}

/* Compact card for the rest — no thumbnails, so the grid stays short and legible. */
function Card({ p }: { p: Project }) {
  const open = useOpenProject()
  return (
    <Tilt
      as="article"
      max={7}
      // The whole card opens the overview; its own links and buttons still work.
      onClick={(e) => {
        if (!(e.target instanceof Element && e.target.closest('a, button'))) open(p.id)
      }}
      className="spotlight sheen glow-border flex cursor-pointer h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-[translate,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-accent/30 md:p-6"
      aria-labelledby={`${p.id}-h`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="meta"><Decode text={p.category} /></p>
        <Status status={p.status} />
      </div>
      <h3 id={`${p.id}-h`} className="display-sm mt-3 text-[1.35rem]">
        {p.name}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted text-pretty">{p.summary}</p>
      {p.role && <p className="mt-3 text-[13.5px] text-ink/85">{p.role}</p>}
      {p.context && <p className="meta mt-1.5">{p.context}</p>}
      <div className="mt-auto pt-5">
        <Stack items={p.stack} max={4} />
        <div className="mt-4">
          <ProjectActions project={p} compact />
        </div>
      </div>
    </Tilt>
  )
}

/** Pinned scroll story on desktop with motion allowed (not in the app). */
function useStoryLayout() {
  const allowed = useMotionAllowed()
  const [wide, setWide] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return wide && allowed && !isNativeApp
}

export function Work() {
  const story = useStoryLayout()
  const featured = projects.filter((p) => p.tier === 'featured')
  const more = projects.filter((p) => p.tier === 'more')

  return (
    <section id="work" className="section-glow py-16 md:py-20">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <SectionLabel index="02">Selected projects</SectionLabel>
            <AnimatedHeading text="Things I’ve built" keyword="built" className="display-lg mt-5" />
          </div>
          <p className="max-w-sm text-[14.5px] leading-relaxed text-muted">
            Every project is marked live demo, prototype or in development, so it’s clear what exists today.
          </p>
        </Reveal>

        <div className="mt-10 space-y-14 md:space-y-16">
          {featured.map((p, i) =>
            // Only the lead project gets the long pinned scroll story (desktop).
            story && i === 0 ? (
              <FeatureStory key={p.id} p={p} flip={false} />
            ) : (
              <Reveal key={p.id}>
                <Featured p={p} flip={i % 2 === 1} expanded={i === 0} />
              </Reveal>
            ),
          )}
        </div>

        <h3 className="meta mt-14 text-muted md:mt-16">More projects</h3>
        <Stagger as="div" className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {more.map((p) => (
            <StaggerItem as="div" key={p.id}>
              <Card p={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
