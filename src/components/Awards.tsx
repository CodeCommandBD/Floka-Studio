"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const awardsData = [
  { id: 1, title: "BEST DESIGNER AWARDS", company: "AWWWARDS", year: "2025" },
  { id: 2, title: "PEAKY UI DESIGNER", company: "GOOGLE", year: "2024" },
  { id: 3, title: "GREAT IN UX", company: "APPLE", year: "2023" },
  { id: 4, title: "BEST WEBSITE PICK", company: "MICROSOFT", year: "2022" },
  { id: 5, title: "NELSON UI & UX DESIGNER", company: "SAMSUNG", year: "2021" },
];

const AwardRow = ({ award, index }: { award: typeof awardsData[0], index: number }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const { left, top } = rowRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-b border-black/10 last:border-b-0"
    >
      <div
        ref={rowRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden group cursor-pointer"
      >
        {/* Background Layer (Pure White on Hover) */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="absolute inset-0 bg-white pointer-events-none z-0"
        />

        {/* Highlight Spotlight (Keeping a subtle version) */}
        {isHovered && (
          <div 
              className="absolute w-[400px] h-full bg-neutral-100/50 blur-3xl pointer-events-none z-0 transform -translate-x-1/2"
              style={{ left: position.x }}
          />
        )}

        {/* Content (Slides Right on Hover) */}
        <motion.div 
          animate={{ x: isHovered ? 24 : 0 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="relative z-10 flex flex-col md:flex-row md:items-center justify-between py-10 px-4 transition-colors duration-300"
        >
          <h4 className="text-[16px] md:text-[18px] font-bold tracking-tight uppercase flex-1">{award.title}</h4>
          <div className="flex items-center justify-between flex-1 mt-4 md:mt-0 text-[12px] font-bold uppercase tracking-widest text-black/40 group-hover:text-black/60 transition-colors pr-8">
            <span>{award.company}</span>
            <span>{award.year}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Awards() {
  return (
    <section className="w-full bg-[#f8f8f8] py-24 md:py-32 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32 mb-32">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-6"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[3/2] rounded-[24px] md:rounded-[32px] overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800&auto=format&fit=crop" 
                alt="Getting Rewards"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-800">
              GET REWARDS
            </span>
          </motion.div>

          {/* Right Column - Text Details */}
          <div className="flex flex-col justify-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ amount: 0.3 }}
               transition={{ duration: 0.8 }}
               className="w-24 h-24 rounded-full border border-neutral-200 flex items-center justify-center mb-12 relative"
             >
                <span className="text-neutral-300">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                </span>
                {/* Circular Text Placeholder SVG */}
                <div className="absolute inset-0 -m-4 opacity-30 select-none pointer-events-none animate-[spin_20s_linear_infinite]">
                     <svg viewBox="0 0 100 100" width="100%" height="100%">
                        <defs>
                            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                        </defs>
                        <text fontSize="11" fill="currentColor" fontWeight="bold" letterSpacing="0.2em">
                            <textPath href="#circle">
                                PLAYFUL . LUXURIOUS . OR MORE? . WANT IT TO SOUND .
                            </textPath>
                        </text>
                    </svg>
                </div>
             </motion.div>

            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              className="text-[22px] md:text-[28px] lg:text-[36px] font-normal tracking-tight leading-[1.1] text-black max-w-[800px] flex flex-col gap-2"
            >
              {[
                "Driven by passion and grounded in expertise,",
                "our team turns bold ideas into reality,",
                "leading the way in creative innovation."
              ].map((line, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { x: 80, opacity: 0 },
                    visible: { 
                      x: 0, 
                      opacity: 1,
                      transition: { 
                        duration: 0.8, 
                        delay: i * 0.15,
                        ease: [0.33, 1, 0.68, 1] 
                      }
                    }
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h2>
          </div>
        </div>

        {/* Awards List */}
        <div className="flex flex-col border-t border-black/10">
          {awardsData.map((award, idx) => (
            <AwardRow key={award.id} award={award} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
