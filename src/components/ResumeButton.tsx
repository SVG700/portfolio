import { profile } from '../data/profile'
import { useResumeAvailable } from '../hooks'
import { isNativeApp } from '../platform'
import { FileText } from './icons'

type Props = { label?: string; className?: string; download?: boolean }

/**
 * Links to public/resume.pdf. Renders nothing until a real PDF is served
 * there, so the page never shows a dead or "coming soon" control.
 */
export function ResumeButton({ label = 'Resume', className = 'btn-ghost', download = false }: Props) {
  const available = useResumeAvailable(profile.resumePath)
  // Android's WebView can't display PDFs, so the bundled file would open as a
  // blank screen. Website only until there's a live URL to hand to the browser.
  if (!available || isNativeApp) return null

  return (
    <a
      href={profile.resumePath}
      className={className}
      {...(download ? { download: 'Samhith-V-Gupta-Resume.pdf' } : { target: '_blank', rel: 'noopener' })}
    >
      <FileText className="size-4" aria-hidden="true" />
      {label}
      <span className="sr-only">{download ? ' (PDF)' : ' (PDF, opens in a new tab)'}</span>
    </a>
  )
}
