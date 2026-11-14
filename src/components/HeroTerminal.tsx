import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { useOpenProject } from '../drawer'
import { LITE } from '../motion-shared'
import { isNativeApp } from '../platform'

/**
 * The hero's identity card, drawn as a quiet terminal window.
 *
 * The photo is shown in full natural colour. The terminal feel comes from
 * small details only: on load "whoami" is typed, a "loading samhith.jpg"
 * line ticks over, and the photo fades in (about 1.5 s; "Skip" jumps to the
 * end). Hovering or tapping the photo flashes an ASCII version for a second,
 * then it returns to colour. With reduced motion, and in the Android app,
 * the finished state is shown straight away and there is no ASCII flash.
 * A few commands work at the prompt.
 */

const COLS = 44
const ROWS = 33 // 4:5 photo, with characters 0.6 em wide and 1 em tall
const RAMP = ' .·:-=+*#%@' // sparse → dense
const TYPED = 'whoami'
const FILE = 'samhith.jpg'
const COMMANDS = ['help', 'projects', 'resume', 'contact'] as const

// 4:5 portrait on a dark backdrop, at 320 and 640 px wide (the box is at most
// 176 CSS px, so 640 covers 3× screens). Source: assets/photo/.
const srcSet = (ext: string) => `/photo/samhith-dark-320.${ext} 320w, /photo/samhith-dark-640.${ext} 640w`
const SIZES = '(min-width: 1024px) 176px, (min-width: 640px) 150px, 96px'

/**
 * Samples the loaded photo into a character grid: light areas (the face) get
 * dense glyphs, and the dark backdrop, hair and shirt stay empty. Returns
 * null if the image can't be read.
 */
function toAscii(img: HTMLImageElement): string | null {
  try {
    const c = document.createElement('canvas')
    c.width = COLS
    c.height = ROWS
    const ctx = c.getContext('2d', { willReadFrequently: true })
    if (!ctx) return null
    ctx.drawImage(img, 0, 0, COLS, ROWS)
    const { data } = ctx.getImageData(0, 0, COLS, ROWS)
    const lum: number[] = []
    for (let i = 0; i < data.length; i += 4) lum.push((0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255)
    const hi = Math.max(...lum)
    const floor = 0.16 // below this is backdrop, hair or shirt
    let out = ''
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const v = lum[y * COLS + x]
        if (v < floor) out += ' '
        else {
          const light = Math.pow((v - floor) / Math.max(0.001, hi - floor), 0.85)
          out += RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(light * (RAMP.length - 1)))]
        }
      }
      out += '\n'
    }
    return out
  } catch {
    return null
  }
}

type Phase = 'typing' | 'loading' | 'photo'

const [ROLE, SINCE] = profile.currentRole.split(' · ')
const INFO: [string, string][] = [
  ['name', profile.name],
  ['role', ROLE],
  ['since', SINCE ?? ''],
  ['study', profile.degree],
  ['at', profile.university],
].filter(([, v]) => v) as [string, string][]

