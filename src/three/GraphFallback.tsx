import { EDGES, NODES, rotate } from './graph'

// Static picture of the hero network: the placeholder while WebGL loads, and
// the permanent version for reduced motion, no WebGL, and the Android app.
const AX = -0.35
const AY = 0.6
const P = NODES.map((n) => rotate(n, AX, AY))

export function GraphFallback({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-1.25 -1.25 2.5 2.5" className={className} aria-hidden="true">
      {EDGES.map(([a, b]) => {
        const depth = (P[a][2] + P[b][2]) / 2 // -1 (back) … 1 (front)
        return (
          <line
            key={`${a}-${b}`}
            x1={P[a][0]}
            y1={-P[a][1]}
            x2={P[b][0]}
            y2={-P[b][1]}
            stroke="#d4f36a"
            strokeOpacity={0.08 + (depth + 1) * 0.09}
            strokeWidth={0.006}
          />
        )
      })}
      {P.map(([x, y, z], i) => (
        <circle key={i} cx={x} cy={-y} r={0.012 + (z + 1) * 0.008} fill="#d4f36a" fillOpacity={0.35 + (z + 1) * 0.3} />
      ))}
    </svg>
  )
}
