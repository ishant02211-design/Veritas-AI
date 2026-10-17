import React, { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, AlertTriangle, CheckCircle, Video, Activity, Sparkles } from "lucide-react";
import { VideoFrameAnalysis } from "../lib/detector";

interface VideoTimelineAnalyzerProps {
  frames: VideoFrameAnalysis[];
  videoUrl: string;
  onSelectFrame?: (frame: VideoFrameAnalysis) => void;
}

export default function VideoTimelineAnalyzer({
  frames,
  videoUrl,
  onSelectFrame,
}: VideoTimelineAnalyzerProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentFrame = frames[currentFrameIndex] || frames[0] || {
    frameIndex: 0,
    timestamp: 0,
    aiProbability: 50,
    isSpike: false,
    notes: "Analyzing video frame...",
  };

  const peakAnomalyFrame = [...frames].sort((a, b) => b.aiProbability - a.aiProbability)[0];

  const handleSeek = (index: number) => {
    setCurrentFrameIndex(index);
    if (onSelectFrame && frames[index]) {
      onSelectFrame(frames[index]);
    }
  };

  return (
    <div className="bg-zinc-900/90 rounded-2xl border border-zinc-800 p-5 shadow-2xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-pink-400" />
          <h3 className="text-base font-semibold text-white">Temporal Frame-by-Frame Forensics</h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-400">Total Frames Analyzed:</span>
          <span className="font-mono text-pink-300 font-bold bg-pink-950/60 border border-pink-800/50 px-2 py-0.5 rounded">
            {frames.length} Keyframes
          </span>
          {peakAnomalyFrame && (
            <button
              onClick={() => handleSeek(peakAnomalyFrame.frameIndex)}
              className="px-2.5 py-1 bg-red-950/70 hover:bg-red-900 border border-red-700/60 text-red-200 text-xs rounded-lg transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span>Jump to Peak Anomaly (Frame #{peakAnomalyFrame.frameIndex})</span>
            </button>
          )}
        </div>
      </div>

      {/* Frame Anomaly Timeline Bar Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
          <span>0.00s</span>
          <span className="text-zinc-500">TEMPORAL DRIFT & LATENT MORPHING GRAPH</span>
          <span>{((frames.length - 1) / 24).toFixed(2)}s</span>
        </div>

        <div className="h-28 bg-zinc-950 rounded-xl p-3 border border-zinc-800/80 flex items-end gap-1 overflow-x-auto relative">
          {/* Threshold guide line */}
          <div className="absolute top-[30%] left-0 right-0 border-b border-dashed border-red-500/40 pointer-events-none z-0" />
          <div className="absolute top-[60%] left-0 right-0 border-b border-dashed border-amber-500/30 pointer-events-none z-0" />

          {frames.map((frame) => {
            const isSelected = frame.frameIndex === currentFrameIndex;
            const heightPercent = frame.aiProbability;
            const isHigh = frame.aiProbability >= 70;
            const isMedium = frame.aiProbability >= 45 && frame.aiProbability < 70;

            return (
              <button
                key={frame.frameIndex}
                onClick={() => handleSeek(frame.frameIndex)}
                title={`Frame #${frame.frameIndex} (${frame.timestamp}s): ${frame.aiProbability}% AI Probability`}
                className={`flex-1 min-w-[8px] sm:min-w-[12px] rounded-t transition-all relative group cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-white scale-y-105 z-10"
                    : "hover:opacity-100 opacity-80"
                } ${
                  isHigh
                    ? "bg-gradient-to-t from-red-600 to-pink-500"
                    : isMedium
                    ? "bg-gradient-to-t from-amber-600 to-yellow-400"
                    : "bg-gradient-to-t from-emerald-600 to-teal-400"
                }`}
                style={{ height: `${heightPercent}%` }}
              >
                {frame.isSpike && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Frame Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-zinc-950/80 rounded-xl border border-zinc-800 text-sm">
        <div className="space-y-1">
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
            Scrubbed Position
          </span>
          <div className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <span>Frame #{currentFrame.frameIndex}</span>
            <span className="text-xs text-zinc-400 font-normal">({currentFrame.timestamp}s)</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
            Frame AI Probability
          </span>
          <div className="text-lg font-bold font-mono flex items-center gap-2">
            <span
              className={
                currentFrame.aiProbability >= 70
                  ? "text-red-400"
                  : currentFrame.aiProbability >= 45
                  ? "text-amber-400"
                  : "text-emerald-400"
              }
            >
              {currentFrame.aiProbability}%
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
              {currentFrame.aiProbability >= 70
                ? "Synthetic Artifact"
                : currentFrame.aiProbability >= 45
                ? "Suspicious"
                : "Natural Optical"}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-mono">
            Forensic Observation
          </span>
          <div className="text-xs text-zinc-300 font-sans line-clamp-2">
            {currentFrame.notes}
          </div>
        </div>
      </div>
    </div>
  );
}
