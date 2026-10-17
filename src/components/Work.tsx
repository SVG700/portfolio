import { projects, type Project } from '../data/projects'
import { Reveal, Stagger, StaggerItem } from '../motion'
import { usePointerFx } from '../motion-shared'
import { ProjectActions, ProjectVisual, Stack, Status } from './projectBits'
import { SectionLabel } from './SectionLabel'

/* Featured: text beside an interface preview. The preview is tablet+ only —
   on phones a scaled-down interface would be unreadable. */
function Featured({ p, flip }: { p: Project; flip: boolean }) {
  return (
    <article className="group/feature grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12" aria-labelledby={`${p.id}-h`}>
      <div className={`flex flex-col lg:col-span-5 ${flip ? 'lg:order-last' : ''}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Status status={p.status} />
          <p className="meta">{p.category}</p>
        </div>
        <h3 id={`${p.id}-h`} className="display-md mt-4 text-balance">
          {p.name}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-muted text-pretty">{p.summary}</p>
        {p.context && <p className="mt-4 border-l border-accent pl-3 text-[14px] text-ink/85">{p.context}</p>}
        <div className="mt-6">
          <Stack items={p.stack} />
        </div>
        <div className="mt-5">
          <ProjectActions project={p} />
        </div>
      </div>
      <div className="hidden md:block lg:col-span-7">
        <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/feature:-translate-y-1 group-hover/feature:scale-[1.012]">
          <ProjectVisual project={p} />
        </div>
      </div>
    </article>
  )
}

/* Compact card for the rest — no thumbnails, so the grid stays short and legible. */
function Card({ p }: { p: Project }) {
  const fx = usePointerFx()
  return (
    <article
      className="spotlight flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-[transform,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-accent/30 md:p-6"
      aria-labelledby={`${p.id}-h`}
      onPointerMove={
        fx
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
            }
          : undefined
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="meta">{p.category}</p>
        <Status status={p.status} />
      </div>
      <h3 id={`${p.id}-h`} className="display-sm mt-3 text-[1.35rem]">
        {p.name}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted text-pretty">{p.summary}</p>
      {p.role && <p className="mt-3 text-[13.5px] text-ink/85">{p.role}</p>}
      <div className="mt-auto pt-5">
        <Stack items={p.stack} max={4} />
        <div className="mt-4">
          <ProjectActions project={p} compact />
        </div>
      </div>
    </article>
  )
}

export function Work() {
  const featured = projects.filter((p) => p.tier === 'featured')
  const more = projects.filter((p) => p.tier === 'more')

  return (
    <section id="work" className="py-20 md:py-28">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            <SectionLabel index="02">Selected projects</SectionLabel>
            <h2 className="display-lg mt-5">Things I’ve built</h2>
          </div>
          <p className="max-w-sm text-[14.5px] leading-relaxed text-muted">
            Every project is marked live demo, prototype or in development, so it’s clear what exists today.
          </p>
        </Reveal>

        <div className="mt-12 space-y-16 md:mt-16 md:space-y-20">
          {featured.map((p, i) => (
            <Reveal key={p.id}>
              <Featured p={p} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        <h3 className="meta mt-16 text-muted md:mt-20">More projects</h3>
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
