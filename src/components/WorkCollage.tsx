import { projects } from '../data/projects'

type Shot = { id: string; className: string; delay: number }

// Three real captures of deployed projects, layered. Positions are
// percentages of a fixed-ratio box so the composition scales as a unit.
const SHOTS: Shot[] = [
  {
    id: 'heliohub',
    className: 'top-0 right-0 w-[70%] group-hover:-translate-y-2 group-hover:translate-x-2',
    delay: 250,
  },
  {
    id: 'nyayalens',
    className: 'top-[24%] left-0 w-[60%] group-hover:-translate-x-3',
    delay: 380,
  },
  {
    id: 'payperview',
    className: 'right-[5%] bottom-0 w-[52%] group-hover:translate-y-2',
    delay: 510,
  },
]

export function Frame({ src, alt, caption, eager = false }: { src: string; alt: string; caption: string; eager?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-[10px] border border-line-strong bg-surface shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
      <figcaption className="flex items-center gap-2 border-b border-line bg-raised px-3 py-1.5">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        <span className="truncate font-mono text-[10.5px] text-muted">{caption}</span>
      </figcaption>
      <img
        src={src}
        alt={alt}
        width={1280}
        height={800}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </figure>
  )
}

export function WorkCollage() {
  return (
    <div className="group relative aspect-[5/4] w-full sm:aspect-[16/11]">
      {SHOTS.map((s) => {
        const p = projects.find((x) => x.id === s.id)
        if (!p?.visual || p.visual.type !== 'screenshot') return null
        return (
          <div
            key={s.id}
            className={`enter absolute transition-transform duration-700 ease-[var(--ease-out-expo)] ${s.className}`}
            style={{ animationDelay: `${s.delay}ms` }}
          >
            <Frame src={p.visual.src} alt={p.visual.alt} caption={p.visual.caption} eager />
          </div>
        )
      })}
    </div>
  )
}
