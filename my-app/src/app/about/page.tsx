"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShieldAlert, MessageSquare, Zap, Ghost, Lock, Heart, 
  EyeOff, Scale, Fingerprint, Globe, Users, Sparkles,
  ShieldCheck, Cpu, Database, Network, Key, Layers,
  TrendingUp, Anchor, Target, ZapOff, CheckCircle2
} from "lucide-react";

const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax effects for that 3D depth feel
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-slate-300 selection:bg-indigo-500/30 overflow-x-hidden font-sans">
      
      {/* --- SECTION 1: THE ATMOSPHERIC HERO --- */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
        
        <motion.div style={{ y: y1 }} className="absolute top-20 right-[15%] opacity-20 hidden lg:block">
          <Ghost size={300} strokeWidth={0.5} className="text-indigo-500" />
        </motion.div>

        <div className="relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, tracking: "0.2em" }}
            animate={{ opacity: 1, tracking: "0.5em" }}
            className="text-indigo-400 font-mono text-xs uppercase mb-6 block"
          >
            Encryption meets Empathy
          </motion.span>
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter text-white"
          >
            PURE <br /> <span className="text-indigo-600">VOICE.</span>
          </motion.h1>
          <p className="mt-8 text-slate-500 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            We didn't just build a messaging app. We built a mirror for humanity. 
            A decentralized, anonymous engine for radical growth.
          </p>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"
        >
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-indigo-500 to-transparent" />
        </motion.div>
      </section>

      {/* --- SECTION 2: THE PHILOSOPHY (The "Why") --- */}
      <section className="py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
        <div className="sticky top-32">
          <h2 className="text-5xl font-bold text-white mb-8">The Psychology <br /> of The Unseen.</h2>
          <p className="text-xl text-slate-400 mb-10 leading-loose">
            When you know who is watching, you perform. When you are anonymous, you <strong>exist</strong>. 
            Our platform removes the "Performance Bias" that plagues modern communication.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="p-3 bg-indigo-500/20 rounded-lg"><Target className="text-indigo-400" /></div>
              <div><h4 className="font-bold text-white">Focus on Content</h4><p className="text-sm">We judge ideas, not identities.</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="p-3 bg-purple-500/20 rounded-lg"><Anchor className="text-purple-400" /></div>
              <div><h4 className="font-bold text-white">Safety by Design</h4><p className="text-sm">Zero fear of professional or social fallout.</p></div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {[
            { title: "The Problem: The Filtered Self", content: "Most corporate and personal feedback is 60% 'politeness' and only 40% 'truth'. This gap is where companies fail and relationships rot.", icon: <ZapOff /> },
            { title: "The Solution: Pure Feedback", content: "By severing the link between identity and input, we allow for 100% honesty. This leads to 3x faster problem solving in teams.", icon: <CheckCircle2 /> },
            { title: "The Method: Zero-Knowledge", content: "We use cryptographic hashes so that even our engineers cannot trace a message back to you. Your privacy is protected by math, not just promises.", icon: <Fingerprint /> }
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 20 }}
              className="p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-slate-800 shadow-2xl"
            >
              <div className="text-indigo-500 mb-6">{card.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">{card.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: INTERACTIVE COMPARISON TABLE --- */}
      <section className="py-32 bg-indigo-600/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">How We Compare.</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 uppercase text-xs tracking-widest">
                  <th className="pb-6">Feature</th>
                  <th className="pb-6">Standard Social</th>
                  <th className="pb-6">Incognito Mode</th>
                  <th className="pb-6 text-indigo-400">Our Protocol</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ["Identity Privacy", "None", "Browser Only", "Military-Grade Hash"],
                  ["Data Tracking", "Aggressive", "Standard", "Zero-Log Policy"],
                  ["Message Encryption", "Standard", "Variable", "End-to-End PGP"],
                  ["Ad Targeting", "Yes", "Yes", "Never"],
                  ["Anonymity Guarantee", "0%", "20%", "100%"]
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-900 hover:bg-white/5 transition-colors">
                    <td className="py-6 font-medium text-white">{row[0]}</td>
                    <td className="py-6">{row[1]}</td>
                    <td className="py-6">{row[2]}</td>
                    <td className="py-6 text-indigo-400 font-bold">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: THE TECHNICAL DEEP-DIVE --- */}
      <section className="py-32 relative overflow-hidden">
        <motion.div style={{ y: y2 }} className="absolute -right-20 top-0 opacity-10">
          <Database size={600} />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 relative z-10">
          <div className="md:col-span-2">
            <h2 className="text-6xl font-black text-white mb-8 tracking-tighter">THE TECH <br /> BEHIND THE MASK.</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-indigo-400">01. SHA-512 Salting</h4>
                <p className="text-slate-400">Every user ID is passed through a multi-pass salt-and-hash algorithm, making reverse-engineering impossible.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-indigo-400">02. Ephemeral Sockets</h4>
                <p className="text-slate-400">Connection tokens expire every 15 minutes, ensuring that long-term session hijacking is a non-threat.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-indigo-400">03. Polymorphic UI</h4>
                <p className="text-sm text-slate-400 font-mono italic">"The UI adapts to your anonymity level, showing or hiding features based on your chosen privacy tier."</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-indigo-400">04. Distributed Nodes</h4>
                <p className="text-slate-400">Data is sharded across multiple global nodes, so no single government or entity can seize the database.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl flex flex-col justify-between">
            <div className="text-6xl font-bold text-white">99.9%</div>
            <div className="text-slate-400 uppercase tracking-widest text-xs">Encryption Uptime</div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm italic">"Security is not a feature; it's our entire existence. We don't just hide your data—we make it nonexistent to the prying eye."</p>
              <p className="mt-4 font-bold text-white">— CTO, Ghostly Protocol</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: GLOBAL IMPACT (Stats) --- */}
      <section className="py-32 border-y border-slate-900 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-12">
          {[
            { val: "50M+", label: "Messages" },
            { val: "180", label: "Countries" },
            { val: "0", label: "Data Breaches" },
            { val: "100%", label: "Privacy" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-6xl font-black text-white">{stat.val}</span>
              <span className="text-indigo-500 uppercase tracking-widest text-sm font-bold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 6: FAQ (Content Heavy) --- */}
      <section className="py-32 max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-16">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Can my employer find out who I am?", a: "No. Our enterprise version uses a 'blind-token' system where the employer only receives the data packet, with no link to the employee directory." },
            { q: "How do you handle illegal content?", a: "Our automated AI shield scans for keywords and patterns that violate international law before the message is hashed. We protect privacy, not crime." },
            { q: "Is the platform open source?", a: "The core encryption engine is open-source. We believe in 'Security through Transparency'—experts can verify our claims anytime." },
            { q: "How do you make money if you don't sell data?", a: "We operate on a 'Premium Anonymity' model. Power users and companies pay for advanced tools, but the privacy remains free for everyone." }
          ].map((faq, i) => (
            <details key={i} className="group border border-slate-800 bg-slate-900/50 rounded-2xl overflow-hidden">
              <summary className="p-6 text-xl font-bold text-white cursor-pointer list-none flex justify-between items-center group-open:bg-indigo-600 transition-colors">
                {faq.q}
                <span className="text-2xl font-light">{"+"}</span>
              </summary>
              <div className="p-8 text-slate-400 leading-relaxed bg-slate-900">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-40 text-center relative">
        <div className="absolute inset-0 bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="relative z-10 px-6">
          <h2 className="text-7xl font-black text-white mb-10 tracking-tighter">SAY THE <br /> UNSAYABLE.</h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-12 py-6 bg-indigo-600 text-white font-black rounded-full shadow-[0_0_40px_rgba(79,70,229,0.4)]"
          >
            CREATE YOUR SECRET KEY
          </motion.button>
          <p className="mt-8 text-slate-500 uppercase text-xs tracking-widest font-bold">No Email Required. No Credit Card. Just You.</p>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;