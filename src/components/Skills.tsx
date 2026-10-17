import { Fragment } from 'react'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import { useOpenProject } from '../drawer'
import { SectionLabel } from './SectionLabel'

const nameOf = Object.fromEntries(projects.map((p) => [p.id, p.name]))

export function Skills() {
  const open = useOpenProject()
  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="reveal lg:sticky lg:top-28">
            <SectionLabel index="03">Toolkit</SectionLabel>
            <h2 className="display-lg mt-6">What I build with</h2>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-muted">
              Grouped by area, each linked to the projects where it shows up. Anything still being learned is marked.
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8">
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              className={`reveal grid gap-4 py-8 md:grid-cols-[13rem_1fr] md:gap-10 ${i > 0 ? 'border-t border-line' : 'md:pt-2'}`}
            >
              <div>
                <h3 className="display-sm text-[1.3rem]">{g.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-dim">{g.description}</p>
              </div>
              <div>
                <p className="font-display text-[1.45rem] leading-[1.45] font-medium tracking-[-0.015em] text-pretty md:text-[1.6rem]">
                  {g.skills.map((s) => (
                    <Fragment key={s.name}>
                      <span className="mr-[0.7em] whitespace-nowrap">
                        <span className={s.level ? 'text-muted' : 'text-ink'}>{s.name}</span>
                        {s.level && (
                          <sup className="meta ml-1 align-super text-[10px] text-amber">{s.level.toLowerCase()}</sup>
                        )}
                      </span>{' '}
                    </Fragment>
                  ))}
                </p>
                {g.evidence.length > 0 && (
                  <p className="meta mt-4">
                    Used in{' '}
                    {g.evidence.map((id, k) => (
                      <span key={id}>
                        <button
                          type="button"
                          onClick={() => open(id)}
                          className="link-underline text-muted transition-colors hover:text-ink"
                        >
                          {nameOf[id]}
                        </button>
                        {k < g.evidence.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
