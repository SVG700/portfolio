import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks'
import { EASE, itemVariants } from '../motion-shared'
import { registerBackHandler } from '../platform'
import { LogoMark } from './LogoMark'
import { ArrowUpRight } from './icons'

const NAV = [
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
]
const IDS = [...NAV.map((n) => n.id), 'contact']

export function Navbar() {
  const active = useActiveSection(IDS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null)

  // One indicator that slides between links (transform only).
  useLayoutEffect(() => {
    const measure = () => {
      const link = listRef.current?.querySelector<HTMLElement>('a[aria-current="true"]')
      setBar(link ? { x: link.offsetLeft, w: link.offsetWidth } : null)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const unregister = registerBackHandler(() => {
      setOpen(false)
      return true
    })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      unregister()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      style={{ paddingTop: 'var(--safe-top)' }}
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
        <a
          href="#top"
          onClick={close}
          className="group inline-flex items-center gap-3 font-display text-[17px] font-semibold tracking-[-0.02em]"
        >
          <LogoMark className="h-[17px] w-auto transition-transform duration-300 group-hover:scale-105" />
          <span className="transition-colors group-hover:text-accent">Samhith V Gupta</span>
          <span className="sr-only"> — back to top</span>
        </a>

        <ul ref={listRef} className="relative hidden items-center gap-7 md:flex">
          {NAV.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`nav-link relative py-2 text-[14px] transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1.5 left-0 h-px w-[100px] origin-left bg-accent transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]"
            style={{
              transform: `translateX(${bar?.x ?? 0}px) scaleX(${(bar?.w ?? 0) / 100})`,
              opacity: bar ? 1 : 0,
            }}
          />
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

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ top: 'calc(4rem + var(--safe-top))' }}
            className="fixed inset-x-0 bottom-0 overflow-y-auto bg-bg md:hidden"
          >
            <div
              className="container-page flex min-h-full flex-col justify-between pt-6"
              style={{ paddingBottom: 'calc(2.5rem + var(--safe-bottom))' }}
            >
              <m.ul initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}>
                {[...NAV, { id: 'contact', label: 'Contact' }].map((item, i) => (
                  <m.li key={item.id} variants={itemVariants} className="border-b border-line">
                    <a href={`#${item.id}`} onClick={close} className="flex items-baseline justify-between py-4">
                      <span className="display-md">{item.label}</span>
                      <span className="meta">{String(i + 1).padStart(2, '0')}</span>
                    </a>
                  </m.li>
                ))}
              </m.ul>
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
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
