import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts are bundled (not loaded from Google) so the Android app works offline.
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './index.css'
import App from './App.tsx'
import { isNativeApp } from './platform'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if (isNativeApp) {
  import('./native').then((m) => m.initNative())
}
