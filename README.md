# Samhith V Gupta — Portfolio

Personal portfolio of **Samhith V Gupta**, Computer Science student at Presidency University, Bengaluru: projects, experience, skills, education and a downloadable resume. The same codebase also ships as an offline Android app.

**Live site:** _coming soon_ · **Android app:** see [Releases](https://github.com/SVG700/portfolio/releases)

## Highlights

- Fast, static single-page site, deployed on Vercel. No backend, no tracking.
- Content lives in typed data files (`src/data/`), so updating the site never means touching layout code.
- Considered motion system (Framer Motion): scroll reveals, a scroll-linked timeline, a pinned project story on desktop, and an optional 3D hero scene that only loads on capable desktops. Everything respects `prefers-reduced-motion`.
- Accessible: semantic landmarks, keyboard focus styles, screen-reader text for every animated label.
- Android app built with Capacitor: bundled offline, animated launch splash, lighter motion profile.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4, self-hosted variable fonts (Bricolage Grotesque, Geist) |
| Motion and 3D | Framer Motion, three.js with React Three Fiber (lazy-loaded) |
| Android | Capacitor 8 |
| Hosting | Vercel (static build from `dist/`) |

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Editing content

All personal content lives in `src/data/` — components only render it.

| File | What it holds |
| --- | --- |
| `src/data/profile.ts` | Name, intro, email, links, resume path, education, interests, `openToInternships` flag |
| `src/data/projects.ts` | Projects: status, stack, features, role, links, scope notes |
| `src/data/skills.ts` | Grouped skills and which projects demonstrate them |
| `src/data/achievements.ts` | Awards and programmes (add `year` / `evidenceUrl` when confirmed) |
| `src/data/experience.ts` | Experience and leadership roles (add `period` when confirmed) |

Optional fields that are left out simply don't render, so there are no empty placeholders on the page.

## Project visuals

- **Screenshots** (`public/work/*.webp`) are real captures of the deployed demos: HelioHub, NyayaLens, PayPerView and StadiumOS (the StadiumOS one comes from the repo's own `screenshots/` folder). To replace one, drop in a new 1280px-wide WebP and keep the filename.
- **Interface previews** for NEXORA, the forecasting project and EcoBuddy are built in code (`src/components/mocks.tsx`). They use synthetic values and say so on screen. Swap a project to a real screenshot by changing its `visual` in `projects.ts` to `{ type: 'screenshot', … }`.

## Resume

Put the PDF at **`public/resume.pdf`**. It is served at `/resume.pdf`.

The resume is generated from `resume/resume.html` with `npm run resume` (output: `resume/Samhith_V_Gupta_Resume.pdf`, gitignored). Review it, then copy it to `public/resume.pdf` to publish. The Resume buttons only render when a real PDF is served at that path, and are hidden inside the Android app (its WebView cannot display PDFs).

## Adding links later

- **Repository or demo:** set `links.repo` / `links.demo` on the project in `projects.ts`.
- **Certificate:** set `evidenceUrl` on the achievement in `achievements.ts`.
- **Availability badge:** set `openToInternships: true` in `profile.ts` (off by default).

## Build the Android APK

The same site, packaged with [Capacitor](https://capacitorjs.com) into an Android app (`dev.samhith.portfolio`). The built site is bundled inside the APK, so the app works offline. Content still comes from `src/data/` — there is one codebase.

```bash
npm run apk            # build site → sync into android/ → signed release APK in release/
npm run android:sync   # build site and copy it into android/ (no APK)
npm run android:open   # open the Android project in Android Studio
npm run android:assets # regenerate icon + splash from assets/*.png
```

Launch: on Android 12+ the system splash shows an animated SG monogram (`android/app/src/main/res/drawable/splash_avd.xml` + `splash_sg.xml`, glyphs from Bricolage Grotesque), then fades to the site. Older Android versions show the static splash.

App-only behaviour lives in `src/native.ts` (status bar, back button, opening external links in the phone's browser / mail app) and `src/platform.ts` (`isNativeApp`, back-button handlers).

**Requirements on the build machine**
- JDK 21 (Capacitor 8). Gradle is pointed at it in `~/.gradle/gradle.properties` via `org.gradle.java.home`.
- Android SDK (`ANDROID_HOME`).
- The signing files in `~/.android-keys/samhith-portfolio/` (`release.jks` + `signing.properties`). They are never in this repo. **Back them up** — without that exact keystore you cannot publish updates that install over the existing app.

**Releasing:** bump `versionCode` and `versionName` in `android/app/build.gradle`, run `npm run apk`, then attach `release/samhith-v-gupta-<version>.apk` to a GitHub Release. The APK is gitignored — don't commit it. Set `androidAppUrl` in `src/data/profile.ts` to the release page so the website's "Get the Android app" button turns on (it is hidden inside the app).

## Social preview

`public/og-image.png` (1200×630) is the link-preview image. After deploying, change `og:image` and `twitter:image` in `index.html` to the absolute URL (e.g. `https://your-domain/og-image.png`) — LinkedIn requires an absolute URL.
