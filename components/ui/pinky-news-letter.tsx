import React, { useState } from "react";
import { Warp } from "@paper-design/shaders-react";
import { ArrowRight, CheckCircle2, Mail, Sparkles, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

export interface NewsLetterProps {
  title?: string;
  subtitle?: string;
  description?: string;
  placeholder?: string;
  onSubscribe?: (email: string) => Promise<boolean | void> | boolean | void;
  className?: string;
  badgeText?: string;
}

export default function NewsLetter({
  title = "Coming Soon",
  subtitle = "Veritas AI Forensics v2.0",
  description = "Don't miss out on the latest news and special content!\nSign up for our newsletter now and stay in the loop with every update.",
  placeholder = "Enter your email",
  onSubscribe,
  className = "",
  badgeText = "Next-Gen Deepfake & Synthetic Media Detection",
}: NewsLetterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      if (onSubscribe) {
        await onSubscribe(email);
      } else {
        // Default API call or simulation
        try {
          await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
        } catch {
          // Fallback if offline
        }
      }

      setStatus("success");
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ec4899", "#f43f5e", "#d946ef", "#fda4af"],
        });
      } catch {
        // Confetti fallback
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err?.message || "Failed to subscribe. Please try again.");
    }
  };

  return (
    <main className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Background shader */}
      <div className="absolute inset-0 pointer-events-none">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={[
            "hsl(340, 100%, 20%)",
            "hsl(320, 100%, 75%)",
            "hsl(350, 90%, 30%)",
            "hsl(330, 100%, 80%)",
          ]}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="max-w-2xl w-full text-center space-y-8 bg-black/20 p-8 sm:p-12 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-xs sm:text-sm font-medium tracking-wide shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-pink-200 animate-pulse" />
              <span>{badgeText}</span>
            </div>
          )}

          <div className="space-y-2">
            <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-sans font-light italic tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-pink-200/90 text-sm sm:text-base font-mono uppercase tracking-widest">
                {subtitle}
              </p>
            )}
          </div>

          {/* Email input with submit button */}
          {status === "success" ? (
            <div className="p-6 rounded-2xl bg-white/20 border border-white/40 text-white backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center justify-center gap-3 mb-2">
                <CheckCircle2 className="w-7 h-7 text-green-300" />
                <h3 className="text-2xl font-semibold">You're on the VIP list!</h3>
              </div>
              <p className="text-white/90 text-sm sm:text-base font-light">
                We'll email <span className="font-semibold underline text-pink-100">{email}</span> the moment the real-time deepfake video stream inspection API launches.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setEmail("");
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                Register another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-2">
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  disabled={status === "loading"}
                  aria-label="Email address for newsletter"
                  className="w-full pl-14 pr-20 py-4 text-base sm:text-lg bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/70 focus:border-white/70 transition-all duration-300 shadow-lg disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 group shadow-md disabled:hover:scale-100 cursor-pointer"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 text-gray-800 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-gray-800 group-hover:translate-x-0.5 transition-transform duration-300" />
                  )}
                </button>
              </div>

              {status === "error" && (
                <p className="text-red-200 text-sm font-medium bg-red-900/40 py-1.5 px-4 rounded-full inline-block backdrop-blur-sm border border-red-300/30">
                  {errorMessage}
                </p>
              )}
            </form>
          )}

          {/* Description text */}
          <p className="text-white/90 text-base sm:text-lg font-sans font-light leading-relaxed whitespace-pre-line">
            {description}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Early Access API Keys
            </span>
            <span>Zero Spam Policy</span>
            <span>Netlify & Cloud Deployable</span>
          </div>
        </div>
      </div>
    </main>
  );
}
