import { ScaledCanvas } from './ScaledCanvas'

// Interface previews for projects without a public build. They show the
// product's real concepts with synthetic values and say so on-screen.

const ACCENT = '#d4f36a'
const AMBER = '#f2b84b'

function SyntheticTag({ children = 'Synthetic data · illustrative interface' }: { children?: string }) {
  return (
    <span className="rounded border border-white/10 bg-black/40 px-2 py-1 font-mono text-[10px] tracking-wide text-[#a8a8a2]">
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* NEXORA — investigation workspace                                    */
/* ------------------------------------------------------------------ */

type NodeT = { id: string; x: number; y: number; kind: 'person' | 'phone' | 'account' | 'place'; label: string }

const N: NodeT[] = [
  { id: 'p7', x: 232, y: 196, kind: 'person', label: 'P-07' },
  { id: 'p12', x: 96, y: 108, kind: 'person', label: 'P-12' },
  { id: 'p3', x: 392, y: 92, kind: 'person', label: 'P-03' },
  { id: 'p19', x: 404, y: 318, kind: 'person', label: 'P-19' },
  { id: 'ph1', x: 154, y: 270, kind: 'phone', label: '+91 ••• 4410' },
  { id: 'ph2', x: 316, y: 148, kind: 'phone', label: '+91 ••• 0872' },
  { id: 'ph3', x: 70, y: 214, kind: 'phone', label: '+91 ••• 1196' },
  { id: 'a1', x: 330, y: 248, kind: 'account', label: 'A/C ••3921' },
  { id: 'a2', x: 196, y: 70, kind: 'account', label: 'A/C ••7705' },
  { id: 'l1', x: 270, y: 346, kind: 'place', label: 'Ward 14' },
  { id: 'l2', x: 446, y: 200, kind: 'place', label: 'Depot Rd' },
]
const E: [string, string, boolean?][] = [
  ['p7', 'ph1', true], ['p7', 'ph2', true], ['ph2', 'p3', true], ['p7', 'a1', true], ['a1', 'p19', true],
  ['p12', 'ph3'], ['p12', 'a2'], ['a2', 'p7'], ['ph3', 'ph1'], ['p19', 'l1'], ['ph1', 'l1'], ['p3', 'l2'], ['a1', 'l2'], ['p12', 'p7'],
]
const byId = Object.fromEntries(N.map((n) => [n.id, n]))

function GraphNode({ n }: { n: NodeT }) {
  const sel = n.id === 'p7'
  const common = { stroke: sel ? ACCENT : 'rgb(255 255 255 / 0.55)', strokeWidth: sel ? 2 : 1.2 }
  return (
    <g>
      {sel && <circle cx={n.x} cy={n.y} r="22" fill="rgb(212 243 106 / 0.12)" />}
      {n.kind === 'person' && <circle cx={n.x} cy={n.y} r={sel ? 11 : 8} fill={sel ? ACCENT : '#26262a'} {...common} />}
      {n.kind === 'phone' && <circle cx={n.x} cy={n.y} r="6" fill="#0f0f11" {...common} />}
      {n.kind === 'account' && <rect x={n.x - 6} y={n.y - 6} width="12" height="12" rx="2" fill="#2a2414" stroke={AMBER} strokeWidth="1.2" />}
      {n.kind === 'place' && <rect x={n.x - 5} y={n.y - 5} width="10" height="10" transform={`rotate(45 ${n.x} ${n.y})`} fill="#0f0f11" stroke="rgb(255 255 255 / 0.4)" />}
      <text x={n.x} y={n.y + (sel ? 28 : 22)} textAnchor="middle" fontSize="10.5" fill={sel ? '#f2f2ee' : '#a8a8a2'} fontFamily="Geist Mono, monospace">
        {n.label}
      </text>
    </g>
  )
}

export function NexoraMock() {
  return (
    <ScaledCanvas width={920} height={540}>
      <div className="flex h-full w-full flex-col bg-[#0e0e10] font-sans text-[12px] text-[#f2f2ee]" aria-hidden="true">
        <div className="flex h-11 items-center gap-4 border-b border-white/[0.08] px-4">
          <span className="font-display text-[14px] font-semibold tracking-tight">NEXORA</span>
          <span className="font-mono text-[11px] text-[#85857f]">Case NX-014</span>
          <div className="ml-4 flex h-7 w-72 items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 text-[11.5px] text-[#85857f]">
            Search people, numbers, accounts…
          </div>
          <div className="ml-auto flex rounded-md border border-white/10 p-0.5 text-[11.5px]">
            {['Graph', 'Timeline', 'Map'].map((t, i) => (
              <span key={t} className={`rounded px-2.5 py-1 ${i === 0 ? 'bg-white/10 text-white' : 'text-[#a8a8a2]'}`}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          <aside className="w-[188px] shrink-0 border-r border-white/[0.08] p-4">
            <p className="font-mono text-[10px] tracking-wider text-[#85857f] uppercase">Entities</p>
            <ul className="mt-3 space-y-2.5">
              {[
                ['Persons', 18, 'bg-[#f2f2ee]'],
                ['Phone numbers', 27, 'border border-white/60'],
                ['Accounts', 11, 'bg-[#f2b84b]'],
                ['Locations', 8, 'border border-white/40 rotate-45 !rounded-none'],
              ].map(([k, v, c]) => (
                <li key={k as string} className="flex items-center gap-2.5">
                  <span className={`size-2 rounded-full ${c}`} />
                  <span className="text-[#d6d6d0]">{k}</span>
                  <span className="ml-auto font-mono text-[11px] text-[#85857f]">{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 font-mono text-[10px] tracking-wider text-[#85857f] uppercase">Sources</p>
            <ul className="mt-3 space-y-2 text-[#d6d6d0]">
              {['FIR records', 'Call-detail records', 'Transactions', 'Intel notes'].map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className={`size-3.5 rounded-[3px] border ${i < 3 ? 'border-[#d4f36a] bg-[#d4f36a]/20' : 'border-white/20'}`} />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-md border border-white/[0.08] bg-white/[0.02] p-3">
              <p className="text-[11px] text-[#a8a8a2]">Entity resolution</p>
              <p className="mt-1 font-display text-[18px] font-semibold">4 merges</p>
              <p className="text-[10.5px] text-[#85857f]">pending analyst review</p>
            </div>
          </aside>

          <div className="dot-grid relative min-w-0 flex-1">
            <svg viewBox="0 0 520 420" className="absolute inset-0 h-full w-full">
              {E.map(([a, b, hot]) => (
                <line
                  key={a + b}
                  x1={byId[a].x}
                  y1={byId[a].y}
                  x2={byId[b].x}
                  y2={byId[b].y}
                  stroke={hot ? ACCENT : 'rgb(255 255 255 / 0.16)'}
                  strokeOpacity={hot ? 0.7 : 1}
                  strokeWidth={hot ? 1.4 : 1}
                  className={hot ? 'flow-dash' : undefined}
                />
              ))}
              {N.map((n) => (
                <GraphNode key={n.id} n={n} />
              ))}
            </svg>
            <div className="absolute bottom-3 left-3 flex gap-3 rounded-md border border-white/[0.08] bg-[#0e0e10]/90 px-3 py-2 text-[10.5px] text-[#a8a8a2]">
              <span>2-hop path · P-12 → P-19</span>
              <span className="text-[#d4f36a]">5 links</span>
            </div>
            <div className="absolute right-3 bottom-3">
              <SyntheticTag />
            </div>
          </div>

          <aside className="w-[214px] shrink-0 border-l border-white/[0.08] p-4">
            <p className="font-mono text-[10px] tracking-wider text-[#85857f] uppercase">Selected</p>
            <p className="mt-2 font-display text-[22px] font-semibold tracking-tight">P-07</p>
            <p className="text-[11.5px] text-[#a8a8a2]">Person · resolved from 3 records</p>
            <dl className="mt-4 divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {[
                ['Linked entities', '9'],
                ['Shared numbers', '2'],
                ['First seen', 'FIR-0231'],
                ['Cases', 'NX-014, NX-009'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2">
                  <dt className="text-[#a8a8a2]">{k}</dt>
                  <dd className="font-mono text-[11px]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[11px] text-[#a8a8a2]">Calls per week</p>
            <div className="mt-2 flex h-12 items-end gap-[3px]">
              {[3, 5, 4, 8, 6, 12, 9, 14, 7, 10, 16, 11].map((h, i) => (
                <span key={i} className="flex-1 rounded-[1px]" style={{ height: `${h * 6}%`, background: i === 10 ? ACCENT : 'rgb(255 255 255 / 0.18)' }} />
              ))}
            </div>
            <div className="mt-4 rounded-md border border-white/10 py-2 text-center text-[11.5px]">Open in timeline</div>
          </aside>
        </div>
      </div>
    </ScaledCanvas>
  )
}

/* ------------------------------------------------------------------ */
/* PAIMANA — monitoring & forecasting dashboard                        */
/* ------------------------------------------------------------------ */

const HIST = [18, 21, 25, 27, 28, 33, 36, 38, 41]
const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']

export function PaimanaMock() {
  // Chart geometry (inside a 620×250 svg)
  const x0 = 44, y0 = 214, w = 560, h = 190
  const step = w / 21 // 9 observed + 12 forecast months
  const px = (i: number) => x0 + i * step
  const py = (v: number) => y0 - (v / 100) * h
  const last = HIST.length - 1
  const fc = Array.from({ length: 13 }, (_, k) => HIST[last] + k * 2.6)
  const hi = fc.map((v, k) => v + k * 1.6)
  const lo = fc.map((v, k) => v - k * 1.9)
  const plan = Array.from({ length: 22 }, (_, i) => Math.min(100, 20 + i * 4.2))
  const band =
    hi.map((v, k) => `${px(last + k)},${py(v)}`).join(' ') +
    ' ' +
    lo.map((v, k) => `${px(last + k)},${py(v)}`).reverse().join(' ')

  return (
    <ScaledCanvas width={1080} height={500}>
      <div className="flex h-full w-full flex-col bg-[#0e0e10] font-sans text-[12px] text-[#f2f2ee]" aria-hidden="true">
        <div className="flex h-12 items-center gap-4 border-b border-white/[0.08] px-5">
          <span className="font-display text-[15px] font-semibold tracking-tight">Project Monitor</span>
          <span className="font-mono text-[11px] text-[#85857f]">Central Sector · PAIMANA reports</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[11.5px] text-[#a8a8a2]">Forecast horizon</span>
            <div className="flex rounded-md border border-white/10 p-0.5 font-mono text-[11px]">
              {['1m', '3m', '6m', '12m', '24m'].map((t) => (
                <span key={t} className={`rounded px-2.5 py-1 ${t === '12m' ? 'bg-[#d4f36a] text-[#0b0b0c]' : 'text-[#a8a8a2]'}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 border-b border-white/[0.08]">
          {[
            ['2,100', 'projects in dataset'],
            ['11,011', 'monthly observations'],
            ['Jul ’25 – Mar ’26', 'coverage'],
            ['1–24 months', 'forecast horizon'],
          ].map(([v, k], i) => (
            <div key={k} className={`px-5 py-4 ${i > 0 ? 'border-l border-white/[0.08]' : ''}`}>
              <p className="font-display text-[24px] font-semibold tracking-tight">{v}</p>
              <p className="mt-0.5 text-[11.5px] text-[#a8a8a2]">{k}</p>
            </div>
          ))}
        </div>

        <div className="flex min-h-0 flex-1">
          <div className="relative min-w-0 flex-1 p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-[12.5px]">
                Physical progress <span className="text-[#85857f]">· sample project</span>
              </p>
              <div className="flex gap-4 text-[11px] text-[#a8a8a2]">
                <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-[#f2f2ee]" />Observed</span>
                <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t border-dashed border-[#d4f36a]" />Forecast</span>
                <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t border-dashed border-white/30" />Planned</span>
              </div>
            </div>
            <svg viewBox="0 0 620 250" className="mt-2 h-[260px] w-full">
              {[0, 25, 50, 75, 100].map((v) => (
                <g key={v}>
                  <line x1={x0} x2={x0 + w} y1={py(v)} y2={py(v)} stroke="rgb(255 255 255 / 0.06)" />
                  <text x={x0 - 8} y={py(v) + 3.5} textAnchor="end" fontSize="9.5" fill="#85857f" fontFamily="Geist Mono, monospace">{v}%</text>
                </g>
              ))}
              {MONTHS.map((m, i) => (
                <text key={m} x={px(i)} y={y0 + 18} textAnchor="middle" fontSize="9.5" fill="#85857f" fontFamily="Geist Mono, monospace">{m}</text>
              ))}
              <text x={px(last + 6)} y={y0 + 18} textAnchor="middle" fontSize="9.5" fill="#85857f" fontFamily="Geist Mono, monospace">+6</text>
              <text x={px(last + 12)} y={y0 + 18} textAnchor="middle" fontSize="9.5" fill="#85857f" fontFamily="Geist Mono, monospace">+12</text>
              <polyline points={plan.map((v, i) => `${px(i)},${py(v)}`).join(' ')} fill="none" stroke="rgb(255 255 255 / 0.28)" strokeDasharray="3 4" />
              <polygon points={band} fill="rgb(212 243 106 / 0.12)" />
              <polyline points={fc.map((v, k) => `${px(last + k)},${py(v)}`).join(' ')} fill="none" stroke={ACCENT} strokeWidth="2" strokeDasharray="5 4" />
              <polyline points={HIST.map((v, i) => `${px(i)},${py(v)}`).join(' ')} fill="none" stroke="#f2f2ee" strokeWidth="2" />
              {HIST.map((v, i) => (
                <circle key={i} cx={px(i)} cy={py(v)} r="2.5" fill="#0e0e10" stroke="#f2f2ee" strokeWidth="1.5" />
              ))}
              <line x1={px(last)} x2={px(last)} y1={py(100)} y2={y0} stroke="rgb(255 255 255 / 0.18)" />
              <text x={px(last) + 6} y={py(100) + 10} fontSize="9.5" fill="#a8a8a2" fontFamily="Geist Mono, monospace">today</text>
              <circle cx={px(4)} cy={py(HIST[4])} r="8" fill="none" stroke={AMBER} strokeWidth="1.5" />
              <text x={px(4)} y={py(HIST[4]) + 24} textAnchor="middle" fontSize="9.5" fill={AMBER} fontFamily="Geist Mono, monospace">slowdown</text>
              <text x={px(last + 12) - 4} y={py(hi[12]) - 8} textAnchor="end" fontSize="9.5" fill={ACCENT} fontFamily="Geist Mono, monospace">p10–p90</text>
            </svg>
            <div className="absolute bottom-4 left-5">
              <SyntheticTag>Dataset scope is real · chart values illustrative</SyntheticTag>
            </div>
          </div>

          <aside className="w-[300px] shrink-0 border-l border-white/[0.08] p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-[12.5px]">Delay-risk watchlist</p>
              <p className="font-mono text-[10.5px] text-[#85857f]">by sector</p>
            </div>
            <ul className="mt-4 space-y-3.5">
              {[
                ['Railways', 0.78, 'High'],
                ['Road Transport', 0.64, 'High'],
                ['Water Resources', 0.47, 'Med'],
                ['Power', 0.36, 'Med'],
                ['Petroleum', 0.18, 'Low'],
              ].map(([k, v, t]) => (
                <li key={k as string}>
                  <div className="flex justify-between text-[11.5px]">
                    <span className="text-[#d6d6d0]">{k}</span>
                    <span className="font-mono text-[10.5px]" style={{ color: t === 'High' ? AMBER : '#a8a8a2' }}>{t}</span>
                  </div>
                  <div className="mt-1.5 h-1 rounded-full bg-white/[0.07]">
                    <div className="h-full rounded-full" style={{ width: `${(v as number) * 100}%`, background: t === 'High' ? AMBER : 'rgb(255 255 255 / 0.35)' }} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-md border border-white/[0.08] bg-white/[0.02] p-3 text-[11px] leading-relaxed text-[#a8a8a2]">
              <span className="text-[#f2f2ee]">Method</span> — adaptive run-rate velocity with empirical-Bayes shrinkage toward the sector.
            </div>
          </aside>
        </div>
      </div>
    </ScaledCanvas>
  )
}

/* ------------------------------------------------------------------ */
/* EcoBuddy — weekly footprint view                                    */
/* ------------------------------------------------------------------ */

export function EcoBuddyMock() {
  const r = 46
  const c = 2 * Math.PI * r
  const days = [6.2, 4.8, 7.4, 3.9, 5.1, 2.6, 3.3]
  return (
    <ScaledCanvas width={800} height={500}>
      <div className="flex h-full w-full flex-col bg-[#0e0e10] p-6 font-sans text-[12px] text-[#f2f2ee]" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="font-display text-[16px] font-semibold tracking-tight">EcoBuddy</span>
          <div className="flex rounded-md border border-white/10 p-0.5 text-[11.5px]">
            {['Dashboard', 'Travel', 'Fuel', 'Grid', 'Coach'].map((t, i) => (
              <span key={t} className={`rounded px-2.5 py-1 ${i === 0 ? 'bg-white/10' : 'text-[#a8a8a2]'}`}>{t}</span>
            ))}
          </div>
        </div>
        <div className="mt-5 grid flex-1 grid-cols-[220px_1fr] gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02]">
            <svg viewBox="0 0 120 120" className="w-36">
              <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="10" />
              <circle cx="60" cy="60" r={r} fill="none" stroke={ACCENT} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c * 0.62} ${c}`} transform="rotate(-90 60 60)" />
              <text x="60" y="64" textAnchor="middle" fontSize="26" fontWeight="600" fill="#f2f2ee" fontFamily="Bricolage Grotesque, sans-serif">62</text>
            </svg>
            <p className="mt-2 text-[#a8a8a2]">Eco score this week</p>
          </div>
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
            <div className="flex justify-between">
              <p>Daily emissions</p>
              <p className="font-mono text-[10.5px] text-[#85857f]">kg CO₂e</p>
            </div>
            <div className="mt-4 flex h-[150px] items-end gap-3">
              {days.map((d, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-sm" style={{ height: `${d * 18}px`, background: i === 2 ? AMBER : 'rgb(255 255 255 / 0.2)' }} />
                  <span className="font-mono text-[10px] text-[#85857f]">{'MTWTFSS'[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-[1fr_1.3fr] gap-4">
            <ul className="divide-y divide-white/[0.06] rounded-lg border border-white/[0.08] bg-white/[0.02] px-4">
              {[['Travel', '12.4 km'], ['Fuel', '2.1 L'], ['Grid', '4.8 kWh']].map(([k, v]) => (
                <li key={k} className="flex justify-between py-2.5"><span className="text-[#a8a8a2]">{k}</span><span className="font-mono text-[11px]">{v}</span></li>
              ))}
            </ul>
            <div className="rounded-lg border border-[#d4f36a]/30 bg-[#d4f36a]/[0.06] p-4">
              <p className="font-mono text-[10.5px] text-[#d4f36a]">EcoBuddy Coach · Gemini</p>
              <p className="mt-2 leading-relaxed text-[#d6d6d0]">Wednesday's commute was your largest source. A no-car day this week would cut roughly a fifth of it.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 self-end"><SyntheticTag>Illustrative values · based on the app's features</SyntheticTag></div>
      </div>
    </ScaledCanvas>
  )
}

export function ProjectMock({ kind }: { kind: 'nexora' | 'paimana' | 'ecobuddy' }) {
  if (kind === 'nexora') return <NexoraMock />
  if (kind === 'paimana') return <PaimanaMock />
  return <EcoBuddyMock />
}
