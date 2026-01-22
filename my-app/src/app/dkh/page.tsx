"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { 
  ssr: false,
  loading: () => <div className="w-full aspect-video bg-zinc-900 animate-pulse rounded-[2rem]" />
});

export default function AIPlayerPage() {
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=DwJA67_zLKU");
  const [inputUrl, setInputUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const getAISummary = async () => {
    setLoading(true);
    setSummary("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setSummary("Error: Connection lost with AI.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 md:p-10 selection:bg-red-500">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-6xl font-black italic tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            VISION <span className="text-red-600">AI</span>
          </h1>
          <p className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase">Neural Analysis Dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Video Section */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black aspect-video">
              <ReactPlayer url={videoUrl} width="100%" height="100%" controls playing />
            </div>

            <div className="flex gap-2 p-2 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-2xl">
              <input 
                className="flex-1 bg-transparent px-4 outline-none text-sm font-medium"
                placeholder="Paste YouTube URL here..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <button 
                onClick={() => { setVideoUrl(inputUrl); setSummary(""); }}
                className="bg-white text-black font-black px-6 py-3 rounded-xl text-xs uppercase hover:bg-red-600 hover:text-white transition-all"
              >
                Inject
              </button>
            </div>
          </div>

          {/* AI Sidebar */}
          <div className="lg:col-span-4 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[50px] rounded-full" />
            
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 tracking-tighter">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              AI INTELLIGENCE
            </h2>

            <button 
              onClick={getAISummary}
              disabled={loading}
              className="w-full py-4 bg-red-600 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-red-500 transition-all disabled:opacity-50"
            >
              {loading ? "Scanning Data..." : "Ask AI Summary"}
            </button>

            <div className="mt-8 space-y-4">
              {summary ? (
                <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                  <p className="text-[10px] text-red-500 font-bold tracking-widest mb-2">GENERATED INSIGHT:</p>
                  <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-red-600 pl-4 py-1 italic font-medium">
                    {summary}
                  </p>
                </div>
              ) : (
                <div className="py-10 text-center opacity-20 italic text-xs tracking-widest">
                  System Idle. Ready for Input.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}