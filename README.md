# Dior Homme Intense — Interactive 3D Fragrance Experience

> A cinematic, noir-inspired luxury landing page that presents the Dior Homme Intense Eau de Parfum through a real-time 3D bottle, scroll-driven choreography, and a live colour atelier.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.169-000000?logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)

> **Disclaimer:** this is an independent concept project. It is not affiliated with, endorsed by, or connected to Parfums Christian Dior.

---

## Table of Contents

- [Overview](#overview)
- [Project Objectives](#project-objectives)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [UI/UX Design](#uiux-design)
- [Project Architecture](#project-architecture)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Screenshots & Preview](#screenshots--preview)
- [Video Presentation](#video-presentation)
- [Performance & Optimization](#performance--optimization)
- [Responsive Design](#responsive-design)
- [Security](#security)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

---

## Overview

**Dior Homme Intense — Interactive 3D Fragrance Experience** is a single-page web application built with React and Vite. It reimagines a luxury perfume presentation as an immersive journey: a photorealistic flacon floats in a dark studio, framed by an eclipse-like halo, and travels across the page as the visitor scrolls through the fragrance's story, olfactory notes, craftsmanship, and purchase ritual.

The bottle is **modelled entirely in code** — no external 3D models, HDR environment maps, images, or videos are used for the 3D scene. Glass, juice, cap, and the silver serif label are all generated procedurally at runtime.

## Project Objectives

- Deliver a **premium, editorial-quality** brand experience in the browser using real-time 3D.
- Faithfully evoke the **Dior Homme Intense flacon**: clear rectangular glass, thick base, amber juice, visible dip tube, and a black lacquer cap with a silver signature.
- Tie the 3D scene to the page narrative through **smooth, scroll-driven camera and object choreography**.
- Let visitors **personalise the mood** of the entire site — both the interface and the 3D lighting — through an interactive colour selector.
- Remain **fast and usable on desktop, tablet, and mobile** devices.
- Keep the codebase **clean, modular, and reusable**, with a clear separation between content, 3D rendering, animation, and UI.

## Features

### 3D Experience

| Feature | Description |
| --- | --- |
| Procedural perfume bottle | Glass shell, transmissive amber juice, thick glass base, dip tube and collar, metal seam, black lacquer cap. |
| Canvas-drawn label | "Dior / HOMME / INTENSE" lettering rendered to a canvas texture with a silver gradient, redrawn once the web font has loaded. |
| Studio lighting | Procedural `Lightformer` environment, a shadow-casting key spotlight, palette-tinted rim lights, and an inner glow light inside the juice. |
| Eclipse halo | A custom GLSL shader behind the bottle with a shimmering rim, bloom, and darker core. |
| Stone plinth | A two-tier pedestal with a metallic inlay ring in the active accent colour. |
| Atmosphere | Floating dust particles (`Sparkles`), scene fog, film grain, and a vignette overlay. |

### Interactions

| Interaction | Behaviour |
| --- | --- |
| Drag to rotate | Spin the bottle with the pointer; rotation continues with inertia after release. |
| Tap to spray | A short tap releases a burst of mist particles and a subtle "press" squash of the bottle. |
| Pointer parallax | The bottle and camera react gently to the cursor position. |
| Anatomy hotspots | In the *Craft* section, four pulsing markers pinned to the bottle open descriptive cards (also selectable from a list). |
| Note cards | Glass cards with a pointer-following light and a 3D tilt effect. |
| Size selector | Choosing 50, 100, or 150 ml updates the price and rescales the 3D bottle. |
| Add to bag | Increments the bag counter in the navigation and displays a confirmation toast. |
| Virtual spray | A dedicated button in the shop section triggers the spray effect. |

### Interface & Motion

- **Intro loader** with an animated counter and a curtain reveal, followed by the bottle's entrance animation.
- **Scroll choreography** across five sections (Hero, Story, Notes, Craft, Shop), each with its own bottle position, rotation, scale, camera distance, halo intensity, and hotspot visibility.
- **Text reveals**: masked word-by-word headline animations, fade-up paragraphs, and animated accord meters.
- **Smooth scrolling** with Lenis, synchronised with GSAP ScrollTrigger.
- **Custom cursor** (fine pointers only) that grows over controls and shows a "Drag" label over the bottle.
- **Navigation** with section links, a scroll progress line, a bag counter, and a full-screen mobile menu.
- **Footer** with an infinite marquee, section links, and a newsletter field (UI only).

### Colour Atelier

- Six curated palettes: **Noir Ambré**, **Iris Nocturne**, **Argent Glacé**, **Cuir Rouge**, **Vétiver**, and **Ivoire** (light theme).
- **Custom mode ("Sur mesure")**: pick an accent and a background colour; a full palette (surface, text, muted, glow, juice) is derived automatically, with light/dark detection based on luminance.
- Changes apply instantly to CSS custom properties **and** to the 3D scene (halo, rim lights, sparkles, juice colour, plinth inlay, environment), with smooth colour interpolation.
- The selected palette is remembered in the browser via `localStorage`.

## Technologies Used

| Technology | Version | Role |
| --- | --- | --- |
| [React](https://react.dev/) | 18.3 | UI library and component model |
| [Vite](https://vitejs.dev/) | 5.4 | Development server and production bundler |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | 4.x | React Fast Refresh and JSX support for Vite |
| [Three.js](https://threejs.org/) | 0.169 | WebGL 3D rendering engine |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | 8.x | React renderer for Three.js |
| [Drei](https://github.com/pmndrs/drei) | 9.x | R3F helpers: `RoundedBox`, `Environment`, `Lightformer`, `Sparkles`, `Html`, `PerformanceMonitor`, `AdaptiveDpr`, `Preload` |
| [GSAP](https://gsap.com/) + ScrollTrigger | 3.x | Timeline animations, scroll-linked tweens, `matchMedia` breakpoints |
| [Lenis](https://lenis.darkroom.engineering/) | 1.x | Smooth scrolling |
| GLSL | — | Custom shader for the halo effect |
| CSS3 | — | Custom properties (design tokens), backdrop filters, keyframe animations |
| Google Fonts | — | *Cormorant Garamond* (display serif) and *Manrope* (sans-serif) |

The project is written in modern JavaScript (ES modules, JSX). No CSS framework, UI kit, or state-management library is used.

## UI/UX Design

The visual language is **noir luxury**: deep, near-black backgrounds, warm amber light, generous negative space, and refined editorial typography.

- **Typography** — *Cormorant Garamond* for large display headlines (with italic accent words in the palette colour) paired with *Manrope* for body copy and uppercase, widely tracked labels.
- **Composition** — on desktop, copy and the bottle alternate sides from section to section, so the 3D object is always framed alongside the narrative rather than hidden behind it.
- **Materials** — frosted-glass panels (`backdrop-filter`), hairline borders, and soft glows echo the transparency of the flacon.
- **Motion** — expressive easing (`expo`, `power3`), staggered reveals, and damped 3D movement give a calm, cinematic rhythm.
- **Feedback** — hover states, active states on size and palette options, a bag "bounce", toast notifications, and visible focus outlines (`:focus-visible`).
- **Accessibility touches** — semantic sections, ARIA labels on icon buttons, `role="radiogroup"` for sizes, `aria-live` toast, the 3D canvas marked `aria-hidden`, `Escape` to close the palette panel, and reduced animation for users with `prefers-reduced-motion`.

## Project Architecture

The application is composed of two layers rendered on top of each other:

1. **A fixed full-viewport WebGL canvas** (React Three Fiber) containing the 3D scene.
2. **A scrolling HTML layer** containing the navigation, sections, and overlays.

```
                    ┌──────────────────────────────┐
                    │           App.jsx            │
                    └──────────────┬───────────────┘
           ┌───────────────────────┼────────────────────────┐
           ▼                       ▼                        ▼
   three/Experience          sections/* + components/*    hooks/*
   (R3F Canvas, fixed)       (HTML overlay, scrolls)      (Lenis, ScrollTrigger,
           │                       │                       palette, pointer)
           │       ┌───────────────┴───────────────┐        │
           │       ▼                               ▼        │
           │  store/useAppStore            store/sceneState ◄┘
           │  (reactive: palette, size,    (mutable per-frame targets:
           │   cart, spray, hotspot…)       position, rotation, camera…)
           │       ▲                               ▲
           └───────┴───────────────────────────────┘
                  read by the 3D scene every frame
```

**Key design decisions**

- **Shared external store** — `createStore.js` implements a minimal store on top of `useSyncExternalStore`. Because it is renderer-agnostic, the DOM tree and the R3F tree share state (palette, size, cart, spray events, active hotspot) without context bridging.
- **Non-reactive scene targets** — scroll-driven values live in a plain mutable object (`sceneState.js`). GSAP writes to it; `useFrame` reads from it and damps toward it. Scrolling therefore never triggers React re-renders.
- **Data-driven choreography** — every section's 3D keyframe is declared in `data/choreography.js` (separate desktop and mobile sets), and `useScrollChoreography` turns them into scrubbed ScrollTrigger tweens.
- **Unified pointer events** — the canvas uses the app root as its event source, so the bottle can be dragged even when page content overlaps it, while real UI controls (buttons, links, inputs) keep their own clicks.
- **Hotspot overlay** — Drei `<Html>` markers are portalled into a dedicated fixed layer so they track the bottle without scrolling with the page.

## Installation

### Prerequisites

| Requirement | Notes |
| --- | --- |
| Node.js | A recent LTS release (developed with Node.js 20) |
| npm | Bundled with Node.js (developed with npm 10) |
| Browser | A modern browser with WebGL 2 support (Chrome, Edge, Firefox, Safari) |

### Steps

```bash
# 1. Move into the project folder
cd dior-homme-intense

# 2. Install dependencies
npm install
```

## Getting Started

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement |
| `npm run build` | Creates an optimised production build in `dist/` |
| `npm run preview` | Serves the production build locally for verification |

### Development

```bash
npm run dev
```

Then open the URL printed in the terminal (Vite's default is `http://localhost:5173`).

To use a specific port:

```bash
npm run dev -- --port 5174
```

### Production build

```bash
npm run build
npm run preview
```

The contents of `dist/` are static files and can be deployed to any static hosting service.

## Project Structure

```
dior-homme-intense/
├── index.html                  # HTML entry, meta tags, Google Fonts
├── package.json                # Scripts and dependencies
├── vite.config.js              # Vite + React plugin, manual vendor chunks
├── public/
│   └── favicon.svg             # Minimal flacon favicon
└── src/
    ├── main.jsx                # React root (StrictMode)
    ├── App.jsx                 # Composes canvas, overlays, sections and global hooks
    ├── three/                  # 3D layer (React Three Fiber)
    │   ├── Experience.jsx      # Canvas, adaptive DPR, performance monitor
    │   ├── Scene.jsx           # Camera rig, lights, environment, sparkles
    │   ├── PerfumeBottle.jsx   # Procedural flacon, drag/spray logic, scroll damping
    │   ├── Plinth.jsx          # Stone pedestal with accent inlay
    │   ├── Halo.jsx            # GLSL eclipse halo shader
    │   ├── SprayMist.jsx       # Mist particle burst
    │   ├── Hotspots.jsx        # Anatomy markers (Drei <Html>)
    │   └── labelTexture.js     # Canvas label & particle sprite textures
    ├── sections/               # Page sections
    │   ├── Hero.jsx
    │   ├── Story.jsx
    │   ├── Notes.jsx
    │   ├── Craft.jsx
    │   ├── Shop.jsx
    │   └── Footer.jsx
    ├── components/             # Reusable UI
    │   ├── Navbar.jsx
    │   ├── Loader.jsx
    │   ├── ColorSelector.jsx
    │   ├── Cursor.jsx
    │   ├── Toast.jsx
    │   └── SplitText.jsx
    ├── hooks/
    │   ├── useSmoothScroll.js       # Lenis + GSAP ticker, scrollToSection()
    │   ├── useScrollChoreography.js # Section keyframes, text reveals, meters
    │   ├── usePalette.js            # Palette → CSS variables + localStorage
    │   ├── usePointer.js            # Normalised pointer for parallax
    │   └── useMediaQuery.js         # Media queries and device tier
    ├── store/
    │   ├── createStore.js      # Minimal useSyncExternalStore-based store
    │   ├── useAppStore.js      # App state: palette, size, cart, spray, hotspots
    │   └── sceneState.js       # Mutable per-frame scene targets and intro value
    ├── data/
    │   ├── content.js          # Navigation, notes, hotspots, sizes, stats
    │   ├── palettes.js         # Colour palette presets
    │   └── choreography.js     # Desktop and mobile 3D keyframes per section
    ├── utils/
    │   └── color.js            # Hex/RGB helpers, mixing, luminance, palette derivation
    └── styles/
        └── global.css          # Design tokens, layout, components, responsive rules
```

## Configuration

The project requires **no environment variables** and no external services. Customisation is done through a few well-defined files:

| File | What you can configure |
| --- | --- |
| `src/data/content.js` | Navigation links, olfactory notes, hotspot labels and 3D positions, bottle sizes and prices, craft statistics |
| `src/data/palettes.js` | Palette presets (`bg`, `surface`, `text`, `muted`, `accent`, `glow`, `liquid`, optional `light`) |
| `src/data/choreography.js` | Per-section bottle position, rotation, scale, camera distance/height, halo intensity, hotspot visibility — for desktop and mobile |
| `src/styles/global.css` | Default design tokens (`:root`), fonts, spacing, and breakpoints |
| `src/three/PerfumeBottle.jsx` | Bottle proportions (`GLASS`, `CAP`, `LIQUID`) and materials |
| `vite.config.js` | Build options and manual chunk splitting |

**Example — adding a palette preset**

```js
// src/data/palettes.js
{
  id: 'saphir',
  name: 'Saphir',
  bg: '#05070d',
  surface: '#10141f',
  text: '#eef1f8',
  muted: '#8d95aa',
  accent: '#7fa2ff',
  glow: '#5d86ff',
  liquid: '#b98a4e',
}
```

## Screenshots & Preview

No screenshots are included in the repository yet. Running `npm run dev` provides the full interactive preview locally.

To add screenshots, place them in a folder such as `docs/screenshots/` and reference them here:

```markdown
![Hero section](docs/screenshots/hero.png)
```

## Video Presentation

A video presentation has not been published yet. This section will be updated with a link once a walkthrough is available.

## Performance & Optimization

| Technique | Implementation |
| --- | --- |
| Adaptive resolution | `PerformanceMonitor` lowers or raises the device-pixel-ratio cap based on measured frame rate; `AdaptiveDpr` adjusts during heavy moments. |
| Device tiers | On mobile and touch devices: lower DPR cap, no MSAA, smaller shadow map, smaller environment map, fewer sparkles and mist particles, lower geometry smoothness. |
| No heavy assets | The bottle, label, environment lighting, and particle sprites are generated at runtime — no 3D model, HDR, or texture downloads. |
| Render-free scrolling | Scroll values are written to a mutable object and read in `useFrame`, avoiding React re-renders during scroll. |
| Frame-rate-independent motion | All 3D movement uses exponential damping scaled by delta time. |
| Single canvas | One fixed WebGL context serves the entire page. |
| Selective shadows | Only opaque parts (juice, cap) cast shadows; the plinth receives them. |
| Resource cleanup | Canvas textures are disposed on unmount; GSAP contexts and `matchMedia` instances are reverted. |
| Code splitting | Vite's `manualChunks` separates `three`, R3F/Drei, and GSAP/Lenis into cacheable vendor bundles. |
| Font loading | `preconnect` hints and `display=swap`; ScrollTrigger refreshes once fonts are ready to prevent layout drift. |

## Responsive Design

The layout is designed for **desktop, tablet, and mobile**, with breakpoints at **1100px** and **768px**.

| Viewport | Behaviour |
| --- | --- |
| Desktop (> 1100px) | Two-column compositions: copy on one side, bottle on the other, alternating per section. Full navigation with palette label. |
| Tablet (769–1100px) | Narrower spacing, compact palette button, hero side label hidden. |
| Mobile (≤ 768px) | Bottle positioned in the upper half of the screen using a dedicated set of mobile keyframes; content flows below over a gradient backdrop. Burger menu with a full-screen overlay, single-column note cards, stacked shop controls, bottom-sheet palette panel. |

Additional considerations:

- Fluid typography with `clamp()` and `svh` units for mobile browser toolbars.
- `viewport-fit=cover` for devices with display cut-outs.
- The custom cursor is disabled on coarse (touch) pointers.
- Touch-friendly tap targets for buttons and size options.

## Security

This is a **static, front-end-only** application:

- **No backend, database, authentication, or API calls** — no user data is transmitted to any server by the application.
- **No secrets or environment variables** are required or stored in the codebase.
- **Local storage** is used only to remember the selected colour palette; all access is wrapped in `try/catch` so the app works even when storage is unavailable.
- The **newsletter form** prevents submission and does not send data anywhere; the **bag** is a demonstration counter with no checkout or payment processing.
- **Third-party requests** are limited to Google Fonts stylesheets and font files loaded from `index.html`.
- React escapes rendered content by default, and the project does not use `dangerouslySetInnerHTML`.

When deploying, it is recommended to serve the site over HTTPS and configure standard security headers (for example a Content Security Policy allowing `fonts.googleapis.com` and `fonts.gstatic.com`) at the hosting level.

## Future Improvements

- Connect the bag to a real cart and checkout flow.
- Wire the newsletter form to an email service.
- Add internationalisation (e.g. French and English copy).
- Self-host the web fonts to remove the third-party dependency.
- Add a loading progress tied to real asset loading if external models or textures are introduced.
- Introduce automated tests (component tests and visual regression).
- Add linting and formatting tooling (ESLint, Prettier).
- Further accessibility work, such as keyboard-driven bottle rotation and a reduced-motion mode for 3D camera movement.
- Add screenshots and a video walkthrough to this README.

## Author

**Dhia Saied**

## License

No license has been specified for this project yet. Until a license file is added, all rights are reserved by the author.

*Dior* and *Dior Homme Intense* are trademarks of their respective owner and are referenced here solely for non-commercial, demonstrative purposes.
