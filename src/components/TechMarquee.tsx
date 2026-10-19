import { useEffect, useRef, useState } from 'react'
import { skillGroups } from '../data/skills'
import { useMotionAllowed } from '../motion-shared'
import { isNativeApp } from '../platform'

const SKILLS = [...new Set(skillGroups.flatMap((g) => g.skills.map((s) => s.name)))]

/**
 * Slow, infinite strip of the skills from skills.ts (the resume list) between
 * Projects and Skills. Decorative — the real list is in the Skills section —
 * so it is hidden from screen readers. Pauses on hover and when off-screen;
 * not rendered with reduced motion or in the Android app.
 */
export function TechMarquee() {
  const allowed = useMotionAllowed()
  const ref = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [allowed])

  if (!allowed || isNativeApp) return null

  const row = (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {SKILLS.map((s) => (
        <li key={s} className="flex items-center gap-8 whitespace-nowrap">
          <span>{s}</span>
          <span className="size-1.5 bg-accent/70" />
        </li>
      ))}
    </ul>
  )
  return (
    <div ref={ref} className="marquee border-y border-line bg-bg py-5" aria-hidden="true">
      <div
        className="marquee-track flex w-max font-display text-[1.35rem] font-medium tracking-[-0.02em] text-muted md:text-[1.6rem]"
        style={{ animationPlayState: onScreen ? undefined : 'paused' }}
      >
        {row}
        {row}
      </div>
    </div>
  )
}
