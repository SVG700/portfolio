import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { projects } from '../data/projects'
import { registerBackHandler } from '../platform'
import { GitHubIcon } from './icons'
import { ProjectVisual, Stack, Status } from './projectBits'

type Props = { projectId: string | null; onClose: () => void }

/**
 * Project overview as a side panel (bottom sheet on phones). Uses <dialog>
 * for focus trapping and Escape handling; the close is animated by holding
 * the dialog open briefly with an `is-closing` class.
 */
export function ProjectDrawer({ projectId, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [closing, setClosing] = useState(false)
  const project = projects.find((p) => p.id === projectId) ?? null
  const index = project ? projects.indexOf(project) + 1 : 0

  useEffect(() => {
    const dlg = ref.current
    if (dlg && project && !dlg.open) {
      dlg.showModal()
      dlg.querySelector<HTMLElement>('.drawer-scroll')?.scrollTo({ top: 0 })
    }
  }, [project])

  const requestClose = useCallback(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      ref.current?.close()
      return
    }
    setClosing(true)
    window.setTimeout(() => {
      setClosing(false)
      ref.current?.close()
    }, 180)
  }, [])

  // Android back button closes the drawer before anything else.
  useEffect(() => {
    if (!project) return
    return registerBackHandler(() => {
      requestClose()
      return true
    })
  }, [project, requestClose])

  return (
    <dialog
      ref={ref}
      className={`drawer ${closing ? 'is-closing' : ''}`}
      aria-labelledby="drawer-title"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault()
        requestClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.backdrop) requestClose()
      }}
    >
      <div data-backdrop="true" className="flex h-full w-full items-end justify-end md:items-stretch">
        {project && (
          <div
            style={{ paddingTop: 'var(--safe-top)' }}
            className="drawer-panel flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-surface md:max-h-none md:w-[min(680px,100vw)] md:rounded-none md:border-y-0 md:border-r-0">
            <header className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 md:px-10">
              <p className="meta">
                Project {String(index).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </p>
              <button
                type="button"
                onClick={requestClose}
                className="-mr-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] text-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                Close <X className="size-4" aria-hidden="true" />
              </button>
            </header>

            <div className="drawer-scroll flex-1 overflow-y-auto overscroll-contain">
              <div className="px-6 pt-8 pb-10 md:px-10 md:pt-10">
                <Status status={project.status} />
                <h2 id="drawer-title" className="display-md mt-4 text-balance">
                  {project.name}
                </h2>
                <p className="mt-2 text-[14px] text-dim">{project.category}</p>
                <p className="mt-6 text-[1.1rem] leading-snug text-ink text-pretty">{project.problem}</p>

                {project.visual && (
                  <div className="mt-8 hidden md:block">
                    <ProjectVisual project={project} eager />
                  </div>
                )}

                <dl className="mt-10 divide-y divide-line border-y border-line">
                  <Row label="What it does">{project.summary}</Row>
                  {project.role && <Row label="My role">{project.role}</Row>}
                  {project.context && <Row label="Context">{project.context}</Row>}
                  <Row label="Features">
                    <ul className="space-y-1.5">
                      {project.features.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <span className="mt-[9px] h-px w-2.5 shrink-0 bg-accent" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Row>
                  <Row label="Stack">
                    <Stack items={project.stack} />
                  </Row>
                  {project.notes && (
                    <Row label="Scope notes">
                      <ul className="space-y-2">
                        {project.notes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    </Row>
                  )}
                </dl>
              </div>
            </div>

            <footer
              className="flex flex-wrap items-center gap-3 border-t border-line bg-bg-alt px-6 pt-4 md:px-10"
              style={{ paddingBottom: 'calc(1rem + var(--safe-bottom))' }}
            >
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary py-2.5">
                  Live demo <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost py-2.5">
                  <GitHubIcon /> {project.links.repoLabel ?? 'View code'}<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {!project.links.demo && !project.links.repo && (
                <p className="meta">No public repository or demo yet.</p>
              )}
            </footer>
          </div>
        )}
      </div>
    </dialog>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 py-5 text-[14.5px] leading-relaxed text-muted sm:grid-cols-[8.5rem_1fr] sm:gap-6">
      <dt className="meta pt-0.5">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
