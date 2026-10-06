# TUSHAR_OS — Tushar Pradhan

Purple cyberpunk portfolio desktop for an ethical hacking and cybersecurity student. React, TypeScript, Vite, and Tailwind.

## Run and build

Use Node.js 22 or newer. Run `npm ci`, then `npm run dev`. Run `npm run build` to generate `dist/`.

Cloudflare Pages uses the `main` branch, build command `npm run build`, and output directory `dist`. The site assumes hosting at the root of tusharpradhan.com.np.

## Interface

- Skippable boot screen, remembered locally.
- Draggable, resizable, minimizable desktop windows; fullscreen modules on mobile.
- Identity, project vault, arsenal, CTF notes, interactive learning map, GitHub, credentials, journey, notes, résumé, contact, and preferences.
- Ctrl/Cmd+K command palette; Ctrl+backtick terminal; Escape closes the focused window.
- Linux-style browser terminal with virtual files, pipes, manuals, history, autocomplete, transcript export, and visual modes. It does not run a real shell or send scans.
- Optional sound, matrix, and CRT effects. Sound starts off. Reduced-motion support and keyboard controls are included.
- Telemetry is explicitly simulated. GitHub data comes from public API requests and has a labeled fallback.
- Contact prepares an email draft for the visitor to review and send. No backend message delivery or tracking.

## Content

- `src/data/portfolio.ts`: supplied personal information and projects.
- `src/data/credentials.ts`: clean learning-profile URLs and verified certificate details.
- `src/os/Modules.tsx`: module content and behavior.
- `src/os/catalog.ts`: app navigation and learning-tool groups.
- `src/os/Window.tsx`: desktop window controls.
- `src/os/os.css`: layout and appearance.
- `src/os/Effects.tsx`: cursor and ambient effects.
- `src/lib/terminal-engine.ts`: command parser and virtual filesystem.
- `public/resume.html`: printable profile; keep synchronized with profile data.
- `index.html`: metadata and structured profile links.

The supplied TryHackMe PDFs show Cyber Security 101 (14 May 2025, TUSHAR PRADHAN) and Pre Security (7 May 2025, recipient displayed as UnKnown). Original names and issuer links are preserved. No platform rank, badge, or CTF result is inferred from a profile URL.

## Validation

Production TypeScript/Vite build and 13 terminal behavior checks passed. Chromium checks covered desktop, tablet, and mobile layouts, certificate cards, terminal output, window drag/resize/maximize/minimize/restore, keyboard closing, command palette, module rendering, reduced motion, and horizontal overflow. No JavaScript page errors were observed.
