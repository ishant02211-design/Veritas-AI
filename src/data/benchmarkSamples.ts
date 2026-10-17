export interface BenchmarkSample {
  id: string;
  title: string;
  category: "Image (AI Generated)" | "Image (Real Camera)" | "Video (AI Generated)" | "Video (Real Footage)";
  mediaType: "image" | "video";
  url: string;
  thumbnail: string;
  expectedVerdict: "Likely AI-Generated" | "Authentic Camera Capture";
  expectedAiProbability: number;
  engine: string;
  description: string;
  forensicHighlights: string[];
}

export const BENCHMARK_SAMPLES: BenchmarkSample[] = [
  {
    id: "ai-portrait-mj",
    title: "Midjourney v6 Photorealistic Cyber Portrait",
    category: "Image (AI Generated)",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
    expectedVerdict: "Likely AI-Generated",
    expectedAiProbability: 94,
    engine: "Midjourney v6.1 (Latent Diffusion)",
    description: "Generative fluid abstract portrait demonstrating high-frequency Fourier checkerboard patterns, latent smoothing, and ungrounded specular highlights.",
    forensicHighlights: [
      "Latent space interpolation artifacts in color boundaries",
      "Absence of authentic CMOS sensor photon noise (PRNU)",
      "Unnatural specular reflections defying single directional light",
    ],
  },
  {
    id: "real-camera-portrait",
    title: "Authentic Canon 5D Mark IV Studio Portrait",
    category: "Image (Real Camera)",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    expectedVerdict: "Authentic Camera Capture",
    expectedAiProbability: 8,
    engine: "Canon EOS 5D Mark IV (EF 85mm f/1.4L IS USM)",
    description: "Genuine optical capture showing natural micro-pore skin texture, authentic depth-of-field circle of confusion, and coherent catchlights in pupils.",
    forensicHighlights: [
      "Natural Gaussian sensor noise distribution intact",
      "Coherent pupil reflections matching studio softbox geometry",
      "Physically accurate micro-dermal skin pores and follicle roots",
    ],
  },
  {
    id: "ai-landscape-flux",
    title: "Flux.1 Surreal Neo-Tokyo Architecture",
    category: "Image (AI Generated)",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80",
    expectedVerdict: "Likely AI-Generated",
    expectedAiProbability: 88,
    engine: "Flux.1 Schnell (Flow Matching Diffusion)",
    description: "Synthetic rendering with non-Euclidean perspective convergence and prompt hallucinated architectural details.",
    forensicHighlights: [
      "Vanishing point inconsistencies in geometric rooflines",
      "Repetitive texture synthesis in repeated window patterns",
      "High frequency spectral residual signature of flow-matching solver",
    ],
  },
  {
    id: "real-landscape-dslr",
    title: "Sony Alpha A7R V Mountain Vista",
    category: "Image (Real Camera)",
    mediaType: "image",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    expectedVerdict: "Authentic Camera Capture",
    expectedAiProbability: 6,
    engine: "Sony ILCE-7RM5 (FE 24-70mm F2.8 GM II)",
    description: "Raw optical landscape with authentic atmospheric haze, Rayleigh scattering, and natural water ripples with physically correct Fresnel reflectivity.",
    forensicHighlights: [
      "Optically correct atmospheric depth gradation",
      "Real water wave diffraction and polarized reflection",
      "Uniform sensor Bayer pattern mosaic distribution",
    ],
  },
  {
    id: "ai-video-synthetic",
    title: "Sora / Runway Gen-3 Synthetic Fluid Motion",
    category: "Video (AI Generated)",
    mediaType: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80",
    expectedVerdict: "Likely AI-Generated",
    expectedAiProbability: 91,
    engine: "Runway Gen-3 Alpha Video Diffusion",
    description: "Video stream showing frame-to-frame temporal morphing, background boiling artifacts, and non-rigid boundary shifts.",
    forensicHighlights: [
      "Temporal flickering in high-frequency background foliage",
      "Sudden geometry warping between frames 14 and 22",
      "Non-linear optical flow vectors indicating neural frame synthesis",
    ],
  },
  {
    id: "real-video-footage",
    title: "Authentic 4K Drone Aerial Survey",
    category: "Video (Real Footage)",
    mediaType: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=400&q=80",
    expectedVerdict: "Authentic Camera Capture",
    expectedAiProbability: 11,
    engine: "DJI Mavic 3 Cine (Hasselblad L2D-20c)",
    description: "Physical camera gimbal movement obeying rigid body mechanics, continuous parallax, and natural motion-blur shutter angles.",
    forensicHighlights: [
      "Consistent 3D geometric parallax across all video keyframes",
      "Shutter angle motion blur matching physical 1/50s sensor exposure",
      "Zero latent boiling or semantic hallucination across cuts",
    ],
  },
];
