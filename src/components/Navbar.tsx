import React from "react";
import { ShieldCheck, Video, Image as ImageIcon, Flame, BookOpen, Sparkles, Compass } from "lucide-react";

export type NavTab = "cinematic" | "studio" | "video-lab" | "benchmarks" | "newsletter" | "guide";

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenNewsletterModal: () => void;
}

export default function Navbar({
  activeTab,
  onTabChange,
  onOpenNewsletterModal,
}: NavbarProps) {
  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "cinematic", label: "Cinematic Hero", icon: Compass },
    { id: "studio", label: "Forensic Studio", icon: ImageIcon },
    { id: "video-lab", label: "Video Deepfake Lab", icon: Video },
    { id: "benchmarks", label: "Benchmark Gallery", icon: Flame },
    { id: "newsletter", label: "VIP Waitlist", icon: Sparkles },
    { id: "guide", label: "Deploy & Setup Guide", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => onTabChange("studio")}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 p-0.5 shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-pink-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-base sm:text-lg">
                VERITAS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold uppercase">
                AI DETECT
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono hidden sm:block">
              Synthetic Media & Deepfake Forensics
            </p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-pink-400" : "text-zinc-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewsletterModal}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold shadow-md shadow-pink-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-100" />
            <span className="hidden sm:inline">VIP Waitlist</span>
            <span className="sm:hidden">VIP</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center justify-around px-2 py-2 border-t border-zinc-800/80 bg-zinc-950/90 overflow-x-auto text-xs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                isActive ? "text-pink-400 font-bold" : "text-zinc-400"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
