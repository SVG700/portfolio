import type { Project, ProjectStatus } from '../data/projects'
import { useOpenProject } from '../drawer'
import { ArrowUpRight, GitHubIcon } from './icons'
import { ClipReveal } from './ClipReveal'
import { ProjectMock } from './mocks'
import { Frame } from './WorkCollage'

const STATUS_DOT: Record<ProjectStatus, string> = {
  'Live demo': 'bg-accent',
  'In development': 'bg-amber',
  Prototype: 'bg-ink',
  'Local prototype': 'border border-ink',
}

export function Status({ status }: { status: ProjectStatus }) {
  return (
    <span className="meta inline-flex items-center gap-2 text-muted">
      <span className={`size-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden="true" />
      {status}
    </span>
  )
}

export function Stack({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items
  return (
    <p className="meta text-muted">
      {shown.map((s, i) => (
        <span key={s}>
          {i > 0 && <span className="text-dim/60"> / </span>}
          <span className="whitespace-nowrap">{s}</span>
        </span>
      ))}
      {max && items.length > max && <span className="pl-1.5 text-dim">+{items.length - max}</span>}
    </p>
  )
}

/** The project's visual: a real screenshot in a frame, or a labelled mock-up. */
export function ProjectVisual({ project, eager = false }: { project: Project; eager?: boolean }) {
  const v = project.visual
  if (!v) return null
  if (v.type === 'screenshot') return <Frame src={v.src} alt={v.alt} caption={v.caption} eager={eager} />
  return (
    <ClipReveal>
      <figure className="overflow-hidden rounded-[10px] border border-line-strong shadow-[0_30px_60px_-24px_rgb(0_0_0/0.85)]">
        <figcaption className="flex items-center gap-2 border-b border-line bg-raised px-3 py-1.5">
          <span className="size-1.5 rounded-full border border-muted" aria-hidden="true" />
          <span className="truncate font-mono text-[10.5px] text-muted">
            {project.name} · interface preview, not a live build
          </span>
        </figcaption>
        <ProjectMock kind={v.kind} />
      </figure>
    </ClipReveal>
  )
}

/** Overview button + any real repo/demo links. Missing links simply don't render. */
export function ProjectActions({ project, compact = false }: { project: Project; compact?: boolean }) {
  const open = useOpenProject()
  const { repo, demo } = project.links
  const linkCls =
    'group/link inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-ink [&>svg]:transition-transform [&>svg]:duration-300 hover:[&>svg:last-child]:translate-x-0.5 hover:[&>svg:last-child]:-translate-y-0.5'
  return (
    <div className={`flex flex-wrap items-center ${compact ? 'gap-x-5 gap-y-2' : 'gap-x-6 gap-y-3'}`}>
      <button
        type="button"
        onClick={() => open(project.id)}
        className={compact ? `${linkCls} text-ink` : 'btn-ghost py-2.5'}
      >
        Overview<span className="sr-only"> of {project.name}</span>
        {compact && <ArrowUpRight className="size-3.5" aria-hidden="true" />}
      </button>
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer" className={linkCls}>
          <GitHubIcon className="size-3.5" />
          <span className="link-underline">{project.links.repoLabel ?? 'Code'}</span>
          <span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className={linkCls}>
          <span className="link-underline">Live demo</span>
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          <span className="sr-only"> of {project.name} (opens in a new tab)</span>
        </a>
      )}
      {!repo && !demo && <span className="meta">No public link yet</span>}
    </div>
  )
}
