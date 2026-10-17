import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks'

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'experience', label: 'Experience' },
]
const IDS = [...NAV.map((n) => n.id), 'contact']

export function Navbar() {
  const active = useActiveSection(IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        open ? 'bg-bg' : scrolled ? 'border-b border-line bg-bg/80 backdrop-blur-lg' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <nav className="container-page flex h-16 items-center justify-between gap-6" aria-label="Primary">
        <a href="#top" onClick={close} className="font-display text-[17px] font-semibold tracking-[-0.02em]">
          Samhith V Gupta
          <span className="sr-only"> — back to top</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-2 text-[14px] transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-[width] duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={`hidden items-center gap-1.5 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors md:inline-flex ${
              active === 'contact'
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-line-strong hover:border-white/35'
            }`}
          >
            Contact <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="meta -mr-2 rounded-full px-3 py-2 text-[12px] text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-bg md:hidden"
      >
        <div className="container-page flex min-h-full flex-col justify-between pt-6 pb-10">
          <ul>
            {[...NAV, { id: 'contact', label: 'Contact' }].map((item, i) => (
              <li key={item.id} className="enter border-b border-line" style={{ animationDelay: `${i * 40}ms` }}>
                <a href={`#${item.id}`} onClick={close} className="flex items-baseline justify-between py-4">
                  <span className="display-md">{item.label}</span>
                  <span className="meta">{String(i + 1).padStart(2, '0')}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-3 text-[15px]">
            <a href={`mailto:${profile.email}`} className="block break-all text-ink">
              {profile.email}
            </a>
            <div className="flex gap-5 text-muted">
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
