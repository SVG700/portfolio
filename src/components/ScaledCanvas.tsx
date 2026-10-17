import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Lays a fixed-size composition out at its design width, then scales it to
 * fit the container. Keeps dense interface mock-ups pixel-consistent from
 * phone to desktop instead of reflowing into something unrecognisable.
 */
export function ScaledCanvas({ width, height, children }: { width: number; height: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth / width)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}
