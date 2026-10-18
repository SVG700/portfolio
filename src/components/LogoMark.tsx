import { m, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { G_PATH, S_PATH, SG_VIEWBOX, SQUARE } from './logoPaths'

const KEY = 'sg-intro-played'

/** True only for the first page view of a browser session. */
function firstViewThisSession() {
  try {
    if (sessionStorage.getItem(KEY)) return false
    sessionStorage.setItem(KEY, '1')
    return true
  } catch {
    return false
  }
}

/**
 * The "SG" monogram (same outlines as the Android splash). On the first view
 * of a session the letters draw their outline, fill in, and the lime square
 * pops — about a second, never blocking the page. Later views, reduced
 * motion and print show it static.
 */
export function LogoMark({ className = 'h-[18px] w-auto' }: { className?: string }) {
  const reduce = useReducedMotion()
  const [intro] = useState(() => !reduce && firstViewThisSession())
  const letters = [S_PATH, G_PATH]

  return (
    <svg viewBox={SG_VIEWBOX} className={`overflow-visible ${className}`} aria-hidden="true">
      {letters.map((d, i) => (
        <m.path
          key={i}
          d={d}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={14}
          initial={intro ? { pathLength: 0, fillOpacity: 0 } : false}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: 0.7, ease: 'easeInOut', delay: i * 0.12 },
            fillOpacity: { duration: 0.35, delay: 0.55 + i * 0.12 },
          }}
        />
      ))}
      <m.rect
        x={SQUARE.x}
        y={SQUARE.y}
        width={SQUARE.size}
        height={SQUARE.size}
        fill="#d4f36a"
        initial={intro ? { scale: 0, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.85 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </svg>
  )
}
