import React, { useState } from "react";
import MetroHero from "./ui/scroll-locked-video-hero";
import { ArrowRight, ArrowUpRight, Compass, Eye, Mail, CheckCircle2, Building, Sparkles } from "lucide-react";

export default function CinematicLanding({
  onOpenForensicStudio,
  onOpenWaitlist,
}: {
  onOpenForensicStudio?: () => void;
  onOpenWaitlist?: () => void;
}) {
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmail && contactEmail.includes("@")) {
      setContactSubmitted(true);
    }
  };

  const experiences = [
    {
      number: "01",
      title: "The Obsidian Monolith",
      subtitle: "Brutalist Geometry & High-Altitude Glass",
      description:
        "Towering above the atmospheric haze, geometric glass angles capture shifting twilight reflections. An exploration of structural mass and the silence above street level.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      location: "Financial District / Latitude 37.7749° N",
    },
    {
      number: "02",
      title: "Nocturne Transit",
      subtitle: "Subterranean Kinetics & Electric Rails",
      description:
        "The perpetual rhythm of underground arteries. Polished stainless steel, subterranean tunnels, and kinetic light trails cutting through the dark.",
      image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80",
      location: "Central Line & Express Metro / Lower Level",
    },
    {
      number: "03",
      title: "The Cantilever Horizon",
      subtitle: "Overhanging Vistas & Rain-Washed Concrete",
      description:
        "Where raw textured concrete extends outward into open sky. Floating pavilions engineered to dissolve the threshold between indoor sanctuary and city horizon.",
      image: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1600&q=80",
      location: "Skyline Overlook / Sector 04",
    },
  ];

  return (
    <div className="bg-[#05070D] text-white font-sans selection:bg-white selection:text-[#05070D]">
      {/* 1. Cinematic Video Hero */}
      <MetroHero
        headline="THE CITY OPENS"
        tagline="Every door in the city is already open."
        videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        posterSrc="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=80"
      />

      {/* 2. About Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 py-32 sm:py-44 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 block">
              // ARCHITECTURAL PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight leading-tight">
              Spaces designed for the contemplative mind.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-8 text-white/80 text-lg sm:text-xl font-light leading-relaxed">
            <p>
              We believe a city is not merely concrete and steel, but a continuous canvas of light, shadow, and architectural intention. Behind every illuminated window lies an unspoken narrative of ambition and modern tranquility.
            </p>
            <p className="text-white/60 text-base leading-relaxed">
              From subterranean transit stations to sky-high cantilever pavilions, our studio curates experiences that reveal the hidden symmetry of modern urban life. Every corridor is an invitation; every threshold marks the beginning of curiosity.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/40">
              <span>EST. 2026 &middot; METROPOLIS ARCHIVE</span>
              <span>GLOBAL URBANISM</span>
              <span>CINEMATIC STUDIES</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Experiences Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-32 space-y-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-2 block">
              FEATURED PERSPECTIVES
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight tracking-tight">
              Curated Encounters
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            VOLUME 01 &mdash; 03 ENTRIES
          </span>
        </div>

        <div className="space-y-36">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center ${
                idx % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-7 relative group overflow-hidden rounded-2xl bg-zinc-900 aspect-[16/10] ${
                  idx % 2 === 1 ? "lg:col-start-6" : ""
                }`}
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/70 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span>{exp.location}</span>
                  <span className="text-white/40">HIGH-RES OPTICAL</span>
                </div>
              </div>

              {/* Text Column */}
              <div
                className={`lg:col-span-5 space-y-6 ${
                  idx % 2 === 1 ? "lg:col-start-1" : ""
                }`}
              >
                <span className="font-mono text-xs sm:text-sm text-pink-400 uppercase tracking-widest block font-medium">
                  {exp.number} &mdash; OBSERVATION
                </span>
                <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-white">
                  {exp.title}
                </h3>
                <h4 className="font-mono text-xs uppercase tracking-widest text-white/50">
                  {exp.subtitle}
                </h4>
                <p className="text-white/70 text-base leading-relaxed font-light">
                  {exp.description}
                </p>
                <div className="pt-2">
                  <button className="group/btn inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors cursor-pointer">
                    <span>Examine Perspective</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-pink-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Discover Section (Immersive Wide-Format) */}
      <section className="relative z-10 w-full py-32 bg-gradient-to-b from-transparent via-[#080d1a] to-transparent border-y border-white/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 block">
              DISCOVER &middot; CONTINUOUS EXPLORATION
            </span>
            <h2 className="text-4xl sm:text-5xl font-extralight tracking-tight">
              The Architecture of Stillness
            </h2>
            <p className="text-white/60 text-base font-light">
              Witness the city when the noise recedes and pure architectural geometry takes precedence.
            </p>
          </div>

          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden group shadow-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=2000&q=80"
              alt="Nocturnal Cityscape"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-widest text-pink-300">
                  NIGHT SCENE 04
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-white">
                  The Silent Concourse
                </h3>
              </div>
              <button
                onClick={onOpenForensicStudio}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#05070D] text-xs font-mono uppercase tracking-widest backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              >
                Analyze Media Authenticity
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 py-32 sm:py-40 text-center space-y-10">
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 block">
            GET IN TOUCH &middot; PRIVATE ACCESS
          </span>
          <h2 className="text-4xl sm:text-6xl font-extralight tracking-tight">
            Connect With The Studio
          </h2>
          <p className="text-white/60 text-base sm:text-lg font-light max-w-xl mx-auto">
            Whether for architectural inquiries, immersive installations, or digital media verification access, we look forward to the dialogue.
          </p>
        </div>

        {contactSubmitted ? (
          <div className="p-8 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-md max-w-md mx-auto space-y-3 animate-in fade-in zoom-in-95 duration-300">
            <CheckCircle2 className="w-8 h-8 text-pink-400 mx-auto" />
            <h3 className="text-xl font-light text-white">Inquiry Received</h3>
            <p className="text-xs text-white/70 font-light">
              Our studio liaisons will respond to <span className="font-mono text-white underline">{contactEmail}</span> within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleContactSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/20 focus:border-white/50 rounded-full text-white placeholder-white/40 text-sm focus:outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-[#05070D] font-medium text-xs uppercase tracking-widest hover:bg-white/90 active:scale-95 transition-all shadow-xl cursor-pointer whitespace-nowrap"
            >
              Request Access
            </button>
          </form>
        )}
      </section>

      {/* 6. Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6 sm:px-12 text-xs font-mono text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-white font-medium uppercase tracking-[0.2em] block">
              METROPOLIS ARCHIVE &middot; VERITAS AI
            </span>
            <p className="text-[11px] text-white/30">
              &copy; {new Date().getFullYear()} All rights reserved. Cinematic urban architectural studies.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-widest text-white/50">
            <button
              onClick={onOpenForensicStudio}
              className="hover:text-white transition-colors cursor-pointer"
            >
              AI Forensic Studio
            </button>
            <span>&middot;</span>
            <button
              onClick={onOpenWaitlist}
              className="hover:text-white transition-colors cursor-pointer"
            >
              VIP Waitlist
            </button>
            <span>&middot;</span>
            <a href="#top" className="hover:text-white transition-colors">
              Back To Top &uarr;
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
