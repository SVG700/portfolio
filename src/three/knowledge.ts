// The hero's knowledge graph, built from the real site content: every project
// is a node, linked to the skills in its stack and to the awards it won.
// Shared by the WebGL scene and the static SVG fallback, so both show the
// same graph. Layout is deterministic — identical on every load.
import { achievements } from '../data/achievements'
import { projects } from '../data/projects'
import { EDGES, makeNodes, NODES, type Vec3 } from './graph'

export type KKind = 'project' | 'skill' | 'award'
export type KNode = { kind: KKind; label: string; pos: Vec3; projectId?: string }

/** "Next.js 16" and "Next.js" are the same skill. */
const skillName = (s: string) => s.replace(/\s+\d+(\.\d+)?$/, '')

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return ((h >>> 0) % 10000) / 10000
}
const scale = (v: Vec3, k: number): Vec3 => [v[0] * k, v[1] * k, v[2] * k]
const norm = (v: Vec3): Vec3 => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}

function build() {
  const nodes: KNode[] = []
  const edges: [number, number][] = []

  // Projects sit on the surface of a sphere.
  const shell = makeNodes(projects.length, 1, 11)
  const projectIndex = new Map<string, number>()
  projects.forEach((p, i) => {
    projectIndex.set(p.id, nodes.length)
    // long names are cut to their first word so labels stay readable in the graph
    const label = p.shortName ?? (p.name.length > 18 ? p.name.split(' ')[0] : p.name)
    nodes.push({ kind: 'project', label, pos: shell[i], projectId: p.id })
  })

  // Skills sit inside it, pulled toward the projects that use them.
  const users = new Map<string, number[]>()
  for (const p of projects) {
    for (const s of p.stack) {
      const name = skillName(s)
      users.set(name, [...(users.get(name) ?? []), projectIndex.get(p.id)!])
    }
  }
  for (const [name, list] of users) {
    const sum: Vec3 = [0, 0, 0]
    for (const i of list) {
      sum[0] += nodes[i].pos[0]
      sum[1] += nodes[i].pos[1]
      sum[2] += nodes[i].pos[2]
    }
    const a = hash(name) * Math.PI * 2
    const b = hash(name + '.') * Math.PI * 2
    const jitter: Vec3 = [Math.cos(a) * 0.16, Math.sin(b) * 0.16, Math.sin(a) * 0.16]
    const dir = norm(sum)
    const r = list.length > 1 ? 0.5 : 0.74
    const index = nodes.length
    nodes.push({ kind: 'skill', label: name, pos: [dir[0] * r + jitter[0], dir[1] * r + jitter[1], dir[2] * r + jitter[2]] })
    for (const i of list) edges.push([index, i])
  }

  // Awards orbit just outside the project they were won with.
  const perProject = new Map<number, number>()
  for (const a of achievements) {
    const pi = a.project ? projectIndex.get(a.project) : undefined
    if (pi === undefined) continue
    const n = perProject.get(pi) ?? 0
    perProject.set(pi, n + 1)
    const base = nodes[pi].pos
    const t = hash(a.title) * Math.PI * 2 + n * 2.1
    const off: Vec3 = [Math.cos(t) * 0.2, Math.sin(t) * 0.2, Math.cos(t * 1.7) * 0.2]
    const out = scale(base, 1.36)
    const index = nodes.length
    nodes.push({ kind: 'award', label: `${a.figure} · ${a.title}`, pos: [out[0] + off[0], out[1] + off[1], out[2] + off[2]], projectId: a.project })
    edges.push([index, pi])
  }

  // Neighbours of each node, for hover highlighting.
  const neighbours: number[][] = nodes.map(() => [])
  edges.forEach(([a, b]) => {
    neighbours[a].push(b)
    neighbours[b].push(a)
  })
  return { nodes, edges, neighbours }
}

export const { nodes: K_NODES, edges: K_EDGES, neighbours: K_NEIGHBOURS } = build()

/** Faint outer lattice that gives the graph its spherical silhouette. */
export const K_SHELL_R = 1.78
export const K_SHELL_NODES = NODES.map((n): Vec3 => [n[0] * K_SHELL_R, n[1] * K_SHELL_R, n[2] * K_SHELL_R])
export const K_SHELL_EDGES = EDGES

/** Faint outer dust for depth — not part of the graph. */
export const K_DUST = makeNodes(150, 2.05, 3)

export const KIND_COLOR: Record<KKind, string> = {
  project: '#c8f560',
  skill: '#7c8cff',
  award: '#eef1f6',
}
export const KIND_SIZE: Record<KKind, number> = { project: 34, skill: 15, award: 21 }
