import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-page flex flex-col gap-5 py-8 text-[13.5px] text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
          <span className="px-2 text-dim">·</span>
          {profile.location}
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${profile.email}`} className="link-underline hover:text-ink">
              Email
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ink">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ink">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href="#top" className="meta text-muted hover:text-ink">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
