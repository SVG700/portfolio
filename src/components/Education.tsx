import { activities, education, languages } from '../data/profile'
import { Reveal } from '../motion'
import { SectionLabel } from './SectionLabel'
import { AnimatedHeading } from './AnimatedHeading'

export function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <SectionLabel index="04">Education & activities</SectionLabel>
        </Reveal>
        <AnimatedHeading text="Background" keyword="Background" className="display-lg mt-5" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
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
          </Reveal>

          <Reveal className="lg:col-span-4" delay={0.08}>
            <h3 className="meta text-muted">Activities</h3>
            <ul className="mt-3 border-t border-line-strong">
              {activities.map((a) => (
                <li key={a} className="border-b border-line py-3.5 text-[14px] leading-relaxed text-ink/85">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.16}>
            <h3 className="meta text-muted">Languages</h3>
            <ul className="mt-3 border-t border-line-strong">
              {languages.map((l) => (
                <li key={l.name} className="flex justify-between gap-4 border-b border-line py-3.5 text-[14px]">
                  <span className="text-ink/85">{l.name}</span>
                  <span className="meta">{l.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
