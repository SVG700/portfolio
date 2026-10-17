import { ArrowUpRight } from 'lucide-react'
import { achievements } from '../data/achievements'
import { projects } from '../data/projects'
import { useOpenProject } from '../drawer'
import { SectionLabel } from './SectionLabel'

const nameOf = Object.fromEntries(projects.map((p) => [p.id, p.name]))

export function Achievements() {
  const open = useOpenProject()
  const highlights = achievements.filter((a) => a.highlight)
  const rest = achievements.filter((a) => !a.highlight)

  return (
    <section id="recognition" className="border-t border-line bg-bg-alt py-24 md:py-36">
      <div className="container-page">
        <div className="reveal grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel index="04">Recognition</SectionLabel>
            <h2 className="display-lg mt-6 text-balance">Awards, programmes and selections</h2>
          </div>
        </div>

        {/* Three headline recognitions, set as large figures. */}
        <div className="mt-16 grid border-t border-line md:grid-cols-3">
          {highlights.map((a, i) => (
            <article
              key={a.title}
              className={`reveal flex flex-col py-10 md:px-8 md:py-12 ${i > 0 ? 'border-t border-line md:border-t-0 md:border-l' : 'md:pl-0'}`}
            >
              <p className="font-display text-[clamp(3rem,6vw,4.75rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-accent">
                {a.figure}
              </p>
              <h3 className="mt-8 text-[1.05rem] font-medium">{a.title}</h3>
              <p className="mt-1 text-[13.5px] text-dim">{a.issuer}</p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted text-pretty">{a.description}</p>
              {a.project && (
                <button
                  type="button"
                  onClick={() => open(a.project!)}
                  className="meta mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-muted transition-colors hover:text-ink"
                >
                  <span className="link-underline">Project · {nameOf[a.project]}</span>
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </button>
              )}
            </article>
          ))}
        </div>

        <ul className="border-t border-line">
          {rest.map((a) => (
            <li
              key={a.title}
              className="reveal grid gap-x-10 gap-y-2 border-b border-line py-7 md:grid-cols-[9rem_1fr_1.3fr]"
            >
              <p className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.03em]">{a.figure}</p>
              <div>
                <h3 className="font-medium">
                  {a.title}
                  {a.year && <span className="meta ml-2">{a.year}</span>}
                </h3>
                <p className="mt-1 text-[13.5px] text-dim">{a.issuer}</p>
              </div>
              <div className="text-[14.5px] leading-relaxed text-muted text-pretty">
                {a.description}
                <span className="mt-2 flex flex-wrap gap-x-5">
                  {a.project && (
                    <button
                      type="button"
                      onClick={() => open(a.project!)}
                      className="meta inline-flex items-center gap-1.5 text-muted hover:text-ink"
                    >
                      <span className="link-underline">Project · {nameOf[a.project]}</span>
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </button>
                  )}
                  {a.evidenceUrl && (
                    <a
                      href={a.evidenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meta inline-flex items-center gap-1.5 text-muted hover:text-ink"
                    >
                      <span className="link-underline">Certificate</span> <ArrowUpRight className="size-3" aria-hidden="true" />
                    </a>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="meta mt-6">Google Student Ambassador is a student programme, not employment with Google.</p>
      </div>
    </section>
  )
}
