# Veritas AI & MetroHero &middot; Modern Cinematic Web Experience

[![React 19](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-standard-black.svg)](https://ui.shadcn.com/)
[![Netlify Deploy](https://img.shields.io/badge/Deploy-Netlify_Ready-00C7B7.svg)](https://www.netlify.com/)
[![Node.js Tests](https://img.shields.io/badge/Tests-8%2F8_Passed-brightgreen.svg)](https://nodejs.org/api/test.html)

A production-grade, cinematic web application that pairs an **interactive scroll-locked video scrub hero** with an **enterprise-grade AI image & deepfake video forensic detection suite** and a **WebGL Warp shader newsletter**, built with React 19, TypeScript, Tailwind CSS, and shadcn/ui.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Key Features](#key-features)
   - [MetroHero: Cinematic Scroll-Locked Video Hero](#1-metrohero-cinematic-scroll-locked-video-hero)
   - [Veritas AI: Media Forensic Detection Suite](#2-veritas-ai-media-forensic-detection-suite)
   - [Warp Shader Newsletter](#3-warp-shader-newsletter)
3. [Project Structure](#project-structure)
4. [Installation & Local Setup](#installation--local-setup)
5. [Building and Deploying on Netlify](#building-and-deploying-on-netlify)
   - [Option A: Git Continuous Deployment (Recommended)](#option-a-git-continuous-deployment-recommended)
   - [Option B: Netlify CLI](#option-b-netlify-cli)
   - [Netlify Configuration (netlify.toml)](#netlify-configuration-netlifytoml)
6. [Testing & Verification](#testing--verification)
7. [Environment Variables](#environment-variables)
8. [shadcn/ui Canonical Directory Architecture](#shadcnui-canonical-directory-architecture)
9. [License](#license)

---

## Technology Stack

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19**, **Vite 8** | High-performance SPA with client-side routing and fast build times |
| **Language** | **TypeScript 5+** | Strict typing with path aliases (`@/*`) configured in `tsconfig.json` |
| **Styling** | **Tailwind CSS v4** | Modern `@import "tailwindcss"` engine with dynamic sizing |
| **UI Primitives** | **shadcn/ui** | Atomic components in canonical `/components/ui` with `components.json` |
| **WebGL Shaders** | **`@paper-design/shaders-react`** | Hardware-accelerated fluid WebGL canvas shaders |
| **Icons** | **Lucide React** | Clean, accessible SVG iconography |
| **Fullstack Backend** | **Express.js**, **Node.js** | Server-side API proxy running on `server.ts` |
| **Multimodal AI** | **`@google/genai` (Gemini 3.8 Flash)** | AI multimodal forensic reasoning over base64 and remote media |
| **Computer Vision** | **HTML5 Canvas API** | Pixel-level PRNU noise variance, Laplacian edge filters, EXIF sniffer |
| **Test Runner** | **Node.js Native Test Runner** | Unit tests via `node:test` and `node:assert/strict` |
| **Deployment** | **Netlify** | Static SPA deployment with automated rewrite headers |

---

## Key Features

### 1. MetroHero: Cinematic Scroll-Locked Video Hero
Located at: `components/ui/scroll-locked-video-hero.tsx` (Re-exported at `src/components/ui/scroll-locked-video-hero.tsx`)

- **Interactive Bidirectional Scrubbing**: Scrolling down scrubs the background video forward frame-by-frame; scrolling up scrubs backward.
- **Sticky Viewport Track**: Employs a non-blocking `relative h-[320vh]` track with a `sticky top-0 h-screen` viewport, preventing page scroll trapping and memory leaks.
- **Two-Phase Kinetic Typography**:
  - `0% - 45% Scrub`: Centered bold kinetic headline: **"THE CITY OPENS"**.
  - `45% - 100% Scrub`: Headline dissolves as the supporting tagline **"Every door in the city is already open."** and CTA button **"Enter The Archive"** emerge.
- **Visual Polish**: Subtle zoom interpolation (`1.0` to `1.08`), atmospheric blur, glowing gradient progress bar, and dark `#05070D` contrast overlays.
- **Editorial Landing Sections**:
  - **About (`// ARCHITECTURAL PHILOSOPHY`)**: Generous spacing, modern typography on urban symmetry.
  - **Featured Perspectives**: Three editorial architectural case studies (*The Obsidian Monolith*, *Nocturne Transit*, *The Cantilever Horizon*).
  - **Discover (`The Architecture of Stillness`)**: Ultra-wide 21:9 focal presentation.
  - **Contact**: Minimalist access request form with instant validation.
  - **Footer**: Brand credits, copyright, and seamless navigation.

### 2. Veritas AI: Media Forensic Detection Suite
Located at: `src/App.tsx`, `src/lib/detector.ts`, and `src/lib/visionForensics.ts`

- **3-Tier Forensic Pipeline**:
  1. **Pixel Computer Vision**: PRNU sensor shot noise floor, flat-texture ratio (synthetic skin smoothing), and Laplacian edge convolution.
  2. **Binary Hardware EXIF**: Scans image headers for camera hardware (Apple, Canon, Sony, Nikon) and generative prompt tags (`Stable Diffusion`, `Midjourney`, `ComfyUI`).
  3. **Gemini 3.8 Flash Multimodal AI**: Server-side forensic reasoning analyzing lighting physics, reflections, and latent artifacts.
- **Interactive Forensic Lens**: Real-time canvas overlays:
  - **Original Media**
  - **Anomaly Heatmap** (red/amber generative latent zones)
  - **Edge Coherence Filter** (Laplacian convolution revealing unnatural blending)
  - **Sensor Noise Residuals** (sensor photon shot noise isolation)
  - **Zone Reticles** (bounding boxes highlighting specific anomaly zones)
- **Video Deepfake Lab**:
  - Frame-by-frame temporal consistency analyzer with interactive scrubber.
  - Anomaly graph tracking latent morphing spikes, face swaps, and background boiling.
- **Forensic Inspection Certificate**:
  - Cryptographic SHA-256 media fingerprint hash.
  - Detailed metric breakdown table, printable audit report, and JSON export.
- **Curated Benchmark Gallery**:
  - One-click verified real camera photos (Canon 5D, Sony Alpha, 4K Drone) and AI synthetic samples (Midjourney v6, Flux.1, Sora/Runway video).

### 3. Warp Shader Newsletter
Located at: `components/ui/pinky-news-letter.tsx`

- Real-time WebGL Warp shader background with interactive color dynamics.
- Form state management, email validation, and celebration confetti.
- Available as a dedicated **VIP Waitlist** tab and a modal dialog.

---

## Project Structure

```
├── components/
│   └── ui/
│       ├── demo.tsx                      # Standalone shader demo
│       ├── pinky-news-letter.tsx         # WebGL Warp shader newsletter
│       └── scroll-locked-video-hero.tsx  # MetroHero scroll-locked component
├── src/
│   ├── components/
│   │   ├── CinematicLanding.tsx          # Full editorial urban landing page
│   │   ├── DeploymentAndShadcnGuide.tsx  # In-app setup & Netlify documentation
│   │   ├── ForensicCanvas.tsx            # Canvas with Heatmap, Edges, Noise filters
│   │   ├── ForensicReportModal.tsx       # SHA-256 certificate dialog & JSON export
│   │   ├── Navbar.tsx                    # Responsive top navigation bar
│   │   ├── VideoTimelineAnalyzer.tsx     # Frame-by-frame temporal deepfake inspector
│   │   └── ui/                           # Canonical re-exports for shadcn CLI
│   ├── data/
│   │   └── benchmarkSamples.ts           # Curated real camera & AI synthetic benchmarks
│   ├── lib/
│   │   ├── detector.ts                   # Scoring math, temporal anomaly algorithms
│   │   ├── detector.test.ts              # Unit tests (8 passing tests)
│   │   ├── utils.ts                      # Standard shadcn cn() helper
│   │   └── visionForensics.ts            # Canvas pixel analyzer & binary EXIF scanner
│   ├── App.tsx                           # Root component coordinating views & tabs
│   ├── main.tsx                          # React entry point
│   └── index.css                         # Global CSS with Tailwind CSS v4 import
├── .github/
│   └── workflows/
│       └── ci.yml                        # GitHub Actions automated CI workflow
├── .env.example                          # Environment variables template
├── .gitignore                            # Clean Git ignore rules
├── components.json                       # shadcn/ui configuration file
├── netlify.toml                          # Netlify build, publish, & redirect rules
├── package.json                          # Dependencies & NPM scripts
├── server.ts                             # Express server with Gemini 3.8 Flash endpoint
├── tsconfig.json                         # TypeScript configuration with @/ alias
└── vite.config.ts                        # Vite configuration with React & Tailwind plugins
```

---

## Installation & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) version **18.0.0** or higher (Node 20+ recommended)
- `npm` (comes bundled with Node.js) or `pnpm` / `bun`

### 1. Clone the repository
```bash
git clone https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git
cd <YOUR_REPOSITORY>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables (optional)
Copy the template environment file:
```bash
cp .env.example .env
```
Open `.env` and configure your API key (if using server-side Gemini multimodal analysis):
```env
GEMINI_API_KEY="your-google-gemini-api-key"
PORT=3000
```
> **Note**: The application has an embedded client-side Computer Vision engine that computes PRNU pixel noise, flat texture ratios, and EXIF metadata in the browser. It functions fully out-of-the-box even without an API key!

### 4. Start the local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## Building and Deploying on Netlify

This project is pre-configured for seamless **1-Click Netlify Deployment** using standard static single-page application (SPA) output.

### Option A: Git Continuous Deployment (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: deploy to Netlify"
   git push origin main
   ```
2. **Connect to Netlify**:
   - Log in to [app.netlify.com](https://app.netlify.com/).
   - Click **"Add new site"** &rarr; **"Import an existing project"**.
   - Select **GitHub** and choose your repository.
3. **Verify Build Settings**:
   Netlify will automatically detect the settings from `netlify.toml`:
   - **Base directory**: *(leave empty / root)*
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. **Configure Environment Variables** *(Optional)*:
   - Navigate to **Site configuration** &rarr; **Environment variables**.
   - Add `GEMINI_API_KEY` if you wish to use server-side AI multimodal analysis.
5. **Deploy Site**:
   - Click **Deploy site**. Netlify will run the build and publish your live URL in under 60 seconds!

---

### Option B: Netlify CLI

To build and deploy directly from your local terminal:

```bash
# 1. Install Netlify CLI globally
npm install -g netlify-cli

# 2. Build production assets
npm run build

# 3. Deploy to production
ntl deploy --prod --dir=dist
```

---

### Netlify Configuration (`netlify.toml`)

The root `netlify.toml` file ensures correct build commands and SPA client-side routing:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Testing & Verification

The project includes unit tests for forensic calculations, temporal video frame variance, and generative signatures using Node.js's built-in test runner:

```bash
# Run unit tests
npm test

# Run TypeScript type-checking
npm run lint

# Run production build
npm run build
```

### Verified Test Cases (`src/lib/detector.test.ts`):
1. `calculateWeightedAiScore correctly weights image metrics`
2. `calculateWeightedAiScore includes temporal jitter for video`
3. `determineVerdict maps probability thresholds accurately`
4. `calculateConfidence returns bounded high confidence for clear indicators`
5. `generateSyntheticHash produces consistent formatted hash`
6. `analyzeVideoFrames creates timeline of frames with timestamps`
7. `identifyGenerativeSignature identifies Midjourney and Video generators`
8. `calculateVideoTemporalAnomaly distinguishes smooth optical motion from erratic synthetic morphing`

---

## Environment Variables

| Variable | Required | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional | Google Gemini API key for server-side multimodal vision (`/api/analyze`). Client-side Computer Vision fallback is active when omitted. |
| `PORT` | Optional | Port for the local Express dev server (defaults to `3000`). |

---

## shadcn/ui Canonical Directory Architecture

This project strictly adheres to the official shadcn/ui directory structure:

1. **`components.json`**: Located at project root, defining path aliases:
   ```json
   {
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils",
       "ui": "@/components/ui"
     }
   }
   ```
2. **Why `/components/ui` is Important**:
   - **CLI Compatibility**: Running `npx shadcn add <component>` reads `components.json` and automatically writes atomic primitives into `/components/ui`.
   - **Atomic Separation**: Isolates generic UI design elements (buttons, sliders, modals) from feature components (`ForensicCanvas`, `VideoTimelineAnalyzer`).
   - **Registry Consistency**: Enables seamless copy-pasting of community shadcn components without broken relative import paths.

---

## License

This project is licensed under the [MIT License](LICENSE) &copy; 2026 Metropolis Archive / Veritas AI.
