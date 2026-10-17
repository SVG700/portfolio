import { Capacitor } from '@capacitor/core'

/** True inside the Android app, false on the website. */
export const isNativeApp = Capacitor.isNativePlatform()

/**
 * Back-button handlers, most recent first. Overlays (project drawer, mobile
 * menu) register one while open; it returns true if it handled the press.
 * On the website nothing calls these.
 */
const backHandlers: Array<() => boolean> = []

export function registerBackHandler(handler: () => boolean) {
  backHandlers.unshift(handler)
  return () => {
    const i = backHandlers.indexOf(handler)
    if (i >= 0) backHandlers.splice(i, 1)
  }
}

export function runBackHandlers() {
  return backHandlers.some((h) => h())
}
