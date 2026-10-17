import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile, roleFit } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './icons'
import { AndroidAppLink } from './AndroidAppLink'
import { ResumeButton } from './ResumeButton'
import { SectionLabel } from './SectionLabel'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; the mailto link still works.
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-surface py-24 md:py-36">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,#000_40%,#000)]" aria-hidden="true" />
      <div className="container-page relative">
        <SectionLabel index="06">Contact</SectionLabel>
        <h2 className="display-xl mt-8 max-w-5xl text-balance">
          Have a problem worth solving? <span className="text-muted">Let's talk.</span>
        </h2>
        <p className="lede mt-8 max-w-xl">
          A project to build, an opportunity to discuss, or an idea you'd like a second pair of hands on — I'd love to
          hear from you.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="meta">Email</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 font-display text-[clamp(1.2rem,5.4vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] [overflow-wrap:anywhere] lg:text-[clamp(1.5rem,2.5vw,2.25rem)]"
              >
                <span className="link-underline">{profile.email}</span>
                <ArrowUpRight
                  className="size-6 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-muted transition-colors hover:text-ink"
              >
                {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy'}
                <span className="sr-only"> email address</span>
              </button>
              <span role="status" className="sr-only">
                {copied ? 'Email address copied' : ''}
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-start gap-x-3 gap-y-5">
              <ResumeButton label="Download resume" download />
              <AndroidAppLink />
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="border-t border-line-strong">
              {[
                { label: 'LinkedIn', value: 'in/samhith-v-gupta', href: profile.links.linkedin, icon: <LinkedInIcon /> },
                { label: 'GitHub', value: 'SVG700', href: profile.links.github, icon: <GitHubIcon /> },
              ].map((c) => (
                <li key={c.label} className="border-b border-line">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="flex items-center gap-3 text-[1.05rem]">
                      {c.icon} {c.label}
                    </span>
                    <span className="meta flex items-center gap-2 text-muted transition-colors group-hover:text-ink">
                      {c.value}
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="meta mt-10">Roles I'm interested in</p>
            <p className="mt-3 text-[15px] leading-[1.8] text-ink/85">
              {roleFit.map((r, i) => (
                <span key={r}>
                  {r}
                  {i < roleFit.length - 1 && <span className="px-2 text-dim">/</span>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
