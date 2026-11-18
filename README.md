# WrapSense Website — Design Handoff

These files are a **design prototype** of the site. They show how it should look and behave. They are not production code. Rebuild it in your own stack (WordPress, Next.js, Webflow, etc.) using these files as the reference.

## How to view
Open `index.html` in a browser. Opening the file directly works, but a local server avoids issues: `npx serve .` or `python3 -m http.server`.
Pages use React 18 and Babel from a CDN, so you need an internet connection.

## Pages
- `index.html`: Home
- `machines.html`: all 10 machine families, filterable by industry
- `machines-vffs.html` + `family-*.html`: one page per machine family (FastPack, Triservo, SensiWeigh, QuickStick, RapidBagger, CartoMate, CaseMaster, PickN'Pack, LabelEase, CapVantage)
- `machine.html`: single model detail page
- `industries.html` + `lp-*.html`: industry hub and 5 landing pages (Snacks, Coffee, Supplements, Pharma, Cannabis)
- `packages.html`: Shop by package type
- `case-studies.html` + `case-study-*.html`: case studies (**placeholder content**)
- `about.html`, `contact.html`

## Where things live
- `app/data.js`: machine families, models and specs
- `app/content-data.js`: industries, case studies, FAQs, quotes (**case studies are made up; replace them before launch**)
- `app/family-extras.js`: per-family extra content
- `app/chrome.jsx`: header, dropdown nav, footer, shared section components
- `app/*-page.jsx`: one component per page template
- `app/tweaks-panel.jsx`: **prototype-only** design toggle panel. Do not build it. Defaults in each page show the chosen look.
- `assets/colors_and_type.css`: design tokens (colors, type, spacing, radii, family gradients). **Start here.**
- `assets/models/`, `assets/machines/`, `assets/packages/`, `assets/catalog/`, `assets/sell-sheets/`: images

## Design system
- Fonts: Barlow Condensed (headings, uppercase), Inter (body), JetBrains Mono (specs). All from Google Fonts.
- Color: navy to blue brand palette. Each machine family has its own gradient, defined in `colors_and_type.css` (`--ws-gradient-flow`, `-vffs`, `-weigh`, and so on).
- Corners are tight (4–6px). Layouts are flat with 1px borders. Motion is minimal.
- Layout: max width 1280px; 3 / 2 / 1 column grids for desktop / tablet / mobile.

## Known gaps
- **Images:** product photos were extracted from a compressed catalog PDF and are low resolution. Use the original high-res photos.
- **Forms:** quote and contact forms are not connected to anything. They need a backend or CRM (HubSpot, etc.).
- **Content:** case-study names, numbers and quotes are placeholders.
- **Models to confirm:** check the model and photo pairings for FastPack 43000 vs 63000, CartoMate H vs V, SensiWeigh 5L, and Triservo 23000 vs 33000.
