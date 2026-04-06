"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import Image from "next/image";

export default function VideoReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.1, 1]);

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <section ref={containerRef} className="w-full bg-white pt-1 pb-15 px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">

        <motion.div 
          style={{ scale, opacity }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-no-cursor
          className="relative aspect-video w-full rounded-[24px] md:rounded-[40px] overflow-hidden bg-neutral-100 group shadow-2xl"
        >
          {/* Main Content Container with Blur */}
          <motion.div 
            animate={{ 
              filter: isHovered ? "blur(20px)" : "blur(0px)",
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            {/* New Video Poster / Thumbnail (without play button) */}
            <Image 
              src="/video-banner-new.png" 
              alt="Video Reel Thumbnail" 
              fill 
              className="object-cover transition-opacity duration-700 opacity-100"
            />
          </motion.div>

          {/* Dark Overlay when hovered */}
          <motion.div 
             animate={{ opacity: isHovered ? 0.3 : 0 }}
             className="absolute inset-0 bg-black pointer-events-none z-10"
          />

          {/* Interaction Layer */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            {/* Pill-shaped PLAY REEL Button */}
            <motion.button 
              layout
              initial={false}
              animate={isHovered ? {
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                scale: 1,
              } : {
                top: "calc(100% - 40px)",
                left: "40px",
                x: "0%",
                y: "-100%",
                scale: 0.8,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="absolute bg-black rounded-full flex items-center p-1.5 pr-8 gap-4 shadow-2xl transition-shadow duration-500 border border-white/10"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shrink-0">
                <Play className="text-black fill-black ml-1" size={20} />
              </div>
              <span className="text-white font-bold uppercase tracking-[0.15em] text-[10px] md:text-[12px] whitespace-nowrap">
                Play Reel
              </span>
            </motion.button>
          </div>

          {/* Floating Info Text (Hidden on hover) */}
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 right-6 md:right-12 flex justify-end items-end pointer-events-none z-30">
             <motion.div 
               animate={{ 
                 opacity: isHovered ? 0 : 0.6,
                 y: isHovered ? 20 : 0
               }}
               className="text-white text-[10px] md:text-xs font-medium uppercase tracking-widest"
             >
                Floka Studio ®
             </motion.div>
          </div>
        </motion.div>
      </div>

      {/* YouTube Video Video Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white transition-all duration-300 z-1000"
              >
                <X className="text-white group-hover:text-black transition-colors" size={24} />
              </button>

              {/* YouTube Iframe */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
