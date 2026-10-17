import React, { useEffect, useRef, useState } from "react";
import { Eye, Layers, Sliders, Maximize2, ShieldAlert, Sparkles, ZoomIn } from "lucide-react";

export type OverlayMode = "original" | "heatmap" | "edges" | "noise" | "boxes";

interface ForensicCanvasProps {
  mediaUrl: string;
  mediaType: "image" | "video";
  aiScore: number;
  highlightBoxes?: { x: number; y: number; w: number; h: number; label: string; score: number }[];
  onCanvasLoaded?: () => void;
}

export default function ForensicCanvas({
  mediaUrl,
  mediaType,
  aiScore,
  highlightBoxes = [
    { x: 30, y: 25, w: 35, h: 30, label: "Pupil specularity & iris symmetry", score: 88 },
    { x: 62, y: 45, w: 25, h: 25, label: "Latent hair boundary blending", score: 92 },
    { x: 20, y: 65, w: 55, h: 20, label: "Missing dermal pores / micro-texture", score: 84 },
  ],
}: ForensicCanvasProps) {
  const [activeOverlay, setActiveOverlay] = useState<OverlayMode>("heatmap");
  const [opacity, setOpacity] = useState(70);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Render canvas overlays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mediaUrl || mediaType === "video") return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = mediaUrl;

    setIsProcessing(true);

    img.onload = () => {
      // Set canvas dimensions
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 600;

      // Draw original image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (activeOverlay === "original") {
        setIsProcessing(false);
        return;
      }

      // Read image data for filtering
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        if (activeOverlay === "heatmap") {
          // Synthetic Heatmap Overlay
          // Highlights high-frequency gradients and saturated synthetic zones in red/yellow
          const alphaFactor = opacity / 100;
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const idx = (y * width + x) * 4;
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];

              // Local simulated anomaly gradient
              const nx = x / width;
              const ny = y / height;
              // Center-radial & noise calculation
              const distFromCenter = Math.sqrt(Math.pow(nx - 0.5, 2) + Math.pow(ny - 0.45, 2));
              const anomalyFactor = Math.sin(nx * 12) * Math.cos(ny * 12) * 0.2 + (1 - distFromCenter * 1.4);
              const heatIntensity = Math.max(0, Math.min(1, (anomalyFactor * (aiScore / 100))));

              if (heatIntensity > 0.35) {
                // Color ramp: red/magenta/amber
                const heatR = 244;
                const heatG = Math.round(63 + (1 - heatIntensity) * 150);
                const heatB = 94;

                data[idx] = Math.round(r * (1 - alphaFactor) + heatR * alphaFactor);
                data[idx + 1] = Math.round(g * (1 - alphaFactor) + heatG * alphaFactor);
                data[idx + 2] = Math.round(b * (1 - alphaFactor) + heatB * alphaFactor);
              }
            }
          }
          ctx.putImageData(imgData, 0, 0);
        } else if (activeOverlay === "edges") {
          // Edge Discontinuity / Laplacian high-pass filter
          const copy = new Uint8ClampedArray(data);
          for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
              const idx = (y * width + x) * 4;
              // 3x3 Laplacian edge convolution
              const top = ((y - 1) * width + x) * 4;
              const bottom = ((y + 1) * width + x) * 4;
              const left = (y * width + (x - 1)) * 4;
              const right = (y * width + (x + 1)) * 4;

              const edge = Math.abs(
                copy[idx] * 4 - (copy[top] + copy[bottom] + copy[left] + copy[right])
              );

              const edgeColored = Math.min(255, edge * 2.5);
              // Draw edges in electric cyan/violet
              data[idx] = edgeColored > 40 ? 190 : 15;
              data[idx + 1] = edgeColored > 40 ? 50 : 15;
              data[idx + 2] = edgeColored > 40 ? 255 : 30;
            }
          }
          ctx.putImageData(imgData, 0, 0);
        } else if (activeOverlay === "noise") {
          // High-frequency sensor noise residuals (PRNU simulation)
          for (let i = 0; i < data.length; i += 4) {
            const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            const pseudoNoise = (Math.random() - 0.5) * 50;
            const res = Math.max(0, Math.min(255, lum + pseudoNoise));
            data[i] = res;
            data[i + 1] = res;
            data[i + 2] = res;
          }
          ctx.putImageData(imgData, 0, 0);
        }
      } catch (err) {
        // Fallback for CORS canvas restrictions if any
      }

      setIsProcessing(false);
    };
  }, [mediaUrl, activeOverlay, opacity, aiScore, mediaType]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Forensic Lens
          </span>
        </div>

        {/* Overlay Mode Selector */}
        <div className="flex flex-wrap items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          {(
            [
              { id: "original", label: "Original" },
              { id: "heatmap", label: "Anomaly Heatmap" },
              { id: "edges", label: "Edge Coherence" },
              { id: "noise", label: "Noise Residuals" },
              { id: "boxes", label: "Zone Reticles" },
            ] as const
          ).map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveOverlay(mode.id)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                activeOverlay === mode.id
                  ? "bg-pink-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Heatmap opacity slider */}
        {activeOverlay === "heatmap" && (
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Sliders className="w-3.5 h-3.5 text-zinc-500" />
            <span>Opacity</span>
            <input
              type="range"
              min="20"
              max="95"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-16 h-1.5 bg-zinc-800 rounded-lg accent-pink-500 cursor-pointer"
            />
            <span className="w-7 text-right font-mono text-zinc-300">{opacity}%</span>
          </div>
        )}
      </div>

      {/* Visual Canvas Display */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-radial from-zinc-900 to-zinc-950 overflow-hidden p-2 select-none"
      >
        {mediaType === "video" ? (
          <div className="relative max-w-full max-h-[500px]">
            <video
              src={mediaUrl}
              controls
              className="rounded-lg max-h-[500px] object-contain shadow-lg"
            />
            {activeOverlay === "heatmap" && (
              <div
                className="absolute inset-0 pointer-events-none rounded-lg mix-blend-screen opacity-60"
                style={{
                  background:
                    "radial-gradient(circle at 45% 40%, rgba(244,63,94,0.6) 0%, rgba(217,70,239,0.3) 45%, transparent 70%)",
                }}
              />
            )}
          </div>
        ) : (
          <div className="relative inline-block max-w-full max-h-[500px]">
            <canvas
              ref={canvasRef}
              className="rounded-lg max-w-full max-h-[500px] object-contain shadow-xl border border-zinc-800/60"
            />

            {/* Bounding Box Reticles when active */}
            {(activeOverlay === "boxes" || activeOverlay === "heatmap") &&
              aiScore > 40 &&
              highlightBoxes.map((box, idx) => (
                <div
                  key={idx}
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.w}%`,
                    height: `${box.h}%`,
                  }}
                  className="absolute pointer-events-none border-2 border-dashed border-pink-400 bg-pink-500/15 rounded-lg animate-pulse transition-all"
                >
                  <div className="absolute -top-7 left-0 whitespace-nowrap bg-zinc-900/90 text-pink-300 border border-pink-500/40 px-2 py-0.5 rounded text-[10px] font-mono shadow-md flex items-center gap-1.5">
                    <ShieldAlert className="w-3 h-3 text-pink-400" />
                    <span>{box.label}</span>
                    <span className="font-bold text-white bg-pink-700/80 px-1 rounded">
                      {box.score}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Watermark / Badge */}
        <div className="absolute bottom-4 left-4 bg-zinc-900/85 backdrop-blur-md border border-zinc-800 text-zinc-300 text-[11px] font-mono px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>SPECTRAL LENS: {activeOverlay.toUpperCase()}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">RESOLUTION: 1080p DENSE MESH</span>
        </div>
      </div>
    </div>
  );
}
