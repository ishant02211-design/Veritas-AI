import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateWeightedAiScore,
  determineVerdict,
  calculateConfidence,
  generateSyntheticHash,
  analyzeVideoFrames,
  identifyGenerativeSignature,
  calculateVideoTemporalAnomaly,
} from './detector.ts';

test('calculateWeightedAiScore correctly weights image metrics', () => {
  const highSyntheticMetrics = {
    spectralAnomaly: 80,
    skinTextureSmoothing: 90,
    anatomicalAnomalies: 85,
    lightingPhysics: 70,
    edgeArtifacts: 60,
  };
  const score = calculateWeightedAiScore(highSyntheticMetrics, false);
  // (80*0.25) + (90*0.25) + (85*0.25) + (70*0.15) + (60*0.1) = 20 + 22.5 + 21.25 + 10.5 + 6 = 80.25 -> 80
  assert.equal(score, 80);
});

test('calculateWeightedAiScore includes temporal jitter for video', () => {
  const videoMetrics = {
    spectralAnomaly: 80,
    skinTextureSmoothing: 70,
    anatomicalAnomalies: 70,
    lightingPhysics: 60,
    edgeArtifacts: 50,
    temporalJitter: 90,
  };
  const score = calculateWeightedAiScore(videoMetrics, true);
  assert.ok(score >= 70 && score <= 80);
});

test('determineVerdict maps probability thresholds accurately', () => {
  assert.equal(determineVerdict(92), 'Likely AI-Generated');
  assert.equal(determineVerdict(70), 'Likely AI-Generated');
  assert.equal(determineVerdict(60), 'Suspicious Synthetic Media');
  assert.equal(determineVerdict(45), 'Suspicious Synthetic Media');
  assert.equal(determineVerdict(35), 'Inconclusive / Mixed');
  assert.equal(determineVerdict(15), 'Authentic Camera Capture');
});

test('calculateConfidence returns bounded high confidence for clear indicators', () => {
  const metrics = {
    spectralAnomaly: 90,
    skinTextureSmoothing: 95,
    anatomicalAnomalies: 88,
    lightingPhysics: 92,
    edgeArtifacts: 85,
  };
  const confidence = calculateConfidence(metrics);
  assert.ok(confidence >= 80 && confidence <= 99);
});

test('generateSyntheticHash produces consistent formatted hash', () => {
  const hash1 = generateSyntheticHash('image-sample-123.jpg');
  const hash2 = generateSyntheticHash('image-sample-123.jpg');
  assert.equal(hash1, hash2);
  assert.ok(hash1.startsWith('0x'));
});

test('analyzeVideoFrames creates timeline of frames with timestamps', () => {
  const frames = analyzeVideoFrames(30, 85);
  assert.equal(frames.length, 30);
  assert.equal(frames[0].frameIndex, 0);
  assert.equal(frames[0].timestamp, 0);
  assert.ok(frames.some((f) => f.isSpike));
});

test('identifyGenerativeSignature identifies Midjourney and Video generators', () => {
  const mjMetrics = {
    spectralAnomaly: 60,
    skinTextureSmoothing: 85,
    anatomicalAnomalies: 50,
    lightingPhysics: 80,
    edgeArtifacts: 40,
  };
  const sig = identifyGenerativeSignature(mjMetrics, 'image');
  assert.ok(sig.includes('Midjourney'));

  const videoMetrics = {
    ...mjMetrics,
    temporalJitter: 80,
  };
  const videoSig = identifyGenerativeSignature(videoMetrics, 'video');
  assert.ok(videoSig.includes('Sora') || videoSig.includes('Runway'));
});

test('calculateVideoTemporalAnomaly distinguishes smooth optical motion from erratic synthetic morphing', () => {
  // Smooth natural camera pan (consistent low variance in deltas)
  const naturalDeltas = [12, 13, 11, 14, 12, 13, 12, 14, 13, 12];
  const naturalResult = calculateVideoTemporalAnomaly(naturalDeltas);
  assert.equal(naturalResult.isSynthetic, false);
  assert.ok(naturalResult.jitterScore < 45);

  // Generative AI video with sudden morphing spikes
  const syntheticDeltas = [10, 12, 85, 14, 11, 92, 15, 13, 78, 12];
  const syntheticResult = calculateVideoTemporalAnomaly(syntheticDeltas);
  assert.equal(syntheticResult.isSynthetic, true);
  assert.ok(syntheticResult.jitterScore >= 60);
  assert.ok(syntheticResult.anomalySpikeCount >= 2);
});

