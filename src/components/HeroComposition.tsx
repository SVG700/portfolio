import { m, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'
import { projects } from '../data/projects'
import { EASE, usePointerFx } from '../motion-shared'
import { HeroBackdrop } from '../three/HeroBackdrop'
import { Portrait } from './Portrait'
import { Frame } from './WorkCollage'

/**
 * Desktop hero visual: the portrait in front, two real screenshots of live
 * builds peeking out behind it, and the 3D network behind everything. The
 * portrait is always the top layer, so nothing ever covers the face. Layers
 * drift by depth with the pointer (desktop only); the portrait barely moves.
 */
function Layer({
  px,
  py,
  depth,
  className,
  delay,
  children,
}: {
  px: MotionValue<number>
  py: MotionValue<number>
  depth: number
  className: string
  delay: number
  children: ReactNode
}) {
  const x = useTransform(px, (v) => v * 22 * depth)
  const y = useTransform(py, (v) => v * 16 * depth)
  return (
    <m.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <m.div style={{ x, y }}>{children}</m.div>
    </m.div>
  )
}

const shot = (id: string) => {
  const v = projects.find((p) => p.id === id)?.visual
  return v && v.type === 'screenshot' ? v : null
}

export function HeroComposition() {
  const fx = usePointerFx()
  const spring = { stiffness: 110, damping: 20, mass: 0.6 }
  const px = useSpring(useMotionValue(0), spring)
  const py = useSpring(useMotionValue(0), spring)
  const rotateY = useTransform(px, (v) => v * 3)
  const rotateX = useTransform(py, (v) => v * -3)
  const helio = shot('heliohub')
  const ppv = shot('payperview')

  return (
    <div
      className="relative isolate mx-auto aspect-[10/11] w-full max-w-[480px]"
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
      {/* 3D network (lazy, desktop/tablet only; static image otherwise). */}
      <HeroBackdrop
        media="(min-width: 1024px)"
        className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[135%] -translate-x-1/2 -translate-y-1/2 opacity-75 [mask-image:radial-gradient(closest-side,#000_60%,transparent)]"
      />

      {helio && (
        <Layer px={px} py={py} depth={1.1} className="top-[3%] -right-[10%] w-[60%]" delay={0.55}>
          <div className="rotate-[3deg] opacity-80">
            <Frame src={helio.src} alt={helio.alt} caption={helio.caption} />
          </div>
        </Layer>
      )}
      {ppv && (
        <Layer px={px} py={py} depth={1.4} className="bottom-[6%] -left-[12%] w-[54%]" delay={0.7}>
          <div className="-rotate-[3deg] opacity-80">
            <Frame src={ppv.src} alt={ppv.alt} caption={ppv.caption} />
          </div>
        </Layer>
      )}

      <m.div className="absolute inset-x-[16%] top-[6%] z-10" style={fx ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}>
        <Portrait feature sizes="(min-width: 1280px) 340px, 300px" delay={0.25} />
      </m.div>
    </div>
  )
}
