'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EXPERTISE_ITEMS = [
  {
    id: 1,
    title: "User Interface & Experience Design",
    description: "We create intuitive, engaging digital experiences by putting your users at the center of the design process. From wireframes to high-fidelity prototypes, we ensure every interaction is meaningful.",
    categories: ["UI/UX", "RESEARCH", "PROTOTYPING", "STRATEGY"],
    image: "/expertise-1.png",
  },
  {
    id: 2,
    title: "Web Development",
    description: "Building fast, secure, and scalable websites using the latest technologies. We specialize in high-performance frontends and robust backends tailored to your specific business needs.",
    categories: ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND"],
    image: "/expertise-2.png",
  },
  {
    id: 3,
    title: "Search Engine Optimization",
    description: "Drive organic traffic and improve your search rankings with our data-driven SEO strategies. We optimize everything from site structure to content to help your brand get discovered.",
    categories: ["TECHNICAL SEO", "KEYWORDS", "ANALYTICS", "CONTENT"],
    image: "/expertise-1.png",
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "Scale your business with targeted digital marketing campaigns. We help you reach the right audience at the right time through social, search, and display channels.",
    categories: ["SOCIAL", "ADS", "GROWTH", "CAMPAIGNS"],
    image: "/expertise-2.png",
  },
  {
    id: 5,
    title: "Low-Code Development",
    description: "Accelerate your digital transformation with our low-code expertise. We build robust, custom applications faster without compromising on quality or performance.",
    categories: ["BUBBLE", "WEBFLOW", "FLUTTERFLOW", "AUTOMATION"],
    image: "/expertise-1.png",
  },
];

