import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile } from '../data/profile'
import { AndroidAppLink } from './AndroidAppLink'
import { GitHubIcon, LinkedInIcon } from './icons'
import { ResumeButton } from './ResumeButton'

/** Contact band + footer, closing the page. */
export function Footer() {
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
    <footer id="contact" className="border-t border-line bg-surface" style={{ paddingBottom: 'var(--safe-bottom)' }}>
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="meta text-muted">
              <span className="text-accent">(05)</span> Contact
            </p>
            <h2 className="display-md mt-5 text-balance">Have a problem worth solving? Let’s talk.</h2>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 font-display text-[clamp(1.2rem,5vw,1.75rem)] font-semibold tracking-[-0.02em] [overflow-wrap:anywhere]"
              >
                <span className="link-underline">{profile.email}</span>
                <ArrowUpRight
                  className="size-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-muted transition-colors hover:text-ink"
              >
                {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy'}
                <span className="sr-only"> email address</span>
              </button>
              <span role="status" className="sr-only">
                {copied ? 'Email address copied' : ''}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:justify-end">
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <LinkedInIcon /> LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <GitHubIcon /> GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <ResumeButton label="Download resume" download />
            <AndroidAppLink />
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-6 text-[13px] text-muted">
          <p>
            © {new Date().getFullYear()} {profile.name}
            <span className="px-2 text-dim">·</span>
            {profile.location}
          </p>
          <a href="#top" className="meta text-muted hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
