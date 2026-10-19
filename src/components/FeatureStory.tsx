import { useInView } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Project } from '../data/projects'
import { Decode } from './Decode'
import { ProjectActions, ProjectVisual, Stack, Status } from './projectBits'
import { Depth, Tilt } from './Tilt'

/**
 * Desktop scroll story for a featured project: the preview stays pinned
 * (CSS sticky) while three steps — problem, what it does, scope — scroll
 * past at normal speed. The step nearest the middle of the screen is
 * emphasised; the others stay readable. Nothing hijacks scrolling.
 */
function Step({
  index,
  label,
  onActive,
  active,
  children,
}: {
  index: number
  label: string
  onActive: (i: number) => void
  active: boolean
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])
  return (
    <div
      ref={ref}
      className={`flex min-h-[40vh] flex-col justify-center border-l py-10 pl-6 transition-[opacity,border-color] duration-500 ${
        active ? 'border-accent opacity-100' : 'border-line opacity-55'
      }`}
    >
      <p className="meta">
        <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> / {label}
      </p>
      <div className="mt-4 text-[15.5px] leading-relaxed text-muted text-pretty">{children}</div>
    </div>
  )
}

export function FeatureStory({ p, flip }: { p: Project; flip: boolean }) {
  const [active, setActive] = useState(0)
  const steps = [
    { label: 'Problem', body: <p className="text-[1.15rem] leading-snug text-ink">{p.problem}</p> },
    {
      label: 'What it does',
      body: (
        <>
          <p>{p.summary}</p>
          <ul className="mt-4 space-y-1.5 text-ink/85">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span className="mt-[11px] h-px w-2.5 shrink-0 bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      label: 'Scope',
      body: (
        <>
          {p.context && <p className="text-ink/85">{p.context}</p>}
          {p.notes?.map((n) => (
            <p key={n} className="mt-2">
              {n}
            </p>
          ))}
          <div className="mt-5">
            <Stack items={p.stack} />
          </div>
          <div className="mt-5">
            <ProjectActions project={p} />
          </div>
        </>
      ),
    },
  ]

  return (
    <article className="grid grid-cols-12 gap-12" aria-labelledby={`${p.id}-h`}>
      <div className={`col-span-5 ${flip ? 'order-last' : ''}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Status status={p.status} />
          <p className="meta">
            <Decode text={p.category} />
          </p>
        </div>
        <h3 id={`${p.id}-h`} className="display-md mt-4 text-balance">
          {p.name}
        </h3>
        <div className="mt-6">
          {steps.map((s, i) => (
            <Step key={s.label} index={i} label={s.label} active={active === i} onActive={setActive}>
              {s.body}
            </Step>
          ))}
        </div>
      </div>
      <div className="col-span-7">
        <div className="sticky top-[calc(5rem+var(--safe-top))] py-6">
          <Tilt max={5} className="sheen rounded-[10px]">
            <Depth z={18}>
              <ProjectVisual project={p} />
            </Depth>
          </Tilt>
          {/* Step indicator */}
          <div className="mt-5 flex items-center gap-2" aria-hidden="true">
            {steps.map((s, i) => (
              <span
                key={s.label}
                className={`h-[3px] w-10 origin-left rounded-full transition-[transform,background-color] duration-500 ${
                  active === i ? 'bg-accent' : 'scale-x-50 bg-line-strong'
                }`}
              />
            ))}
            <span className="meta ml-2">{steps[active].label}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
