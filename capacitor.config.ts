import type { CapacitorConfig } from '@capacitor/cli'

// The Android app bundles the built site from dist/, so it works offline and
// doesn't depend on the website being deployed.
const config: CapacitorConfig = {
  appId: 'dev.samhith.portfolio',
  appName: 'Samhith V Gupta',
  webDir: 'dist',
  backgroundColor: '#0b0b0c',
  android: {
    // Only the app's own pages load in the WebView; links elsewhere are sent
    // to the system browser by src/native.ts.
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      // Long enough for the 0.9 s animated SG icon (Android 12+); the app
      // hides it earlier, as soon as the web content is ready (src/native.ts).
      launchShowDuration: 900,
      launchAutoHide: true,
      launchFadeOutDuration: 250,
      backgroundColor: '#0b0b0c',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0b0b0c',
      overlaysWebView: false,
    },
  },
}

export default config
