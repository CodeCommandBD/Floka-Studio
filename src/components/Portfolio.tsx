"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "ALDAN BRANDING",
    year: "2025",
    category: "Branding / Identity",
    image: "/portfolio-1.png",
    logo: "Logoispum",
    size: "half",
  },
  {
    id: 2,
    title: "VR EXPERIENCE",
    year: "2024",
    category: "Technology / UI UX",
    image: "/portfolio-2.png",
    logo: "TechVision",
    size: "half",
  },
  {
    id: 3,
    title: "MODERN VILLA",
    year: "2025",
    category: "Architecture / Design",
    image: "/portfolio-3.png",
    logo: "Elite Homes",
    size: "full",
  },
  {
    id: 4,
    title: "DIGITAL APPS",
    year: "2024",
    category: "Software / UI UX",
    image: "/portfolio-4.png",
    logo: "AppStudio",
    size: "half",
  },
  {
    id: 5,
    title: "AESTHETIC CHAIR",
    year: "2025",
    category: "Product / Design",
    image: "/portfolio-5.png",
    logo: "DesignLab",
    size: "half",
  },
];

export default function Portfolio() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  const headingText = "Strategy to build powerful digital solutions.";
  const words = headingText.split(" ");

  useLayoutEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      // Word-by-word animation from right (Header)
      gsap.from(".word", {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 0.5,
        },
        opacity: 0,
        x: 40,
        filter: "blur(4px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Clean Card Slide-Down Animation
      const animateRow = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return;
        
        const cards = Array.from(ref.current.children);
        
        gsap.fromTo(cards, 
          { y: -100, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 90%",
              end: "top 50%", 
              scrub: true,
            }
          }
        );
      };

      animateRow(row1Ref);
      animateRow(row2Ref);
      animateRow(row3Ref);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 md:py-32 bg-[#F9F9F9] border-t border-black/5" 
      style={{ fontFamily: 'var(--font-funnel), sans-serif' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Section Header (Stacked Layout) ── */}
        <div className="flex flex-col mb-16 md:mb-24 pt-8 relative z-0">
          {/* Label Row with Full Width Line */}
          <div className="w-full border-b border-black/10 pb-4 mb-8 flex flex-col gap-4">
            <div className="w-6 h-6 border border-black/10 rounded-full flex items-center justify-center opacity-40">
               <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <span className="text-black/40 text-xs font-bold uppercase tracking-[0.2em]">
              Portfolio
            </span>
          </div>

          {/* Heading Row (Below, Right Side Block, Left Aligned Text) */}
          <div className="w-full flex justify-end relative">
            <h2 
              ref={headingRef}
              className="text-black font-normal text-3xl md:text-5xl leading-[1.2] tracking-tight text-left text-balance max-w-2xl flex flex-wrap justify-start"
            >
              {words.map((word, index) => (
                <span key={index} className="word inline-block mr-3 opacity-100">
                  {word}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* ── Portfolio Grid (3 Animated Parts with Tiered Z-Index) ── */}
        <div className="flex flex-col gap-24 md:gap-32 relative">
          {/* Part 1: Row 1 (Half Cards) - Bottom tier */}
          <div className="relative z-10 bg-[#F9F9F9]">
            <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {PORTFOLIO_ITEMS.slice(0, 2).map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Part 2: Row 2 (Full Card) - Middle tier */}
          <div className="relative z-20 bg-[#F9F9F9]">
            <div ref={row2Ref} className="w-full">
              {PORTFOLIO_ITEMS.slice(2, 3).map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Part 3: Row 3 (Half Cards) - Top tier */}
          <div className="relative z-30 bg-[#F9F9F9]">
            <div ref={row3Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {PORTFOLIO_ITEMS.slice(3, 5).map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        {/* ── View More Button (MORE WORKS) ── */}
        <div className="mt-40 flex justify-center">
          <Link href="#" className="flex items-center gap-6 group">
             <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <span className="text-white text-3xl font-light transition-transform duration-500 group-hover:rotate-180">+</span>
             </div>
             <span className="text-black font-bold uppercase tracking-[0.2em] text-sm">More Works</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Sub-component for individual cards to keep grid clean
function PortfolioCard({ item }: { item: typeof PORTFOLIO_ITEMS[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Setup smooth spring animation for the mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    // Move slightly (up to 25px in any direction)
    x.set(xPct * 50);
    y.set(yPct * 50);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-none h-full"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-4/3 md:aspect-auto md:h-[500px] overflow-hidden rounded-[24px] bg-gray-100">
        {/* Logo Overlay */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
           <div className="w-6 h-6 relative">
              <svg viewBox="0 0 40 40" className="w-full h-full fill-white">
                <path d="M20 0c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20zm0 36c-8.837 0-16-7.163-16-16s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16zM20 8l-8 8h16l-8-8zM20 32l-8-8h16l-8 8z" />
              </svg>
           </div>
          <span className="text-white font-bold text-lg tracking-tight uppercase">Logoipsum</span>
        </div>

        {/* Top-Right Arrow Button (Hover) */}
        <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
           <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <MoveRight size={18} className="-rotate-45 text-black" />
           </div>
        </div>

        {/* Main Image with Mouse Follow Effect & Zoom (State-Managed) */}
        <motion.div 
          className="relative w-full h-full origin-center"
          style={{ 
            x: mouseXSpring, 
            y: mouseYSpring,
          }}
          animate={{ scale: isHovered ? 1.22 : 1.1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Dark Gradient Overlay (Bottom) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category Text (Bottom-Left on Image) */}
        <div className="absolute bottom-8 left-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white font-bold text-sm uppercase tracking-widest">
          {item.category}
        </div>
      </div>

      {/* Meta Data Bar */}
      <div className="mt-4 bg-white rounded-[12px] p-6 flex items-center justify-between border-t border-transparent group-hover:border-gray-50 transition-all duration-300">
        <h3 className="font-semibold text-black text-lg tracking-tight uppercase">{item.title}</h3>
        <span className="font-medium text-gray-400 text-sm tracking-widest uppercase">{item.year}</span>
      </div>
    </div>
  );
}
