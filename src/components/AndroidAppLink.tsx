import { ArrowUpRight, Smartphone } from 'lucide-react'
import { profile } from '../data/profile'
import { isNativeApp } from '../platform'

/** "Get the Android app" — website only; never shown inside the app itself. */
export function AndroidAppLink() {
  if (isNativeApp) return null
  const url = profile.androidAppUrl

  return (
    <div className="flex flex-col gap-2">
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost self-start">
          <Smartphone className="size-4" aria-hidden="true" />
          Get the Android app
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
          <span className="sr-only"> (GitHub release, opens in a new tab)</span>
        </a>
      ) : (
        <span className="btn-ghost cursor-not-allowed self-start opacity-50" aria-disabled="true">
          <Smartphone className="size-4" aria-hidden="true" />
          Android app — coming soon
        </span>
      )}
      <p className="meta">Android only · install from APK</p>
    </div>
  )
}
