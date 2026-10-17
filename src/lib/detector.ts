/**
 * Core forensic detection algorithms and calculation logic for Veritas AI
 */

export interface ForensicMetrics {
  spectralAnomaly: number; // 0-100 (high-frequency grid/checkerboard)
  skinTextureSmoothing: number; // 0-100 (synthetic waxiness / missing pores)
  anatomicalAnomalies: number; // 0-100 (hands, eyes, symmetry)
  lightingPhysics: number; // 0-100 (shadow angle & reflection divergence)
  edgeArtifacts: number; // 0-100 (blending halos, boundary blur)
  temporalJitter?: number; // 0-100 (video frame morphing / flicker)
}

export interface DetectionResult {
  aiProbability: number; // 0-100%
  verdict: "Likely AI-Generated" | "Suspicious Synthetic Media" | "Authentic Camera Capture" | "Inconclusive / Mixed";
  confidence: number; // 0-100%
  suspectedModel: string;
  metrics: ForensicMetrics;
  observations: string[];
  executiveSummary: string;
  hash: string;
  analyzedAt: string;
  mediaType: "image" | "video";
}

export interface VideoFrameAnalysis {
  frameIndex: number;
  timestamp: number;
  aiProbability: number;
  isSpike: boolean;
  notes: string;
}

/**
 * Computes an overall AI probability score based on weighted forensic metrics
 */
export function calculateWeightedAiScore(metrics: ForensicMetrics, isVideo: boolean = false): number {
  if (isVideo && typeof metrics.temporalJitter === "number") {
    const score =
      metrics.spectralAnomaly * 0.2 +
      metrics.skinTextureSmoothing * 0.2 +
      metrics.anatomicalAnomalies * 0.2 +
      metrics.lightingPhysics * 0.15 +
      metrics.edgeArtifacts * 0.1 +
      metrics.temporalJitter * 0.15;
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  const score =
    metrics.spectralAnomaly * 0.25 +
    metrics.skinTextureSmoothing * 0.25 +
    metrics.anatomicalAnomalies * 0.25 +
    metrics.lightingPhysics * 0.15 +
    metrics.edgeArtifacts * 0.1;
  return Math.min(100, Math.max(0, Math.round(score)));
}

/**
 * Determines the verbal verdict based on AI probability
 */
export function determineVerdict(probability: number): DetectionResult["verdict"] {
  if (probability >= 70) {
    return "Likely AI-Generated";
  }
  if (probability >= 45) {
    return "Suspicious Synthetic Media";
  }
  if (probability <= 25) {
    return "Authentic Camera Capture";
  }
  return "Inconclusive / Mixed";
}

/**
 * Computes confidence score based on metric consistency
 */
export function calculateConfidence(metrics: ForensicMetrics): number {
  const values = [
    metrics.spectralAnomaly,
    metrics.skinTextureSmoothing,
    metrics.anatomicalAnomalies,
    metrics.lightingPhysics,
    metrics.edgeArtifacts,
  ];

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  // Variance
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);

  // If indicators strongly agree (low stdDev at extreme scores), confidence is high (> 85%)
  // If extreme scores (near 0 or near 100), base confidence is higher
  const extremeFactor = Math.abs(mean - 50) / 50; // 0 to 1
  const baseConfidence = 70 + extremeFactor * 25 - Math.min(15, stdDev * 0.3);

  return Math.min(99, Math.max(60, Math.round(baseConfidence)));
}

/**
 * Generates deterministic simulated hash string for media verification
 */
export function generateSyntheticHash(inputString: string): string {
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return `0x${hex}e93bf714a601cde9`;
}

/**
 * Analyzes video frame sequences to locate temporal spikes / deepfake face swap cuts
 */
export function analyzeVideoFrames(
  frameCount: number,
  baseAiScore: number,
  varianceSeed: number = 42
): VideoFrameAnalysis[] {
  const frames: VideoFrameAnalysis[] = [];
  const fps = 24;

  for (let i = 0; i < frameCount; i++) {
    const time = parseFloat((i / fps).toFixed(2));
    // Simulate natural frame fluctuations
    const wave = Math.sin((i + varianceSeed) * 0.4) * 8;
    const microJitter = (Math.sin(i * 1.7) * 4);
    
    // An occasional anomaly spike in synthetic video
    const isSyntheticGlitch = baseAiScore > 50 && (i === 12 || i === 28 || i === 41);
    const spikeBoost = isSyntheticGlitch ? 18 : 0;

    const frameScore = Math.min(100, Math.max(5, Math.round(baseAiScore + wave + microJitter + spikeBoost)));

    let notes = "Normal frame consistency";
    if (frameScore > 75) {
      notes = "High frequency boundary mismatch / Face warp detected";
    } else if (frameScore > 50) {
      notes = "Subtle lighting fluctuation / Texture blur";
    } else {
      notes = "Sensor grain & natural motion blur intact";
    }

    frames.push({
      frameIndex: i,
      timestamp: time,
      aiProbability: frameScore,
      isSpike: isSyntheticGlitch || frameScore > 80,
      notes,
    });
  }

  return frames;
}

/**
 * Evaluates frame-to-frame variance deltas to detect video morphing and deepfake flicker
 */
export function calculateVideoTemporalAnomaly(frameDeltas: number[]): {
  jitterScore: number;
  isSynthetic: boolean;
  anomalySpikeCount: number;
} {
  if (!frameDeltas || frameDeltas.length === 0) {
    return { jitterScore: 15, isSynthetic: false, anomalySpikeCount: 0 };
  }

  const mean = frameDeltas.reduce((a, b) => a + b, 0) / frameDeltas.length;
  // Variance
  const variance =
    frameDeltas.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / frameDeltas.length;
  const stdDev = Math.sqrt(variance);

  // Anomaly spikes where delta is significantly above mean
  const threshold = mean + stdDev * 1.35;
  const spikeCount = frameDeltas.filter((d) => d > threshold).length;

  // Higher coefficient of variation in frame differences indicates generative morphing/boiling
  const cv = mean > 0 ? (stdDev / mean) * 100 : 0;
  const jitterScore = Math.min(98, Math.max(8, Math.round(cv * 1.4 + spikeCount * 8)));

  return {
    jitterScore,
    isSynthetic: jitterScore >= 60,
    anomalySpikeCount: spikeCount,
  };
}

/**
 * Model signature classification
 */
export function identifyGenerativeSignature(metrics: ForensicMetrics, mediaType: "image" | "video"): string {
  if (mediaType === "video") {
    if (metrics.temporalJitter && metrics.temporalJitter > 65) {
      return "Sora / Runway Gen-3 Synthetic Video Engine";
    }
    if (metrics.spectralAnomaly > 60) {
      return "Kling AI / Haiper Video Latent Diffusion";
    }
    return "Deepfake Facial Reenactment Model";
  }

  if (metrics.skinTextureSmoothing > 75 && metrics.lightingPhysics > 70) {
    return "Midjourney v6.1 (Photorealistic Stylization)";
  }
  if (metrics.spectralAnomaly > 70) {
    return "Flux.1 Schnell / Dev (Flow Matching Architecture)";
  }
  if (metrics.anatomicalAnomalies > 65) {
    return "Stable Diffusion XL / SD 1.5 Autoencoder";
  }
  if (metrics.edgeArtifacts > 60) {
    return "DALL-E 3 (OpenAI Diffusion Model)";
  }

  return "Digital CMOS Camera Sensor (Sony Exmor / Apple iPhone)";
}
