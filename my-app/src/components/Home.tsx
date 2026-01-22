'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  ShieldCheck, Zap, Lock, ArrowRight, 
  Sparkles, Sun, Moon, Star, ChevronDown, 
  MessageSquare, Users, Shield, Ghost 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FullHomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-700 font-sans ${isDark ? 'bg-[#030712] text-white' : 'bg-white text-slate-900'}`}>
      
      {/* --- 1. FLOATING THEME TOGGLE --- */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full w-14 h-14 shadow-2xl backdrop-blur-xl border-white/20 transition-all hover:scale-110 active:scale-95`}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
          {isDark ? <Sun className="text-yellow-400 w-6 h-6" /> : <Moon className="text-blue-600 w-6 h-6" />}
        </Button>
      </div>

      {/* --- 2. DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className={`absolute top-0 w-full h-[1000px] ${isDark ? 'bg-gradient-to-b from-blue-600/10 via-transparent to-transparent' : 'bg-gradient-to-b from-blue-50 to-transparent'}`} />
        {isDark && (
          <div className="absolute inset-0 bg-[url('https://youtu.be/OgS1ZWZItno?si=cRvaeZfsvbqt4i03')] opacity-20 brightness-100 contrast-150" />
        )}
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,${isDark ? '#80808012' : '#00000005'}_1px,transparent_1px),linear-gradient(to_bottom,${isDark ? '#80808012' : '#00000005'}_1px,transparent_1px)] bg-[size:40px_40px]`} />
      </div>

      {/* --- 3. HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex flex-col items-center">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2 px-6 py-2 rounded-full mb-10 border shadow-sm ${isDark ? 'bg-white/5 border-white/10 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'}`}
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-black uppercase tracking-[0.2em]">MysticMsg v2.0 is Live</span>
          </motion.div>

          <motion.h1 
            {...fadeInUp}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] lg:max-w-5xl mx-auto"
          >
            Honest Talk. <br />
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-white via-blue-400 to-white/40' : 'from-blue-600 via-indigo-600 to-purple-600'}`}>
              Zero Labels.
            </span>
          </motion.h1>

          <motion.p 
            {...fadeInUp}
            className={`max-w-2xl mx-auto text-lg md:text-2xl mb-12 font-medium leading-relaxed opacity-70`}
          >
            Share your secret link, receive anonymous messages, and discover what people truly think about you. No tracking, no drama.
          </motion.p>
          
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashbord">
              <Button size="lg" className={`h-20 px-12 rounded-[2rem] text-xl font-black transition-all shadow-2xl ${isDark ? 'bg-white text-black hover:bg-blue-50 hover:-translate-y-2' : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'}`}>
                Start Now — Free <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Link href={'/dkh'}>
            <Button variant="outline" className="h-20 px-10 rounded-[2rem] text-lg font-bold border-slate-200 dark:border-white/10">
               Here Are Demo Videos Section.
            </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- 4. STATS BAR --- */}
      <section className="py-20 container mx-auto px-6">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-[3.5rem] border ${isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-100 shadow-xl shadow-slate-200/50'}`}>
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <h4 className="text-4xl md:text-5xl font-black mb-1">{s.val}</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. FEATURES SECTION --- */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Purely Anonymous.</h2>
          <p className="opacity-50 text-lg">We've built the most secure feedback ecosystem on the planet.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15 }}
              className={`p-12 rounded-[3rem] border transition-all duration-500 ${isDark ? 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]' : 'bg-white border-slate-100 shadow-2xl shadow-slate-100'}`}
            >
              <div className={`mb-8 p-5 w-fit rounded-3xl ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-600 text-white shadow-lg shadow-blue-200'}`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{f.title}</h3>
              <p className="text-base leading-relaxed opacity-60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 6. TESTIMONIALS --- */}
      <section className={`py-32 ${isDark ? 'bg-blue-600/[0.03]' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter max-w-md">Loved by Creators Worldwide.</h2>
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold">
              <Star className="w-5 h-5 fill-primary" /> 4.9/5 Rating
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-[#0a0f1d] border-white/5' : 'bg-white border-slate-100 shadow-md'}`}>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-lg font-medium mb-8 italic opacity-80">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient}`} />
                  <div>
                    <h5 className="font-black text-sm">{t.user}</h5>
                    <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 7. FAQ SECTION --- */}
      <section className="py-32 container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-black text-center mb-16 tracking-tighter">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`p-8 rounded-3xl border cursor-pointer group transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:border-blue-400'}`}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold">{faq.q}</h4>
                <ChevronDown className="w-6 h-6 opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 8. FINAL CTA --- */}
      <section className="py-40 container mx-auto px-6 text-center">
        <motion.div 
          whileInView={{ scale: [0.95, 1] }}
          className={`p-16 md:p-24 rounded-[4rem] relative overflow-hidden ${isDark ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-20 -mt-20" />
          <h2 className="text-5xl md:text-7xl font-black mb-10 relative z-10 leading-tight">Ready to dive in? <br /> It's 100% free.</h2>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary" className="h-20 px-16 rounded-full text-2xl font-black hover:scale-110 transition-transform relative z-10 shadow-2xl">
              Create Your Ghost Profile
            </Button>
          </Link>
          <p className="mt-8 opacity-60 font-medium italic">Join 50,000+ users today</p>
        </motion.div>
      </section>

      {/* --- 9. FOOTER --- */}
      
    </div>
  );
}

// --- DATA ---
const stats = [
  { val: "12M+", label: "Messages Sent" },
  { val: "500K+", label: "Daily Users" },
  { val: "0", label: "Data Leaks" },
  { val: "100%", label: "Anonymity" },
];

const features = [
  { title: "Ghost Mode", desc: "No cookies, no IP tracking, no digital footprint. You are truly a ghost on our platform.", icon: <Lock className="w-10 h-10" /> },
  { title: "Nitro Delivery", desc: "Built on Global Edge Nodes. Messages deliver faster than a blink, no matter where you are.", icon: <Zap className="w-10 h-10" /> },
  { title: "SafeSpace AI", desc: "Our advanced neural filters detect and block bullying before it even reaches your inbox.", icon: <ShieldCheck className="w-10 h-10" /> }
];

const testimonials = [
  { user: "Aman Gupta", role: "Influencer", text: "MysticMsg changed how I interact with my fans. Honest feedback is a superpower!", gradient: "from-blue-400 to-indigo-500" },
  { user: "Priya Singh", role: "Student", text: "The UI is so clean! It's the only anonymous app that doesn't feel creepy.", gradient: "from-purple-400 to-pink-500" },
  { user: "Rohan X.", role: "Developer", text: "The security here is top-notch. Finally, an app that respects my privacy.", gradient: "from-green-400 to-cyan-500" },
];

const faqs = [
  { q: "Is my identity really hidden?" },
  { q: "Can I block specific people?" },
  { q: "How do I add the link to my Bio?" },
  { q: "Is MysticMsg free forever?" },
];