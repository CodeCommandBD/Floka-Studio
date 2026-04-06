"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Plus } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Counter = ({ value, label, suffix = "", prefix = "", decimals = 0 }: { value: number; label: string; suffix?: string; prefix?: string; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to({}, {
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 90%",
        },
        onUpdate: function() {
          const progress = this.progress();
          setCount(progress * value);
        }
      });
    });
    return () => ctx.revert();
  }, [value]);

  return (
    <div ref={counterRef} className="flex flex-col">
      <div className="text-4xl md:text-5xl font-semibold tracking-tight">
        {prefix}{count.toFixed(decimals)}{suffix}
      </div>
      <div className="text-black/40 text-sm mt-1 uppercase tracking-widest font-medium max-w-[120px] leading-tight">
        {label}
      </div>
    </div>
  );
};

export default function FunFacts() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyColRef = useRef<HTMLDivElement>(null);
  

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Sticky Image Pinning (Desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: stickyColRef.current,
          start: "top 120px",
          endTrigger: sectionRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        });
      });

      // Reveal animations for cards with robust visibility handling
      gsap.fromTo(".reveal-card", 
        { 
          y: 60, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            toggleActions: "play none none none" // Keep visible once revealed
          }
        }
      );

      // Heading Words Scroll Animation (Right-to-Left)
      gsap.from(".fun-fact-word", {
        scrollTrigger: {
          trigger: ".fun-fact-heading",
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
      });

      // Main image reveal
      gsap.from(".main-image-wrap", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Image Stack Spreading (Scroll-Driven)
      const stackTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".image-stack-trigger",
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1.5,
        }
      });

      stackTl
        .from(".stack-img-1", { x: 40, rotate: 0, ease: "none" }, 0)
        .from(".stack-img-3", { x: -40, rotate: 0, ease: "none" }, 0)
        .to(".stack-img-1", { x: -40, rotate: -15, ease: "none" }, 0)
        .to(".stack-img-3", { x: 40, rotate: 15, ease: "none" }, 0);

      // Final refresh to catch any layout shifts from pinned sections above
      ScrollTrigger.refresh();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full py-24 md:py-32 bg-white relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-20"
      style={{ fontFamily: 'var(--font-funnel), sans-serif' }}
    >

      <div ref={containerRef} className="max-w-[1280px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-12 items-start">
        
        {/* ── Left Column: Large Image ── */}
        <div ref={stickyColRef} className="w-full">
          <div 
            className="main-image-wrap relative aspect-3/4 w-full rounded-[24px] overflow-hidden group shadow-2xl bg-black"
          >
            <div className="w-full h-full">
              <Image
                src="/fun-facts/main.png"
                alt="Creative Studio workspace"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
        </div>


        {/* ── Right Column: Info & Grid ── */}
        <div className="flex flex-col">
          {/* Label & Heading */}
          <div className="mb-32 transition-all duration-700">
            <span className="text-black/40 text-xs font-bold uppercase tracking-[0.2em] block mb-6">
              Fun Facts
            </span>
            <h2 className="fun-fact-heading text-black font-normal text-2xl md:text-3xl lg:text-4xl leading-[1.3] tracking-tight max-w-2xl">
              {"Consistently delivering impactful results through a perfect blend of design and functionality.".split(" ").map((word, i) => (
                <span key={i} className="fun-fact-word inline-block mr-[0.25em]">
                  {word}
                </span>
              ))}
            </h2>
          </div>
          
          {/* Cards Grid: Asymmetric 2-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Column 1: Stats (Small) & Image Stack (Tall) */}
            <div className="flex flex-col gap-6">
              {/* Card 1: Success Stats */}
              <div className="reveal-card p-6 md:p-10 bg-white rounded-[32px] border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 flex justify-between items-center group min-h-[140px]">
                <div className="text-black/60 text-[15px] uppercase tracking-widest font-medium max-w-[150px] leading-tight group-hover:text-black transition-colors">
                  Successful projects completed
                </div>
                <div className="text-5xl md:text-6xl font-semibold tracking-tighter text-black flex items-center">
                  2k<span className="text-black/20 font-light">+</span>
                </div>
              </div>

              {/* Card 2: Image Stack (Tall) */}
              <div className="reveal-card image-stack-trigger p-6 md:p-10 bg-[#0A0A0A] text-white rounded-[32px] overflow-hidden group min-h-[440px] flex flex-col relative">
                {/* Image Stack */}
                <div className="relative h-60 mt-4 mb-20">
                  <div className="stack-img-1 absolute top-4 left-6 w-32 h-44 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl z-20">
                    <Image src="/fun-facts/stack-1.png" alt="UI Design" fill className="object-cover" />
                  </div>
                  <div className="stack-img-2 absolute top-0 left-20 w-32 h-44 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl z-10">
                    <Image src="/fun-facts/stack-2.png" alt="Branding" fill className="object-cover" />
                  </div>
                  <div className="stack-img-3 absolute top-8 right-6 w-32 h-44 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                    <Image src="/fun-facts/stack-3.png" alt="Web Dev" fill className="object-cover" />
                  </div>
                </div>
                <div className="mt-auto">
                  <h3 className="text-2xl font-light leading-relaxed mb-4">
                    More than 2k+ projects <span className="opacity-80">completed—each crafted to deliver real-world results for ambitious brands.</span>
                  </h3>
                </div>
              </div>
            </div>

            {/* Column 2: Rating (Tall) & Worldwide (Small) */}
            <div className="flex flex-col gap-6">
              {/* Card 3: Rating (Tall) */}
              <div className="reveal-card p-6 md:p-10 bg-white rounded-[32px] border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 group min-h-[480px] flex flex-col">
                <div>
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="#FFB800" color="#FFB800" className="group-hover:scale-110 transition-transform" />
                    ))}
                  </div>
                  <div className="text-7xl md:text-8xl font-semibold tracking-tighter text-black mb-10 leading-none">
                    4.9/5
                  </div>
                  <div className="h-px w-full bg-black/10 mb-10"></div>
                  <p className="text-neutral-600 text-[17px] leading-relaxed mb-12 max-w-[280px] font-medium">
                    We offer end-to-end creative solutions that make brands unforgettable.
                  </p>
                </div>
                
                <button className="flex items-center gap-4 mt-auto group/btn cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-500 group-hover/btn:scale-110 group-hover/btn:rotate-90">
                    <Plus size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-black">
                    Hire Us Now
                  </span>
                </button>
              </div>

              {/* Card 4: Worldwide (Small) */}
              <div className="reveal-card p-6 md:p-10 bg-[#1A1A1A] text-white rounded-[32px] relative overflow-hidden flex justify-between items-center group min-h-[140px]">
                <Image src="/fun-facts/world-bg.png" alt="World Map" fill className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />
                <div className="relative z-10 text-[15px] max-w-[140px] leading-tight font-light opacity-80 group-hover:opacity-100 transition-opacity">
                  Worldwide base around the world
                </div>
                <div className="relative z-10 text-5xl md:text-6xl font-semibold tracking-tighter group-hover:scale-110 transition-transform">
                  5<span className="text-white/20 font-light">+</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
