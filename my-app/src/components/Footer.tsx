'use client';

import React from 'react';
import { Ghost } from 'lucide-react';
import { useTheme } from 'next-themes';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`py-20 border-t ${
        isDark ? 'border-white/5 bg-[#010101]' : 'border-slate-100 bg-slate-50'
      } text-center md:text-left`}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-3xl font-black tracking-tighter flex items-center gap-2">
              <Ghost className="w-8 h-8 text-blue-500" /> MYSTICMSG.
            </h3>
            <p className="opacity-50 max-w-sm text-lg leading-relaxed font-medium">
              Providing a safe harbor for honest conversations since 2024. Your
              privacy is our only mission.
            </p>
          </div>

          <div>
            <h5 className="font-black uppercase tracking-widest text-xs mb-8 opacity-30">
              Legal
            </h5>
            <ul className="space-y-4 font-bold opacity-70">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Terms of Service
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Cookie Policy
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-black uppercase tracking-widest text-xs mb-8 opacity-30">
              Support
            </h5>
            <ul className="space-y-4 font-bold opacity-70">
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Help Center
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Contact Us
              </li>
              <li className="hover:text-blue-500 cursor-pointer transition-colors">
                Twitter (X)
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 text-[10px] font-black uppercase tracking-[0.5em]">
          <span>© 2026 MYSTICMSG — ALL RIGHTS RESERVED</span>
          <span>Made with ❤️ for the Internet</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
