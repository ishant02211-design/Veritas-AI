import React, { useState } from "react";
import { Terminal, Globe, FolderGit2, Check, Copy, HelpCircle, Layers, Server, Code2, Sparkles, BookOpen } from "lucide-react";

export default function DeploymentAndShadcnGuide() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6 px-4 sm:px-6">
      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Integration & Deployment Manual</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          shadcn/ui Architecture & Netlify Deployment
        </h1>
        <p className="text-zinc-400 text-base leading-relaxed">
          Comprehensive guide for shadcn project configuration, why <code className="text-pink-300 font-mono">/components/ui</code> is the standard path, and 1-click Netlify hosting instructions for the Veritas AI detection suite.
        </p>
      </div>

      {/* Grid: 1. Why /components/ui & shadcn Structure */}
      <section className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Why <span className="font-mono text-pink-400">/components/ui</span> is Crucial in shadcn
            </h2>
            <p className="text-xs text-zinc-400">
              Canonical directory architecture and automated CLI tooling compatibility
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
              <Code2 className="w-4 h-4" />
              <span>1. shadcn CLI Target</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The shadcn CLI (<code className="text-zinc-300 font-mono">npx shadcn add &lt;component&gt;</code>) reads <code className="text-zinc-300 font-mono">components.json</code> and writes atomic primitives directly into <code className="text-pink-300 font-mono">/components/ui</code>. Deviating breaks automatic registry updates.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
              <FolderGit2 className="w-4 h-4" />
              <span>2. Atomic Separation</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Keeps pure UI design primitives (buttons, modals, dialogs, shaders) cleanly isolated from application business components (e.g. <code className="text-zinc-300 font-mono">ForensicCanvas</code>, <code className="text-zinc-300 font-mono">VideoTimeline</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
              <Terminal className="w-4 h-4" />
              <span>3. Path Alias & TypeScript</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Matches the standard alias <code className="text-zinc-300 font-mono">@/components/ui/*</code> configured in <code className="text-zinc-300 font-mono">tsconfig.json</code> and <code className="text-zinc-300 font-mono">vite.config.ts</code>, preventing brittle relative imports (<code className="text-zinc-400 font-mono">../../</code>).
            </p>
          </div>
        </div>

        {/* Current setup status */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-start gap-3 text-xs text-emerald-200">
          <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-semibold text-emerald-100">Configured in this Project:</span>
            <ul className="mt-1 list-disc list-inside space-y-0.5 text-emerald-300/90 font-mono text-[11px]">
              <li>components.json created with root alias mapping to @/components/ui</li>
              <li>pinky-news-letter.tsx and demo.tsx mounted at /components/ui</li>
              <li>@paper-design/shaders-react installed and operating via WebGL canvas</li>
              <li>Tailwind CSS v4 with modern @import "tailwindcss"</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Grid: 2. How to Setup shadcn, Tailwind, and TypeScript */}
      <section className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              CLI Commands & Setup Instructions
            </h2>
            <p className="text-xs text-zinc-400">
              Exact terminal commands to recreate or extend this stack in any repository
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "1. Initialize shadcn (Always use --defaults flag)",
              cmd: "npx shadcn@latest init --defaults",
              desc: "Creates components.json, configures path aliases, and sets up lib/utils.ts with the cn() helper.",
            },
            {
              title: "2. Install Required Shader & UI Packages",
              cmd: "npm install @paper-design/shaders-react lucide-react clsx tailwind-merge canvas-confetti",
              desc: "Installs the Warp shader package, icons, and shadcn styling helpers.",
            },
            {
              title: "3. Add Standard shadcn UI Primitives",
              cmd: "npx shadcn add button card dialog tabs badge slider",
              desc: "Pulls official accessible primitives straight into /components/ui.",
            },
          ].map((step, idx) => (
            <div key={idx} className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-200">{step.title}</span>
                <button
                  onClick={() => copyToClipboard(step.cmd, idx)}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-2.5 bg-black rounded-lg text-pink-300 font-mono text-xs overflow-x-auto border border-zinc-900">
                {step.cmd}
              </pre>
              <p className="text-[11px] text-zinc-500 font-sans">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Grid: 3. Netlify Deployment Guide */}
      <section className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Deploying to Netlify (1-Click Ready)
            </h2>
            <p className="text-xs text-zinc-400">
              Full instructions to deploy this AI Detection web app on Netlify
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
          <p>
            This application is already structured with a root <code className="text-teal-300 font-mono">netlify.toml</code> containing the build command, static publish directory, and Single Page Application rewrite rules.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="font-semibold text-white text-sm">Option A: Netlify Git Continuous Deploy</span>
              <ol className="list-decimal list-inside space-y-1.5 text-zinc-400">
                <li>Push this repository to GitHub or GitLab.</li>
                <li>Go to <span className="text-teal-300">app.netlify.com</span> &rarr; "Add new site" &rarr; "Import an existing project".</li>
                <li>Select the repo. Netlify will auto-detect <code className="text-white font-mono">netlify.toml</code>:
                  <ul className="list-disc list-inside pl-4 text-zinc-500 text-[11px] mt-1">
                    <li>Build command: <code className="text-pink-300">npm run build</code></li>
                    <li>Publish directory: <code className="text-pink-300">dist</code></li>
                  </ul>
                </li>
                <li>In Netlify Site Settings &rarr; Environment variables, add <code className="text-white font-mono">GEMINI_API_KEY</code> if using server-side multimodal inspection.</li>
                <li>Click <span className="font-bold text-white">Deploy site</span>!</li>
              </ol>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="font-semibold text-white text-sm">Option B: Netlify CLI</span>
              <pre className="p-3 bg-black rounded-lg text-pink-300 font-mono text-[11px] overflow-x-auto border border-zinc-900 leading-loose">
                {`# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build the production bundle
npm run build

# 3. Deploy directly to Netlify
ntl deploy --prod --dir=dist`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: 4. Implementation Guidelines Answers */}
      <section className="bg-zinc-900/80 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <HelpCircle className="w-5 h-5 text-pink-400" />
          <span>Implementation Questions & Architectural Decisions</span>
        </div>

        <div className="space-y-3 text-xs text-zinc-300">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="font-semibold text-pink-300">Q: What data/props will be passed to this component?</span>
            <p className="text-zinc-400 mt-1">
              The <code className="text-zinc-200 font-mono">&lt;NewsLetter /&gt;</code> component accepts optional <code className="text-zinc-200 font-mono">title</code>, <code className="text-zinc-200 font-mono">subtitle</code>, <code className="text-zinc-200 font-mono">description</code>, <code className="text-zinc-200 font-mono">placeholder</code>, and an async <code className="text-zinc-200 font-mono">onSubscribe(email)</code> handler, while falling back gracefully to default Coming Soon copy if called with zero props.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="font-semibold text-pink-300">Q: Are there any specific state management requirements?</span>
            <p className="text-zinc-400 mt-1">
              Yes: <code className="text-zinc-200 font-mono">status</code> ("idle" | "loading" | "success" | "error"), email format validation, confetti animation on success, and clear inline feedback.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="font-semibold text-pink-300">Q: Are there any required assets (images, icons, etc.)?</span>
            <p className="text-zinc-400 mt-1">
              Vector icons from <code className="text-zinc-200 font-mono">lucide-react</code> (<code className="text-zinc-300">ArrowRight, Mail, Sparkles, CheckCircle2</code>), WebGL shader rendered via <code className="text-zinc-200 font-mono">@paper-design/shaders-react</code>, and high-fidelity benchmark samples sourced from verified Unsplash stock imagery.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="font-semibold text-pink-300">Q: What is the expected responsive behavior?</span>
            <p className="text-zinc-400 mt-1">
              Fully fluid: full-viewport shader canvas, responsive text scale (<code className="text-zinc-200 font-mono">text-5xl</code> to <code className="text-zinc-200 font-mono">text-7xl</code>), touch-friendly input targets (48px+), and responsive padding from mobile (390px) to desktop (1440px+).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
            <span className="font-semibold text-pink-300">Q: What is the best place to use this component in the app?</span>
            <p className="text-zinc-400 mt-1">
              1) As a primary dedicated tab <strong className="text-zinc-200">"VIP Waitlist"</strong> for early access to the deepfake streaming API; 2) As a modal accessible via the top-bar "VIP Access" button; and 3) Standalone demo at <code className="text-zinc-200 font-mono">/components/ui/demo.tsx</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