export function HeroTerminal({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const instant = !!reduce || LITE
  const open = useOpenProject()
  const [ascii, setAscii] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>(instant ? 'photo' : 'typing')
  const [typed, setTyped] = useState(instant ? TYPED.length : 0)
  const [done, setDone] = useState(instant)
  const [flipped, setFlipped] = useState(false)
  const [run, setRun] = useState(0)
  const [entry, setEntry] = useState<{ cmd: string; out: ReactNode } | null>(null)
  const [value, setValue] = useState('')
  const timers = useRef<number[]>([])
  const flipTimer = useRef(0)
  const photo = useRef<HTMLImageElement>(null)

  // Build the ASCII grid from the photo once it has loaded (it may already
  // be complete, from cache, before React attaches the load handler).
  const readAscii = useCallback(() => {
    const img = photo.current
    if (img?.complete && img.naturalWidth) setAscii((prev) => prev ?? toAscii(img))
  }, [])
  useEffect(readAscii, [readAscii])

  const finish = useCallback(() => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    setTyped(TYPED.length)
    setPhase('photo')
    setDone(true)
  }, [])

  // The one orchestrated sequence: type → "loading …" → the photo fades in.
  useEffect(() => {
    if (instant) return
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms))
    setPhase('typing')
    setTyped(0)
    setDone(false)
    setFlipped(false)
    for (let i = 1; i <= TYPED.length; i++) at(80 + i * 45, () => setTyped(i))
    at(400, () => setPhase('loading'))
    at(800, () => setPhase('photo'))
    at(1050, () => setDone(true))
    return () => {
      timers.current.forEach(window.clearTimeout)
      timers.current = []
    }
  }, [instant, run])

  // Hover or tap: the photo drops to ASCII for a second, then returns to colour.
  const flip = useCallback(() => {
    window.clearTimeout(flipTimer.current)
    setFlipped(true)
    flipTimer.current = window.setTimeout(() => setFlipped(false), 1000)
  }, [])
  useEffect(() => () => window.clearTimeout(flipTimer.current), [])

  const exec = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setValue('')
    if (cmd === 'clear') return setEntry(null)
    if (cmd === 'whoami') {
      setEntry(null)
      return instant ? undefined : setRun((n) => n + 1)
    }
    const link = 'link-underline text-ink'
    let out: ReactNode
    if (cmd === 'help') {
      out = <>Commands: {[...COMMANDS, 'whoami', 'clear'].join(', ')}</>
    } else if (cmd === 'projects') {
      out = (
        <ul className="space-y-1">
          {projects.slice(0, 4).map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => open(p.id)} className={`${link} text-left`}>
                {p.shortName ?? p.name}
              </button>
              <span className="text-dim"> {p.status.toLowerCase()}</span>
            </li>
          ))}
          <li>
            <a href="#work" className={link}>
              See all {projects.length} projects
            </a>
          </li>
        </ul>
      )
    } else if (cmd === 'resume') {
      out = isNativeApp ? (
        <>The resume opens on the website, not inside the app.</>
      ) : (
        <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" className={link}>
          Open resume (PDF, new tab)
        </a>
      )
    } else if (cmd === 'contact') {
      out = (
        <ul className="space-y-1">
          <li>
            <a href={`mailto:${profile.email}`} className={`${link} [overflow-wrap:anywhere]`}>
              {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
              LinkedIn
            </a>
            <span className="text-dim">, </span>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={link}>
              GitHub
            </a>
          </li>
        </ul>
      )
    } else {
      out = <>No command “{cmd.slice(0, 24)}”. Try help.</>
    }
    setEntry({ cmd, out })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    exec(value)
  }

  const showAscii = !!ascii && done && flipped
  const showPhoto = phase === 'photo' && !showAscii
  const canFlip = done && !!ascii && !instant

  return (
    <div
      data-terminal
      className={`terminal overflow-hidden rounded-xl border border-line-strong font-mono text-[12.5px] leading-relaxed text-muted ${className}`}
    >
      <div className="flex h-8 items-center justify-between border-b border-line px-3 sm:h-9 sm:px-3.5">
        <p className="flex items-center gap-2 text-[11.5px] text-dim">
          <span className="size-2 bg-accent" aria-hidden="true" />
          samhith@portfolio
        </p>
        {!done && (
          <button type="button" onClick={finish} className="rounded px-1.5 py-0.5 text-[11.5px] text-muted hover:text-ink">
            Skip<span className="sr-only"> intro animation</span>
          </button>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <div aria-hidden="true">
          <p>
            <span className="text-accent">$</span> <span className="text-ink">{TYPED.slice(0, typed)}</span>
            {!done && phase === 'typing' && <span className="term-caret" />}
          </p>
          <p className="term-line text-dim" style={{ opacity: phase === 'typing' ? 0 : 1 }}>
            loading {FILE} <span className={phase === 'loading' ? 'term-dots' : ''}>...</span>{' '}
            <span className="term-line text-accent" style={{ opacity: phase === 'photo' ? 1 : 0 }}>
              ✓
            </span>
          </p>
        </div>

        <div className="mt-2.5 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 sm:mt-3 sm:gap-4">
          {/* Photo in natural colour. Hover or tap flashes an ASCII version for a second. */}
          <button
            type="button"
            aria-label="Photo of Samhith V Gupta. Show an ASCII version for a moment"
            disabled={!canFlip}
            onClick={flip}
            onPointerEnter={(e) => e.pointerType === 'mouse' && canFlip && flip()}
            className="term-photo relative block aspect-[4/5] w-[96px] overflow-hidden rounded-md border border-accent/45 sm:w-[150px] lg:w-[176px]"
          >
            <picture>
              <source type="image/avif" srcSet={srcSet('avif')} sizes={SIZES} />
              <source type="image/webp" srcSet={srcSet('webp')} sizes={SIZES} />
              {/* Above the fold, so it is loaded eagerly rather than lazily. */}
              <img
                src="/photo/samhith-dark-320.jpg"
                srcSet={srcSet('jpg')}
                sizes={SIZES}
                width={320}
                height={400}
                alt=""
                decoding="async"
                fetchPriority="high"
                ref={photo}
                onLoad={readAscii}
                className="term-img absolute inset-0 size-full object-cover"
                style={{ opacity: showPhoto ? 1 : 0 }}
              />
            </picture>
            <pre aria-hidden="true" className="term-ascii" style={{ opacity: showAscii ? 1 : 0 }}>
              {ascii}
            </pre>
            <span aria-hidden="true" className="term-scan" />
          </button>

          <dl className="min-w-0 space-y-1 text-[11.5px] leading-snug sm:space-y-1.5 sm:text-[12.5px] sm:leading-relaxed">
            {INFO.map(([k, v], i) => (
              <div
                key={k}
                className="term-line grid grid-cols-[2.6rem_minmax(0,1fr)] gap-x-2 sm:grid-cols-[3.1rem_minmax(0,1fr)]"
                style={{ opacity: phase === 'typing' ? 0 : 1, transitionDelay: instant || done ? '0ms' : `${i * 50}ms` }}
              >
                <dt className="text-ion">{k}</dt>
                <dd className="text-ink/90">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Prompt: a few commands, typed or tapped. */}
        <div className="term-line mt-3 border-t border-line pt-2.5 sm:mt-4 sm:pt-3" style={{ opacity: done ? 1 : 0 }}>
          <div aria-live="polite">
            {entry && (
              <div className="mb-3">
                <p>
                  <span className="text-accent">$</span> <span className="text-ink">{entry.cmd}</span>
                </p>
                <div className="mt-1">{entry.out}</div>
              </div>
            )}
          </div>
          {/* Phones use the buttons below; the typed prompt appears from tablet width up. */}
          <form onSubmit={onSubmit} className="hidden items-center gap-2 sm:flex">
            <label htmlFor="term-input" className="text-accent">
              $<span className="sr-only"> Type a command: help, projects, resume or contact</span>
            </label>
            <input
              id="term-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!done}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              maxLength={32}
              placeholder="help"
              className="min-w-0 flex-1 bg-transparent text-[16px] text-ink caret-accent placeholder:text-dim/70 sm:text-[12.5px]"
            />
          </form>
          <ul className="flex flex-wrap gap-1.5 sm:mt-2.5">
            {COMMANDS.map((c) => (
              <li key={c}>
                <button type="button" disabled={!done} onClick={() => exec(c)} className="chip hover:border-accent/40 hover:text-ink">
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
