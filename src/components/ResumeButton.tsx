import { FileText } from 'lucide-react'
import { profile } from '../data/profile'
import { useResumeAvailable } from '../hooks'

type Props = { label?: string; className?: string; download?: boolean }

/**
 * Links to public/resume.pdf once the file exists. Until then it renders a
 * disabled control so nobody clicks into a 404.
 */
export function ResumeButton({ label = 'View Resume', className = 'btn-ghost', download = false }: Props) {
  const available = useResumeAvailable(profile.resumePath)

  if (!available) {
    return (
      <span
        className={`${className} cursor-not-allowed opacity-50`}
        aria-disabled="true"
        title="Resume will be available soon"
      >
        <FileText className="size-4" aria-hidden="true" />
        Resume coming soon
      </span>
    )
  }

  return (
    <a
      href={profile.resumePath}
      className={className}
      {...(download ? { download: 'Samhith-V-Gupta-Resume.pdf' } : { target: '_blank', rel: 'noopener' })}
    >
      <FileText className="size-4" aria-hidden="true" />
      {label}
      <span className="sr-only">{download ? '(PDF)' : '(PDF, opens in a new tab)'}</span>
    </a>
  )
}
