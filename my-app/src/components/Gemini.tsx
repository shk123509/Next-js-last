"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React from "react";
import { GoogleGeminiEffect } from "../components/ui/google-gemini-effect";

export default function EffectMood() {
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  // Content Animations - Modern Reveal
  const mainTitleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const mainTitleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const featureTextOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const featureTextScale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);

  return (
    <div
      className="h-[500vh] bg-black w-full relative overflow-clip"
      ref={ref}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        
        {/* Layer 1: Gemini Effect (Background) */}
        <div className="absolute inset-0 z-0">
          <GoogleGeminiEffect
            pathLengths={[
              pathLengthFirst,
              pathLengthSecond,
              pathLengthThird,
              pathLengthFourth,
              pathLengthFifth,
            ]}
          />
        </div>

        {/* Layer 2: Main Hero Title */}
        <motion.div 
          style={{ opacity: mainTitleOpacity, y: mainTitleY }}
          className="relative z-10 text-center px-6"
        >
          <h2 className="text-zinc-500 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4">
            The Future of Intelligence
          </h2>
          <h1 className="text-5xl md:text-8xl font-semibold text-white tracking-tight">
            Design at the speed <br /> of <span className="text-indigo-500">thought.</span>
          </h1>
        </motion.div>

        {/* Layer 3: Scroll-Reveal Description (Appears during animation) */}
        <motion.div 
          style={{ opacity: featureTextOpacity, scale: featureTextScale }}
          className="absolute z-20 text-center max-w-3xl px-6"
        >
          <h3 className="text-3xl md:text-5xl font-medium text-white mb-6">
            Precision in every pixel.
          </h3>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
            We've combined neural aesthetics with fluid motion to create 
            an interface that doesn't just respond—it understands.
          </p>
          
          {/* Subtle Stats or Labels */}
          <div className="flex justify-center gap-12 mt-12">
            <Stat label="Latency" value="0.02ms" />
            <Stat label="Precision" value="99.9%" />
            <Stat label="Uptime" value="100%" />
          </div>
        </motion.div>

      </div>

      {/* Bottom subtle indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  );
}

// Minimalist Stat Component
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-white font-mono text-xl mb-1">{value}</div>
      <div className="text-zinc-600 text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}