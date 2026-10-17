import { activities, education, languages } from '../data/profile'
import { SectionLabel } from './SectionLabel'

export function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="container-page">
        <SectionLabel index="04">Education & activities</SectionLabel>
        <h2 className="display-lg mt-5">Background</h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h3 className="meta text-muted">Education</h3>
            <ol className="mt-3 border-t border-line-strong">
              {education.map((e) => (
                <li key={e.institution} className="border-b border-line py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-display text-[1.15rem] leading-tight font-semibold tracking-[-0.02em]">
                      {e.institution}
                    </h4>
                    <p className="meta">{e.period}</p>
                  </div>
                  <p className="mt-1 text-[14px] text-muted">
                    {e.degree}
                    {e.note && <span className="text-ink/80"> · {e.note}</span>}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-4">
            <h3 className="meta text-muted">Activities</h3>
            <ul className="mt-3 border-t border-line-strong">
              {activities.map((a) => (
                <li key={a} className="border-b border-line py-3.5 text-[14px] leading-relaxed text-ink/85">
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="meta text-muted">Languages</h3>
            <ul className="mt-3 border-t border-line-strong">
              {languages.map((l) => (
                <li key={l.name} className="flex justify-between gap-4 border-b border-line py-3.5 text-[14px]">
                  <span className="text-ink/85">{l.name}</span>
                  <span className="meta">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
