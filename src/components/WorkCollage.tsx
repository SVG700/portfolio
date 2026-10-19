import { m, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'
import { projects } from '../data/projects'
import { ClipReveal } from './ClipReveal'
import { usePointerFx } from '../motion-shared'

type Shot = { id: string; className: string; delay: number; depth: number }

// Three real captures of deployed projects, layered. Positions are
// percentages of a fixed-ratio box so the composition scales as a unit.
const SHOTS: Shot[] = [
  {
    id: 'heliohub',
    className: 'top-0 right-0 w-[70%] group-hover:-translate-y-2 group-hover:translate-x-2',
    delay: 250,
    depth: 0.4,
  },
  {
    id: 'nyayalens',
    className: 'top-[24%] left-0 w-[60%] group-hover:-translate-x-3',
    delay: 380,
    depth: 0.8,
  },
  {
    id: 'payperview',
    className: 'right-[5%] bottom-0 w-[52%] group-hover:translate-y-2',
    delay: 510,
    depth: 1.3,
  },
]

export function Frame({ src, alt, caption, eager = false }: { src: string; alt: string; caption: string; eager?: boolean }) {
  return (
    <ClipReveal>
      <figure className="overflow-hidden rounded-[10px] border border-line-strong bg-surface shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
        <figcaption className="flex items-center gap-2 border-b border-line bg-raised px-3 py-1.5">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span className="truncate font-mono text-[10.5px] text-muted">{caption}</span>
        </figcaption>
        <img
          src={src}
          alt={alt}
          width={1280}
          height={800}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="block aspect-[16/10] w-full object-cover object-top"
        />
      </figure>
    </ClipReveal>
  )
}

/** One layer: drifts with the pointer in proportion to its depth. */
function Layer({ shot, px, py, children }: { shot: Shot; px: MotionValue<number>; py: MotionValue<number>; children: ReactNode }) {
  const x = useTransform(px, (v) => v * 18 * shot.depth)
  const y = useTransform(py, (v) => v * 14 * shot.depth)
  return (
    <div
      className={`enter absolute transition-transform duration-700 ease-[var(--ease-out-expo)] ${shot.className}`}
      style={{ animationDelay: `${shot.delay}ms` }}
    >
      <m.div style={{ x, y }}>
        <div className="float-soft" style={{ animationDelay: `${shot.depth * -2}s` }}>
          {children}
        </div>
      </m.div>
    </div>
  )
}

export function WorkCollage() {
  const fx = usePointerFx()
  const spring = { stiffness: 120, damping: 20, mass: 0.6 }
  const px = useSpring(useMotionValue(0), spring)
  const py = useSpring(useMotionValue(0), spring)
  const rotateY = useTransform(px, (v) => v * 5)
  const rotateX = useTransform(py, (v) => v * -4)

  return (
    <div style={{ perspective: 1200 }}>
      <m.div
        className="group relative aspect-[5/4] w-full sm:aspect-[16/11]"
        style={fx ? { rotateX, rotateY } : undefined}
        onPointerMove={
          fx
            ? (e) => {
                const r = e.currentTarget.getBoundingClientRect()
                px.set((e.clientX - r.left) / r.width - 0.5)
                py.set((e.clientY - r.top) / r.height - 0.5)
              }
            : undefined
        }
        onPointerLeave={
          fx
            ? () => {
                px.set(0)
                py.set(0)
              }
            : undefined
        }
      >
        {SHOTS.map((s) => {
          const p = projects.find((x) => x.id === s.id)
          if (!p?.visual || p.visual.type !== 'screenshot') return null
          return (
            <Layer key={s.id} shot={s} px={px} py={py}>
              <Frame src={p.visual.src} alt={p.visual.alt} caption={p.visual.caption} eager />
            </Layer>
          )
        })}
      </m.div>
    </div>
  )
}
