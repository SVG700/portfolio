import { ArrowUpRight, Smartphone } from 'lucide-react'
import { profile } from '../data/profile'
import { isNativeApp } from '../platform'

/**
 * "Get the Android app" — website only, and only once a release URL is set
 * in profile.ts. Never rendered inside the app itself.
 */
export function AndroidAppLink() {
  const url = profile.androidAppUrl
  if (isNativeApp || !url) return null

  return (
    <div className="flex flex-col gap-1.5">
      <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost self-start">
        <Smartphone className="size-4" aria-hidden="true" />
        Get the Android app
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
        <span className="sr-only"> (GitHub release, opens in a new tab)</span>
      </a>
      <p className="meta">Android only · install from APK</p>
    </div>
  )
}
