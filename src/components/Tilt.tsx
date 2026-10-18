import { m, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePointerFx } from '../motion-shared'

const SPRING = { stiffness: 220, damping: 22, mass: 0.5 }

/**
 * Leans its content toward the cursor in 3D (max `max` degrees) and exposes
 * the pointer position as --mx / --my for the .spotlight / .sheen layers.
 * Desktop pointers only; on touch, in the Android app and with reduced
 * motion it renders a plain element.
 */
export function Tilt({
  children,
  className = '',
  max = 7,
  as = 'div',
  ...rest
}: {
  children: ReactNode
  className?: string
  max?: number
  as?: 'div' | 'article'
  'aria-labelledby'?: string
}) {
  const enabled = usePointerFx()
  const rx = useSpring(useMotionValue(0), SPRING)
  const ry = useSpring(useMotionValue(0), SPRING)
  const Tag = as === 'article' ? m.article : m.div

  if (!enabled) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      className={className}
      {...rest}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      onPointerMove={(e) => {
        const el = e.currentTarget
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        ry.set(px * max * 2)
        rx.set(-py * max * 2)
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
      onPointerLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
    >
      {children}
    </Tag>
  )
}

/** A child layer that sits slightly in front of the tilting surface. */
export function Depth({ z = 24, children }: { z?: number; children: ReactNode }) {
  return <div style={{ transform: `translateZ(${z}px)` }}>{children}</div>
}
