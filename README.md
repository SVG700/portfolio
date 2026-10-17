# Samhith V Gupta — Portfolio

Personal portfolio built with Vite, React, TypeScript and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
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

The "View Resume" / "Download Resume" buttons check that a real PDF is served at that path. Until the file exists, they show a disabled "Resume coming soon" state rather than a broken link.

## Adding links later

- **Repository or demo:** set `links.repo` / `links.demo` on the project in `projects.ts`.
- **Certificate:** set `evidenceUrl` on the achievement in `achievements.ts`.
- **Availability badge:** set `openToInternships: true` in `profile.ts` (off by default).
- **Profile photo (optional):** not used by the current design. If wanted, add it to `public/` and render it in `src/components/Hero.tsx`.

## Social preview

`public/og-image.png` (1200×630) is the link-preview image. After deploying, change `og:image` and `twitter:image` in `index.html` to the absolute URL (e.g. `https://your-domain/og-image.png`) — LinkedIn requires an absolute URL.
