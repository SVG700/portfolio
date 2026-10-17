import { Fragment } from 'react'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import { useOpenProject } from '../drawer'
import { SectionLabel } from './SectionLabel'

const nameOf = Object.fromEntries(projects.map((p) => [p.id, p.name]))

export function Skills() {
  const open = useOpenProject()
  return (
    <section id="skills" className="border-t border-line bg-bg-alt py-20 md:py-28">
      <div className="container-page">
        <SectionLabel index="03">Skills</SectionLabel>
        <h2 className="display-lg mt-5">What I build with</h2>

        <dl className="mt-10 border-t border-line-strong">
          {skillGroups.map((g) => (
            <div key={g.title} className="grid gap-2 border-b border-line py-5 md:grid-cols-[11rem_1fr_auto] md:items-baseline md:gap-8">
              <dt className="meta text-muted">{g.title}</dt>
              <dd className="text-[1.05rem] leading-relaxed">
                {g.skills.map((s, i) => (
                  <Fragment key={s.name}>
                    <span className="whitespace-nowrap">
                      <span className={s.level ? 'text-muted' : 'text-ink'}>{s.name}</span>
                      {s.level && <span className="meta ml-1.5 text-amber">({s.level})</span>}
                      {i < g.skills.length - 1 && <span className="text-dim">,</span>}
                    </span>{' '}
                  </Fragment>
                ))}
              </dd>
              {g.evidence.length > 0 && (
                <dd className="meta md:text-right">
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
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
