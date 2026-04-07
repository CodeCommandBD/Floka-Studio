"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Approach() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stat25Ref = useRef<HTMLSpanElement>(null);
  const stat1200Ref = useRef<HTMLSpanElement>(null);
  const ceoImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the big text on the right
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        x: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(leftColRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // Animate the cards staggering up
      gsap.from(cardRefs.current, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 95%",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Animate the overlapping pills width and number counter
      barsRef.current.forEach((bar) => {
        if (!bar) return;
        const targetWidth = bar.getAttribute("data-width") || "0";
        const percentSpan = bar.querySelector(".percent-text");

        gsap.to(bar, {
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          },
          width: targetWidth + "%",
          duration: 1.5,
          ease: "power3.out",
          onUpdate: function() {
            if (percentSpan) {
              percentSpan.textContent = Math.round(this.progress() * parseInt(targetWidth)).toString();
            }
          }
        });
      });

      // Animate the 25+ and 1200+ counters
      const animateCounter = (el: HTMLElement | null, target: number) => {
        if (!el) return;
        const startObj = { val: 0 };
        gsap.to(startObj, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
          val: target,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = Math.round(startObj.val).toString();
          }
        });
      };
      
      animateCounter(stat25Ref.current, 25);
      animateCounter(stat1200Ref.current, 1200);

      // Responsive animation logic
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Desktop: Subtle movement to avoid heading overlap
        gsap.from(ceoImageRef.current, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 95%",
            end: "top 20%",
            scrub: 1.2,
          },
          yPercent: -8,
          opacity: 0,
          ease: "power1.out",
        });
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile: More pronounced movement (as user liked it)
        gsap.from(ceoImageRef.current, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            end: "top 10%",
            scrub: 1.2,
          },
          yPercent: -20,
          opacity: 0,
          ease: "power1.out",
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full pt-24 md:pt-32 pb-10 md:pb-16 px-6 will-change-transform"
      style={{ backgroundColor: "#F9F9F9" }}
      suppressHydrationWarning
    >
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center justify-between" suppressHydrationWarning>
        {/* ── Left Side: Rotating Badge + Subtext ── */}
        <div ref={leftColRef} className="w-full md:w-1/3 flex flex-col gap-6">
          {/* Circular Badge */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            {/* Rotating Text SVG */}
            <svg
              className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <text
                fontSize="8.5"
                fill="#b3b3b3"
                className="uppercase tracking-widest font-semibold"
              >
                <textPath href="#circlePath" startOffset="0%">
                  PLAYFUL, LUXURIOUS, OR MORE / WANT IT TO SOUND
                </textPath>
              </text>
            </svg>

            {/* Custom Initial Logo */}
            <div className="relative z-10 w-10 h-10 flex items-center justify-center">
              {/* Using a structural F to mirror the reference design loosely */}
              <svg viewBox="0 0 40 40" className="w-full h-full fill-black">
                <path d="M5 5 H35 V15 H15 V20 H28 V30 H15 V40 H5 Z" />
              </svg>
            </div>
          </div>

          {/* Small text description */}
          <p
            className="text-base md:text-lg tracking-tight text-gray-500 font-medium"
            style={{ lineHeight: 1.6, maxWidth: "280px" }}
          >
            We design every project with long-term success in mind.
          </p>
        </div>

        {/* ── Right Side: Main Heading ── */}
        <div className="w-full md:w-3/5 lg:w-2/3 relative z-20">
          <h2
            ref={textRef}
            className="text-black font-medium text-balance"
            style={{
              fontSize: "clamp(22px, 5vw, 48px)",
              letterSpacing: "-0.015em",
              lineHeight: 1.2,
            }}
          >
            Our approach is straightforward—prioritizing functionality, speed,
            and clarity for solutions.
          </h2>
        </div>
      </div>

      <div 
        ref={gridRef}
        className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24 pointer-events-auto items-start"
        suppressHydrationWarning
      >
        {/* Card 1: Experience Stats */}
        <div 
          ref={(el) => { if (el) cardRefs.current[0] = el; }}
          className="bg-white rounded-[24px] p-8 lg:p-10 flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform duration-300"
        >
          <div>
            <h3 className="text-black leading-none" style={{ fontSize: "clamp(60px, 8vw, 120px)", fontWeight: 500, letterSpacing: "-0.04em" }}>
              <span ref={stat25Ref}>0</span><span className="text-[#e2e2e2] font-light">+</span>
            </h3>
            <p className="text-gray-400 font-medium text-sm mt-2 uppercase tracking-wide">Years of experience</p>
          </div>
          <div className="mt-12 lg:mt-20">
            <p className="text-gray-500 font-medium text-balance" style={{ fontSize: "17px", lineHeight: 1.5 }}>
              Explore how we transform ideas into extraordinary digital experiences.
            </p>
            <div className="flex items-center gap-3 mt-10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative bg-gray-200">
                    <Image src="/profile.webp" alt="user" fill className="object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-black font-semibold mt-4 text-sm md:text-base"><span ref={stat1200Ref}>0</span>+ happy users review</p>
          </div>
        </div>

        {/* Card 2: Main Image Card */}
        <div 
          ref={(el) => { if (el) cardRefs.current[1] = el; }}
          className="bg-[#0a0a0a] rounded-[24px] lg:col-span-2 relative overflow-visible flex flex-col justify-end p-8 lg:p-10 min-h-[400px] lg:min-h-0 group"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[140%] lg:w-[80%] lg:h-[115%] pointer-events-none z-10 origin-bottom transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]">
            <div ref={ceoImageRef} className="w-full h-full relative">
              <Image src="/ceo.webp" alt="Floka CEO" fill className="object-contain object-bottom drop-shadow-2xl" priority />
            </div>
          </div>

          <div className="relative z-20 w-full flex justify-end">
            <div className="text-right flex flex-col gap-6 items-end mt-4">
              {/* Award Badge 1 */}
              <div className="flex flex-col items-center gap-1 group/badge opacity-90 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-8 relative -rotate-6">
                    <Image src="/laurel-wreath.svg" alt="Award" fill className="object-contain opacity-70" />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] text-white font-bold tracking-[0.2em] uppercase leading-tight">Ultra</span>
                    <span className="text-[9px] text-[#e0e0e0] font-medium tracking-widest uppercase leading-tight">Prestigious</span>
                    <span className="text-[6px] text-gray-500 font-bold uppercase mt-1">Best of the world</span>
                  </div>

                  <div className="w-7 h-8 relative rotate-6 scale-x-[-1]">
                    <Image src="/laurel-wreath.svg" alt="Award" fill className="object-contain opacity-70" />
                  </div>
                </div>
                
                <div className="flex flex-col items-center -mt-1">
                   <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="6" height="6" viewBox="0 0 24 24" fill="#c8984a">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                    ))}
                   </div>
                   <span className="text-[7px] text-[#c8984a] font-bold tracking-widest mt-1 uppercase">Winner</span>
                </div>
              </div>

              {/* Award Badge 2 */}
              <div className="flex flex-col items-center gap-1 group/badge opacity-90 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-7 relative -rotate-6">
                    <Image src="/laurel-wreath.svg" alt="Award" fill className="object-contain opacity-70" />
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase leading-tight">Hyper Best</span>
                    <span className="text-[6px] text-gray-500 font-bold uppercase tracking-widest">Award Winning</span>
                  </div>

                  <div className="w-6 h-7 relative rotate-6 scale-x-[-1]">
                    <Image src="/laurel-wreath.svg" alt="Award" fill className="object-contain opacity-70" />
                  </div>
                </div>
                <div className="flex gap-1 -mt-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="5" height="5" viewBox="0 0 24 24" fill="#666">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-20 mt-auto pt-40">
            <h4 className="text-white font-medium text-lg md:text-2xl" style={{ letterSpacing: "-0.02em", lineHeight: 1.3 }}>
              " At Floka, we merge strategy, creativity, and technology to shape brands that people love. "
            </h4>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-[#00c2cb] font-semibold text-sm">Merizo H. Yelso</span>
              <span className="text-gray-500 text-xs tracking-widest">/CEO</span>
            </div>
          </div>
        </div>

        {/* Column 3 wrapper (Cards 3 & 4) */}
        <div className="flex flex-col gap-4 md:gap-6 h-full lg:col-span-1 md:col-span-1">
          {/* Card 3: Social Pills */}
          <div 
            ref={(el) => { if (el) cardRefs.current[2] = el; }}
            className="bg-white rounded-[24px] p-8 shadow-sm flex-1 flex flex-col justify-center"
          >
            <p className="text-gray-400 font-medium text-sm">Follow us</p>
            <h5 className="text-black font-semibold text-xl mt-1 tracking-tight">For check updates</h5>
            <div className="flex flex-wrap gap-2 mt-6 w-full overflow-hidden">
              {["Dribbble", "Behance", "Linkedin", "X", "Xing"].map((social) => (
                <button key={social} className="border border-gray-200 rounded-full px-4 py-2 text-[10px] sm:text-[10px] font-semibold text-black uppercase tracking-wider hover:bg-black hover:border-black hover:text-white transition-colors duration-300">
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Card 4: Progress Bars */}
          <div 
            ref={(el) => { if (el) cardRefs.current[3] = el; }}
            className="bg-white rounded-[24px] p-8 shadow-sm flex-1 flex flex-col justify-center"
          >
            <p className="text-gray-400 font-medium text-sm mb-6">Impressions</p>
            <div className="flex flex-col">
              {[
                { label: "Solutions", val: "100", style: "bg-[#f3f3f3] text-black z-10" },
                { label: "UI/UX", val: "90", style: "bg-[#0a0a0a] text-white z-20 md:-mt-3 shadow-lg" },
                { label: "Explore", val: "72", style: "bg-white border border-gray-100 text-black z-30 md:-mt-3 shadow-md" }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  ref={(el) => { if (el) barsRef.current[idx] = el; }}
                  data-width={item.val}
                  className={`relative h-[44px] rounded-[10px] flex items-center justify-between px-5 font-medium text-[13px] ${item.style}`}
                  style={{ width: "0%" }} // Will be expanded by GSAP
                >
                  <span className="tracking-wide">{item.label}</span>
                  <span className="font-semibold text-[14px]">
                    <span className="percent-text" data-target={item.val}>0</span>%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
