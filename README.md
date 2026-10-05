# Tushar Pradhan — Cybersecurity Portfolio

A responsive, cinematic purple and magenta cyberpunk portfolio, rebuilt from the supplied React project.

## Develop

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
```

The static production output is in `dist/`. Deploy that directory to any static hosting provider. The default base is `/`; for a GitHub Pages project path use `npm run build -- --base=/personalport/`.

## Personalize

- `src/data/portfolio.ts`: name, email, GitHub, original projects, skills, tools.
- `src/App.tsx`: services, project overviews, field notes, education, FAQ, terminal commands, and contact flow.
- `src/App.css` and `src/Hacker.css`: visual styling, responsive layouts, pointer-reactive surfaces.
- `src/components/HackerEffects.tsx`: matrix background and mouse spotlight, honoring reduced motion.
- `src/components/PortfolioTerminal.tsx`: interactive terminal UI.
- `src/lib/terminal-engine.ts`: read-only virtual filesystem, command parser, manuals, and completion.
- `src/assets/avatar.jpg`: original supplied character artwork.
- `index.html`: page title and metadata.

Project claims are retained from the supplied portfolio. Service copy, field notes, and collaboration process were drafted for this redesign. No certifications, testimonials, client results, or CTF achievements were invented.

## Features and behavior

- Responsive navigation and selected-section indicators.
- Category filters and accessible project detail dialogs.
- Local portfolio terminal with `help`, `whoami`, `skills`, `projects`, `contact`, `ethics`, `clear`, and `open work/about/contact` commands. It never executes shell commands.
- Read-only GitHub repository retrieval, with a labeled fallback to supplied project links when unavailable. No invented activity statistics.
- Three educational field notes in accessible reading dialogs.
- Project inquiry form prepares a `mailto:` draft; no message is automatically sent and no inquiry is stored by the site. Copy and plain-text download are also available.
- Motion preference is stored locally, with operating-system reduced-motion support.
- No visitor tracking or analytics.

## Validation

Production TypeScript and Vite build passed. Server rendering, all internal anchor targets, all four project cards, primary controls, and built asset paths were checked. A browser visual pass was unavailable in the build environment; verify responsive layout and email-app behavior on your target devices before public release.

## Version 3 update

Email: hello@tusharpradhan.com.np. Added a dedicated terminal section, Linux-style file navigation and text filters, simple pipes, manuals, history recall, Tab completion, and keyboard shortcuts. Network examples are explicitly labeled static simulations. Cursor spotlight and pointer-reactive card tilt are limited to fine pointers and disabled with reduced motion. Production build, server rendering, anchor navigation, and 21 command behavior checks passed; browser visual QA remains unavailable.

## Purple cyberpunk edition

Unified violet surfaces, magenta accents, purple matrix rain, pointer spotlights, and terminal defaults. Added reading progress and downloadable terminal transcripts. Email remains hello@tusharpradhan.com.np. No real shell commands or network scans are executed.
