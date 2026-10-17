import type { ReactNode } from 'react'
import { about, education, profile } from '../data/profile'
import { SectionLabel } from './SectionLabel'

export function About() {
  return (
    <section id="about" className="border-t border-line bg-bg-alt py-24 md:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:col-span-5 lg:self-start lg:sticky lg:top-28">
          <SectionLabel index="02">About</SectionLabel>
          <p className="display-md mt-8 text-balance">
            I'm interested in software that goes <span className="text-muted">beyond the demo</span> — and in
            learning by building it.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="reveal space-y-5 text-[1.05rem] leading-[1.7] text-muted text-pretty">
            {about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-ink' : undefined}>
                {p}
              </p>
            ))}
          </div>

          {/* Profile sheet: facts, interests and education, set as a spec table. */}
          <div className="reveal mt-14 border-t border-line">
            <dl className="divide-y divide-line">
              <SheetRow label="Based in">{profile.location}</SheetRow>
              <SheetRow label="Education">
                <ul className="space-y-3">
                  {education.map((e) => (
                    <li key={e.institution}>
                      <span className="text-ink">{e.degree}</span>
                      <span className="block text-muted">
                        {e.institution}
                        {e.period && <span className="meta ml-2">{e.period}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </SheetRow>
              <SheetRow label="Interests">
                <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {about.interests.map((item) => (
                    <li key={item} className="text-ink/90">
                      {item}
                    </li>
                  ))}
                </ul>
              </SheetRow>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function SheetRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 py-5 text-[14.5px] leading-relaxed sm:grid-cols-[8rem_1fr] sm:gap-6">
      <dt className="meta pt-0.5">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
