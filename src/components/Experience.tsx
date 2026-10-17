import { roles } from '../data/experience'
import { SectionLabel } from './SectionLabel'

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-36">
      <div className="container-page">
        <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="05">Experience & leadership</SectionLabel>
            <h2 className="display-lg mt-6 text-balance">Beyond writing code</h2>
          </div>
          <p className="lede max-w-md lg:col-span-5 lg:justify-self-end">
            Festivals, outreach and student roles — coordinating people, communicating ideas and following through.
          </p>
        </div>

        <ol className="mt-16 border-t border-line-strong">
          {roles.map((r) => (
            <li
              key={r.title + r.organisation}
              className="reveal group grid gap-x-10 gap-y-3 border-b border-line py-8 transition-colors md:grid-cols-[1fr_1.1fr] lg:grid-cols-[10rem_1fr_1.15fr]"
            >
              <p className="meta flex items-center gap-2 self-start lg:pt-2.5">
                <span
                  className={`size-1.5 rounded-full ${r.kind === 'Experience' ? 'bg-accent' : 'border border-muted'}`}
                  aria-hidden="true"
                />
                {r.kind}
                {r.period && <span>· {r.period}</span>}
              </p>
              <div>
                <h3 className="font-display text-[1.55rem] leading-tight font-semibold tracking-[-0.025em]">{r.title}</h3>
                <p className="mt-1.5 text-[14.5px] text-ink/75">{r.organisation}</p>
              </div>
              <p className="text-[14.5px] leading-relaxed text-muted text-pretty md:pt-1">{r.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