export default function CompanyExpertise() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stacking Effect: Pin this section so subsequent sections slide over it
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "bottom bottom",
        pin: true,
        pinSpacing: false,
        end: "bottom top",
        anticipatePin: 1
      });

      // Heading Reveal Animation with robust visibility
      gsap.fromTo(".expertise-title-word", 
        { 
          y: 100, 
          opacity: 0, 
          skewY: 10 
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".expertise-header",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      // Accordion Items Reveal with robust visibility
      gsap.fromTo(".expertise-item-row", 
        { 
          opacity: 0, 
          y: 40 
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".expertise-list",
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );

      // Testimonial Reveal with robust visibility
      gsap.fromTo(".testimonial-item", 
        { 
          opacity: 0, 
          y: 20 
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".testimonials-container",
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="expertise-section"
      ref={containerRef}
      className="w-full bg-[#0A0A0A] py-24 md:py-40 overflow-hidden" 
      style={{ fontFamily: 'var(--font-funnel), sans-serif' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* ── Section Title (Stacked Display) ── */}
        <div className="expertise-header flex flex-col items-center mb-16 md:mb-24">
          <div className="overflow-hidden">
            <h2 className="expertise-title-word text-white text-4xl sm:text-5xl md:text-[100px] font-normal leading-[0.8] tracking-tight uppercase">
              Company
            </h2>
          </div>
          <div className="overflow-hidden mt-2">
            <h2 className="expertise-title-word text-white/20 text-4xl sm:text-5xl md:text-[100px] font-normal leading-[0.8] tracking-tight uppercase">
              expertise
            </h2>
          </div>
        </div>

        {/* ── Expertise Accordion List ── */}
        <div className="expertise-list flex flex-col border-t border-white/10">
          {EXPERTISE_ITEMS.map((item, index) => {
            const isExpanded = expandedIndex === index;
            
            return (
              <div 
                key={item.id} 
                className="expertise-item-row flex flex-col border-b border-white/10"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-6 md:gap-9">
                     <span className="text-white/20 text-xs md:text-sm font-medium font-mono">
                       {String(index + 1).padStart(2, '0')}
                     </span>
                     <h3 className={`text-xl md:text-3xl font-normal transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-white/30 group-hover:text-white'}`}>
                       {item.title}
                     </h3>
                  </div>
                  
                  {/* Plus/Minus Indicator */}
                  <div className={`w-8 h-8 md:w-11 md:h-11 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-white border-white rotate-180' : 'group-hover:border-white/30'}`}>
                     <div className="relative w-3.5 h-3.5">
                        <div className={`absolute top-1/2 left-0 w-full h-px transition-colors duration-500 ${isExpanded ? 'bg-black' : 'bg-white/40'}`}></div>
                        <div className={`absolute top-0 left-1/2 w-px h-full transition-all duration-500 ${isExpanded ? 'opacity-0 scale-0 bg-black' : 'opacity-100 bg-white/40'}`}></div>
                     </div>
                  </div>
                </button>

                {/* Accordion Content (Animated) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 md:pb-16 flex flex-col md:flex-row gap-10 md:gap-12 md:items-start">
                        
                        {/* Left Side: Description & Categories (Takes more space) */}
                        <div className="flex-1 space-y-8">
                          <p className="text-white/40 text-base md:text-xl leading-relaxed max-w-2xl">
                            {item.description}
                          </p>
                          
                          {/* Category Pills */}
                          <div className="flex flex-wrap gap-2">
                            {item.categories.map((cat) => (
                              <span 
                                key={cat} 
                                className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-white/50 hover:text-white hover:border-white/30 transition-colors"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right Side: Image Box (Reduced Width for better balance) */}
                        <div className="w-full md:w-[320px] lg:w-[380px] shrink-0">
                           <div className="relative w-full aspect-4/3 rounded-[20px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                             <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                             />
                           </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Hire Us CTA ── */}
        <div className="mt-20 md:mt-24 flex justify-start">
           <button className="flex items-center gap-6 group cursor-pointer">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                 <span className="text-black text-2xl md:text-3xl font-light transition-transform duration-500 group-hover:rotate-90">+</span>
              </div>
              <span className="text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm">Hire us today</span>
           </button>
        </div>

        {/* ── Horizontal Testimonials Marquee ── */}
        <div 
          className="testimonials-container mt-12 md:mt-18 w-full relative overflow-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
           <div className="testimonial-marquee animate-marquee-seamless hover:pause">
              <div className="flex gap-x-12 md:gap-x-24 px-6 md:px-12 items-center">
                {[
                  { avatar: "/ceo.png", quote: "Best design communicator" },
                  { avatar: "/ceo.png", quote: "10/10 well recommanded" },
                  { avatar: "/ceo.png", quote: "Super speedy website designer" },
                  { avatar: "/ceo.png", quote: "Great in UI/UX" }
                ].map((test, i) => (
                  <div key={`${test.quote}-${i}`} className="testimonial-item flex items-center gap-4 group shrink-0">
                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <Image src={test.avatar} alt="Client" width={48} height={48} className="object-cover" />
                     </div>
                     <span className="text-white/30 text-sm md:text-base font-normal tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                        &ldquo; {test.quote} &rdquo;
                     </span>
                  </div>
                ))}
                {/* Duplicate for seamlessness */}
                {[
                  { avatar: "/ceo.png", quote: "Best design communicator" },
                  { avatar: "/ceo.png", quote: "10/10 well recommanded" },
                  { avatar: "/ceo.png", quote: "Super speedy website designer" },
                  { avatar: "/ceo.png", quote: "Great in UI/UX" }
                ].map((test, i) => (
                  <div key={`${test.quote}-dup-${i}`} className="testimonial-item flex items-center gap-4 group shrink-0">
                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <Image src={test.avatar} alt="Client" width={48} height={48} className="object-cover" />
                     </div>
                     <span className="text-white/30 text-sm md:text-base font-normal tracking-tight group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                        &ldquo; {test.quote} &rdquo;
                     </span>
                  </div>
                ))}
              </div>
           </div>
        </div>

        <style jsx>{`
          .testimonial-marquee {
            display: flex;
            width: max-content;
          }
          .animate-marquee-seamless {
            animation: marquee 10s linear infinite;
          }
          .pause:hover {
            animation-play-state: paused;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

      </div>
    </section>
  );
}
