import { useEffect, useState } from 'react'

/** Returns the id of the section currently nearest the top of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')
  useEffect(() => {
    const onScroll = () => {
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

/**
 * Checks that the resume path serves an actual PDF. Vite's dev server and
 * most SPA hosts answer unknown paths with index.html, so status alone
 * isn't enough — the content type has to be a PDF.
 */
export function useResumeAvailable(path: string) {
  const [available, setAvailable] = useState(false)
  useEffect(() => {
    let cancelled = false
    fetch(path, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') ?? ''
        if (!cancelled) setAvailable(res.ok && type.includes('pdf'))
      })
      .catch(() => {
        if (!cancelled) setAvailable(false)
      })
    return () => {
      cancelled = true
    }
  }, [path])
  return available
}
