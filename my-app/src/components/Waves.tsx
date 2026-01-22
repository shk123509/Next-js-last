"use client"
import React from 'react'
import { WavyBackground } from '@/components/ui/wavy-background'
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=3534&q=80",
  },
];

const Tooltips = () => {
  return (
    <section className='relative h-[40rem] overflow-hidden flex items-center justify-center bg-black'>
      <WavyBackground
        className="max-w-4xl mx-auto pb-40"
        backgroundFill="black"
        waveOpacity={0.5}
        speed="fast"
      >
        <div className="text-center px-4">
          {/* Badge Style Top Text */}
          <p className="text-sm md:text-base text-blue-400 font-mono tracking-widest uppercase mb-4 animate-pulse">
            Expert Led Courses
          </p>
          
          {/* Main Title with better responsiveness */}
          <h2 className='text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight'>
            Meet Our <span className='bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent'>Instructors</span>
          </h2>
          
          {/* Sub-description to fill space and add context */}
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Discover the talented professionals who will guide you through your 
            journey of mastering modern technologies.
          </p>

          {/* Tooltip Group */}
          <div className='flex flex-row items-center justify-center mb-10 w-full'>
            <AnimatedTooltip items={people}/>
          </div>

          {/* Optional CTA Button */}
          <button className="mt-8 px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-all active:scale-95">
            Join the Team
          </button>
        </div>
      </WavyBackground>
    </section>
  )
}

export default Tooltips