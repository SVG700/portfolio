// Geometry for the hero node-graph sphere. Shared by the WebGL scene and the
// static SVG fallback, so both show the same network.

export type Vec3 = [number, number, number]

/** Deterministic PRNG so the layout is identical on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Points spread evenly over a sphere (Fibonacci lattice), lightly jittered. */
export function makeNodes(count: number, radius = 1, seed = 7): Vec3[] {
  const rand = mulberry32(seed)
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const jitter = 1 + (rand() - 0.5) * 0.12
    return [Math.cos(theta) * r * radius * jitter, y * radius * jitter, Math.sin(theta) * r * radius * jitter]
  })
}

/** Connect each node to its k nearest neighbours (deduplicated). */
export function makeEdges(nodes: Vec3[], k = 3): [number, number][] {
  const seen = new Set<string>()
  const edges: [number, number][] = []
  nodes.forEach((a, i) => {
    const near = nodes
      .map((b, j) => ({ j, d: (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2 }))
      .filter((n) => n.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, k)
    for (const { j } of near) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([Math.min(i, j), Math.max(i, j)])
      }
    }
  })
  return edges
}

export const NODE_COUNT = 72
export const NODES = makeNodes(NODE_COUNT)
export const EDGES = makeEdges(NODES)

/** Rotate a point by the fixed angle the fallback image is drawn at. */
export function rotate([x, y, z]: Vec3, ax: number, ay: number): Vec3 {
  const cy = Math.cos(ay), sy = Math.sin(ay)
  const x1 = x * cy + z * sy
  const z1 = -x * sy + z * cy
  const cx = Math.cos(ax), sx = Math.sin(ax)
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx]
}
