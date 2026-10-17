import { ArrowUpRight } from 'lucide-react'
import { achievements } from '../data/achievements'
import { roles } from '../data/experience'
import { projects } from '../data/projects'
import { useOpenProject } from '../drawer'
import { SectionLabel } from './SectionLabel'

const nameOf = Object.fromEntries(projects.map((p) => [p.id, p.name]))

/** Experience & leadership beside recognition — one compact section. */
export function Experience() {
  const open = useOpenProject()

  return (
    <section id="experience" className="border-t border-line bg-bg-alt py-20 md:py-28">
      <div className="container-page">
        <SectionLabel index="01">Experience & achievements</SectionLabel>
        <h2 className="display-lg mt-5 text-balance">Roles and recognition</h2>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h3 className="meta text-muted">Experience & leadership</h3>
            <ol className="mt-3 border-t border-line-strong">
              {roles.map((r) => (
                <li key={r.title + r.organisation} className="border-b border-line py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-display text-[1.2rem] leading-tight font-semibold tracking-[-0.02em]">{r.title}</h4>
                    {r.period && <p className="meta">{r.period}</p>}
                  </div>
                  <p className="mt-1 text-[14px] text-ink/75">{r.organisation}</p>
                  {r.detail && <p className="mt-2 text-[14px] leading-relaxed text-muted text-pretty">{r.detail}</p>}
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <h3 className="meta text-muted">Awards & recognition</h3>
            <ul className="mt-3 border-t border-line-strong">
              {achievements.map((a) => (
                <li key={a.title} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-5">
                  <p
                    className={`font-display leading-none font-semibold tracking-[-0.03em] text-accent ${
                      a.figure.length > 7 ? 'pt-1 text-[1.05rem]' : 'text-[1.45rem]'
                    }`}
                  >
                    {a.figure}
                  </p>
                  <div className="min-w-0">
                    <h4 className="text-[15px] leading-snug font-medium">{a.title}</h4>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                      {a.detail}
                      {a.year && <span className="text-dim"> · {a.year}</span>}
                    </p>
                    {a.project && (
                      <button
                        type="button"
                        onClick={() => open(a.project!)}
                        className="meta mt-2 inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
                      >
                        <span className="link-underline">{nameOf[a.project]}</span>
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </button>
                    )}
                    {a.evidenceUrl && (
                      <a
                        href={a.evidenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="meta mt-2 ml-4 inline-flex items-center gap-1 text-muted hover:text-ink"
                      >
                        <span className="link-underline">Certificate</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
