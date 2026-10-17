import React from "react";
import { ShieldCheck, Download, Printer, X, FileText, CheckCircle2, AlertOctagon, Share2, Sparkles } from "lucide-react";
import { DetectionResult } from "../lib/detector";

interface ForensicReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DetectionResult;
  mediaName: string;
}

export default function ForensicReportModal({
  isOpen,
  onClose,
  result,
  mediaName,
}: ForensicReportModalProps) {
  if (!isOpen) return null;

  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Veritas-Forensics-${result.hash.slice(2, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const printReport = () => {
    window.print();
  };

  const isAi = result.aiProbability >= 70;
  const isSuspicious = result.aiProbability >= 45 && result.aiProbability < 70;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-zinc-100 space-y-6">
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Forensic Inspection Certificate
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                VERITAS SYNTHETIC MEDIA AUTHENTICATION &middot; SHA-256 AUDIT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Seal & Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
          <div className="sm:col-span-2 space-y-2">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Primary Forensic Finding
            </span>
            <div className="flex items-center gap-2">
              {isAi ? (
                <AlertOctagon className="w-7 h-7 text-pink-500" />
              ) : (
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              )}
              <h3 className="text-2xl font-extrabold tracking-tight text-white">
                {result.verdict}
              </h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {result.executiveSummary}
            </p>
          </div>

          <div className="flex flex-col justify-center items-center p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80 text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
              AI Likelihood Score
            </span>
            <span
              className={`text-4xl font-extrabold font-mono ${
                isAi ? "text-pink-400" : isSuspicious ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              {result.aiProbability}%
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              Confidence Index: {result.confidence}%
            </span>
          </div>
        </div>

        {/* Audit Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/60">
          <div>
            <span className="text-zinc-500">File Identifier:</span>
            <p className="text-zinc-200 font-bold truncate">{mediaName}</p>
          </div>
          <div>
            <span className="text-zinc-500">Suspected Engine / Origin:</span>
            <p className="text-pink-300 font-bold">{result.suspectedModel}</p>
          </div>
          <div>
            <span className="text-zinc-500">Media Hash:</span>
            <p className="text-zinc-300 truncate">{result.hash}</p>
          </div>
          <div>
            <span className="text-zinc-500">Audit Timestamp:</span>
            <p className="text-zinc-300">{result.analyzedAt}</p>
          </div>
        </div>

        {/* Detailed Metrics Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Forensic Vector Breakdown
          </h4>
          <div className="space-y-2">
            {[
              {
                label: "Spectral / Fourier Anomaly (High Frequency Latent Grid)",
                value: result.metrics.spectralAnomaly,
              },
              {
                label: "Micro-dermal Texture & Skin Smoothing",
                value: result.metrics.skinTextureSmoothing,
              },
              {
                label: "Anatomical & Facial Geometry Integrity",
                value: result.metrics.anatomicalAnomalies,
              },
              {
                label: "Optical Physics & Cast Shadow Consistency",
                value: result.metrics.lightingPhysics,
              },
              {
                label: "Boundary Blending & Edge Halo Artifacts",
                value: result.metrics.edgeArtifacts,
              },
              ...(result.metrics.temporalJitter !== undefined
                ? [
                    {
                      label: "Temporal Motion Stability & Latent Jitter",
                      value: result.metrics.temporalJitter,
                    },
                  ]
                : []),
            ].map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300">{metric.label}</span>
                  <span className="font-mono text-zinc-200 font-bold">{metric.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      metric.value > 65
                        ? "bg-pink-500"
                        : metric.value > 40
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    }`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forensic Observations */}
        {result.observations && result.observations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Verified Forensic Indicators
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
              {result.observations.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800">
          <div className="text-[11px] text-zinc-500 font-mono">
            Cryptographically sealed by Veritas Forensic Engine
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={downloadJson}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON Audit</span>
            </button>
            <button
              onClick={printReport}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
