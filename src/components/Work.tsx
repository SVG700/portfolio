import { projects, type Project } from '../data/projects'
import { useOpenProject } from '../drawer'
import { ProjectActions, ProjectVisual, Stack, Status } from './projectBits'
import { SectionLabel } from './SectionLabel'

const byId = (id: string) => projects.find((p) => p.id === id)!
const num = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, '0')

/* ---------- 01 · NEXORA: text column beside a large workspace preview ---------- */
function FeatureNexora({ p }: { p: Project }) {
  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:gap-12" aria-labelledby={`${p.id}-h`}>
      <div className="reveal flex flex-col lg:col-span-4">
        <div className="flex items-center justify-between gap-4">
          <p className="meta">{num(p)} — Featured</p>
          <Status status={p.status} />
        </div>
        <h3 id={`${p.id}-h`} className="display-lg mt-6">
          {p.name}
        </h3>
        <p className="mt-3 text-[14px] text-dim">{p.category}</p>
        <p className="mt-8 text-[1.15rem] leading-snug text-ink text-pretty">{p.problem}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted text-pretty">{p.summary}</p>
        {p.context && <p className="mt-6 border-l border-accent pl-4 text-[14px] leading-relaxed text-ink/85">{p.context}</p>}
        <div className="mt-8 lg:mt-auto lg:pt-10">
          <Stack items={p.stack} />
          <div className="mt-6">
            <ProjectActions project={p} />
          </div>
        </div>
      </div>

      <div className="reveal order-first lg:order-none lg:col-span-8">
        <ProjectVisual project={p} />
        <ul className="mt-6 grid gap-x-8 border-t border-line sm:grid-cols-3">
          {p.features.slice(0, 6).map((f) => (
            <li key={f} className="border-b border-line py-3 text-[13.5px] text-muted">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

/* ---------- 02 · PAIMANA: full-width dashboard, then a three-part brief ---------- */
function FeaturePaimana({ p }: { p: Project }) {
  return (
    <article aria-labelledby={`${p.id}-h`}>
      <div className="reveal">
        <ProjectVisual project={p} />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:col-span-4">
          <div className="flex items-center justify-between gap-4">
            <p className="meta">{num(p)} — Featured</p>
            <Status status={p.status} />
          </div>
          <h3 id={`${p.id}-h`} className="display-md mt-6 text-balance">
            {p.name}
          </h3>
          <p className="mt-3 text-[14px] text-dim">{p.category}</p>
          <p className="mt-6 text-[1.05rem] leading-snug text-ink text-pretty">{p.problem}</p>
        </div>

        <div className="reveal lg:col-span-5">
          <p className="meta">How it forecasts</p>
          <ol className="mt-4 space-y-5">
            {p.approach?.map((a, i) => {
              const [head, ...rest] = a.split(':')
              return (
                <li key={i} className="grid grid-cols-[1.75rem_1fr] text-[14.5px] leading-relaxed">
                  <span className="meta pt-0.5 text-accent">{i + 1}</span>
                  <span className="text-muted">
                    {rest.length ? (
                      <>
                        <span className="text-ink">{head}</span> —{rest.join(':')}
                      </>
                    ) : (
                      a
                    )}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="reveal flex flex-col lg:col-span-3">
          <p className="meta">Scope</p>
          <p className="mt-4 text-[14px] leading-relaxed text-muted">{p.notes?.[0]}</p>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <Stack items={p.stack} />
            <div className="mt-6">
              <ProjectActions project={p} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ---------- Additional projects: asymmetric 7/5 · 5/7 grid ---------- */
function ProjectTile({ p, wide }: { p: Project; wide: boolean }) {
  const open = useOpenProject()
  return (
    <article className={`reveal group ${wide ? 'lg:col-span-7' : 'lg:col-span-5'}`} aria-labelledby={`${p.id}-h`}>
      <button
        type="button"
        onClick={() => open(p.id)}
        className="block w-full text-left transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="transition-[filter] duration-500 group-hover:brightness-110">
          <ProjectVisual project={p} />
        </div>
      </button>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="meta">
          {num(p)} — {p.category}
        </p>
        <Status status={p.status} />
      </div>
      <h3 id={`${p.id}-h`} className="display-sm mt-3">
        {p.name}
      </h3>
      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted text-pretty">{p.summary}</p>
      {p.role && <p className="mt-3 text-[14px] text-ink/85">{p.role}</p>}
      <div className="mt-4">
        <Stack items={p.stack} max={4} />
      </div>
      <div className="mt-5">
        <ProjectActions project={p} compact />
      </div>
    </article>
  )
}

/* ---------- Other projects: an index ---------- */
function ProjectRow({ p }: { p: Project }) {
  return (
    <li className="reveal group grid gap-x-8 gap-y-3 border-b border-line py-7 transition-colors md:grid-cols-[3rem_14rem_1fr] lg:grid-cols-[3rem_15rem_1fr_15rem]">
      <span className="meta hidden pt-1 md:block">{num(p)}</span>
      <div>
        <h3 className="font-display text-[1.35rem] font-semibold tracking-[-0.02em] transition-colors group-hover:text-accent">
          {p.name}
        </h3>
        <p className="mt-1 text-[13px] text-dim">{p.category}</p>
      </div>
      <div>
        <p className="text-[14.5px] leading-relaxed text-muted text-pretty">{p.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
          <Status status={p.status} />
          {p.context && <span className="meta">{p.context}</span>}
        </div>
      </div>
      <div className="md:col-start-2 lg:col-start-auto lg:justify-self-end">
        <ProjectActions project={p} compact />
      </div>
    </li>
  )
}

export function Work() {
  const featured = projects.filter((p) => p.tier === 'featured')
  const more = projects.filter((p) => p.tier === 'more')
  const tileOrder = ['heliohub', 'ecobuddy', 'payperview', 'nyayalens'].map(byId)

  return (
    <section id="work" className="pt-28 pb-24 md:pt-40 md:pb-32">
      <div className="container-page">
        <div className="reveal grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="01">Selected work</SectionLabel>
            <h2 className="display-lg mt-6 text-balance">Things I've built, and what they're for.</h2>
          </div>
          <p className="lede max-w-md lg:col-span-5 lg:justify-self-end">
            {projects.length} projects across applied AI, full-stack, Android and Web3. Each one is marked live demo,
            prototype, in development or concept, so it's clear what exists today.
          </p>
        </div>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-36">
          <FeatureNexora p={byId('nexora')} />
          <FeaturePaimana p={byId('paimana')} />
        </div>

        <div className="mt-32 md:mt-44">
          <div className="reveal flex items-baseline justify-between gap-6 border-b border-line pb-5">
            <h3 className="display-sm">More builds</h3>
            <p className="meta">{featured.length} projects</p>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-20 lg:grid-cols-12">
            {tileOrder.map((p, i) => (
              <ProjectTile key={p.id} p={p} wide={i === 0 || i === 3} />
            ))}
          </div>
        </div>

        <div className="mt-32 md:mt-40">
          <div className="reveal flex items-baseline justify-between gap-6 border-b border-line pb-5">
            <h3 className="display-sm">Also</h3>
            <p className="meta">Early projects, concepts and challenge builds</p>
          </div>
          <ul>
            {more.map((p) => (
              <ProjectRow key={p.id} p={p} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
