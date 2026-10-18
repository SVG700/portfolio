// Android-only behaviour. Imported lazily from main.tsx so the website
// bundle never loads these plugins.
import { App } from '@capacitor/app'
import { AppLauncher } from '@capacitor/app-launcher'
import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar, Style } from '@capacitor/status-bar'
import { runBackHandlers } from './platform'

const THEME_BG = '#0b0b0c'

export async function initNative() {
  document.documentElement.classList.add('native-app')

  // Status bar matches the page. On Android 15+ the app is edge-to-edge and
  // the colour comes from the page itself; safe-area padding is in index.css.
  try {
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.setBackgroundColor({ color: THEME_BG })
  } catch {
    // Not supported on every Android version — the CSS handles the rest.
  }

  // Back: close an open overlay, else scroll to top, else leave the app.
  App.addListener('backButton', () => {
    if (runBackHandlers()) return
    if (window.scrollY > 40) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    App.exitApp()
  })

  // Anything that isn't part of the bundled site — GitHub, LinkedIn, live
  // demos, mailto: — is handed to the system (browser or mail app).
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const url = new URL(a.href, window.location.href)
      const external = url.protocol === 'mailto:' || url.protocol === 'tel:' || url.origin !== window.location.origin
      if (!external) return
      e.preventDefault()
      AppLauncher.openUrl({ url: url.href }).catch(() => {
        window.location.href = url.href
      })
    },
    true,
  )

  await SplashScreen.hide({ fadeOutDuration: 250 })
}
