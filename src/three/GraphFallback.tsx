import { rotate } from './graph'
import { K_EDGES, K_NODES, K_SHELL_EDGES, K_SHELL_NODES, KIND_COLOR } from './knowledge'

// Static picture of the hero knowledge graph: the placeholder while WebGL
// loads, and the permanent version for reduced motion, no WebGL, low-end
// phones and the Android app.
const AX = -0.22
const AY = 0.5
const P = K_NODES.map((n) => rotate(n.pos, AX, AY))
const S = K_SHELL_NODES.map((n) => rotate(n, AX, AY))
const R: Record<string, number> = { project: 0.036, skill: 0.016, award: 0.022 }

export function GraphFallback({ className = '', labels = false }: { className?: string; labels?: boolean }) {
  return (
    <svg viewBox="-2.05 -2.05 4.1 4.1" className={className} aria-hidden="true">
      {K_SHELL_EDGES.map(([a, b]) => (
        <line key={`s${a}-${b}`} x1={S[a][0]} y1={-S[a][1]} x2={S[b][0]} y2={-S[b][1]} stroke="#7c8cff" strokeOpacity={0.12} strokeWidth={0.004} />
      ))}
      {K_EDGES.map(([a, b]) => {
        const depth = (P[a][2] + P[b][2]) / 2
        return (
          <line
            key={`${a}-${b}`}
            x1={P[a][0]}
            y1={-P[a][1]}
            x2={P[b][0]}
            y2={-P[b][1]}
            stroke="#8f9bb5"
            strokeOpacity={0.1 + (depth + 1.4) * 0.08}
            strokeWidth={0.005}
          />
        )
      })}
      {P.map(([x, y, z], i) => {
        const n = K_NODES[i]
        const front = Math.min(1, Math.max(0, (z + 1.4) / 2.8))
        return (
          <g key={i} opacity={0.4 + front * 0.6}>
            {n.kind === 'project' && <circle cx={x} cy={-y} r={R.project * 2.4} fill={KIND_COLOR.project} fillOpacity={0.12} />}
            <circle cx={x} cy={-y} r={R[n.kind] * (0.8 + front * 0.4)} fill={KIND_COLOR[n.kind]} />
            {labels && n.kind === 'project' && (
              <text className="hidden sm:block" x={x + 0.06} y={-y + 0.022} fontSize="0.07" fill="#a3abb8" fontFamily="Geist Mono Variable, monospace">
                {n.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
