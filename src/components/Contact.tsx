"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

// Social SVG Components for maximum compatibility
const SocialIcons = {
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  ),
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  ),
  Twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
  )
};

const RotatingCircle = ({ scrollYProgress }: { scrollYProgress: any }) => {
    // Map scroll progress to 360 degrees of rotation
    const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
      <div className="relative w-56 h-56 flex items-center justify-center group overflow-hidden">
        {/* Scroll-Driven Rotating Layers */}
        <motion.div
          style={{ rotate: rotation }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
            </defs>
            <text className="text-[6.5px] font-bold fill-white uppercase">
              <textPath xlinkHref="#circlePath">
                GET IN TOUCH &nbsp; &nbsp; &nbsp; &nbsp; • &nbsp; &nbsp; &nbsp; &nbsp; GET IN TOUCH &nbsp; &nbsp; &nbsp; &nbsp; • &nbsp; &nbsp; &nbsp; &nbsp; GET IN TOUCH &nbsp; &nbsp; &nbsp; &nbsp; • &nbsp; &nbsp; &nbsp; &nbsp;
              </textPath>
            </text>
          </svg>
        </motion.div>
        
        {/* Center Arrow */}
        <div className="w-16 h-16 flex items-center justify-center relative translate-y-[-2px] group-hover:scale-110 transition-transform duration-500 z-20">
           <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="12" x2="22" y2="12"></line><polyline points="15 5 22 12 15 19"></polyline></svg>
        </div>
      </div>
    );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress: globalScroll } = useScroll();
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  
  const pathLength = useSpring(globalScroll, { stiffness: 100, damping: 30 });
  const strokeDashoffset = useTransform(pathLength, [0, 1], [circumference, 0]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-999 cursor-pointer"
        >
          <div className="relative w-14 h-14 flex items-center justify-center bg-black rounded-full overflow-hidden border border-white/10 shadow-2xl">
             <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
               <motion.circle
                 cx="28"
                 cy="28"
                 r={radius}
                 fill="none"
                 stroke="white"
                 strokeWidth="2"
                 style={{
                   strokeDasharray: circumference,
                   strokeDashoffset
                 }}
               />
             </svg>
             <ArrowUp className="text-white relative z-10" size={18} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  return (
    <section ref={containerRef} className="m-2 md:m-4 bg-[#0a0a0a] pt-40 pb-20 px-6 md:px-12 relative z-10 overflow-hidden text-white rounded-[24px] md:rounded-[32px]">
      
      {/* 1. Cinematic Finale Section (Text + Circle) */}
      <div className="relative min-h-[400px] flex flex-col items-center justify-center mb-32 md:mb-48">
        {/* Background Text (Stays BEHIND) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <h2 className="text-[120px] md:text-[230px] font-bold leading-none tracking-tighter text-center">
            <span className="text-white">Let's</span> <br /> 
            <span className="text-neutral-900">talk now</span>
          </h2>
        </div>

        {/* Action Circle (Stays IN FRONT) - Lowered Position */}
        <div className="relative z-10 flex items-center justify-center cursor-pointer pt-32 md:pt-56 scale-90 md:scale-100">
          <RotatingCircle scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* 2. Standard Studio Footer Grid (Clean & Borderless) */}
      <div className="max-w-[1400px] mx-auto pt-24 pb-20">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
            
            {/* Left: Team Image with Modular F Logo (5 Columns) */}
            <div className="lg:col-span-5 group cursor-pointer">
               <div className="relative aspect-4/3 rounded-[40px] overflow-hidden bg-neutral-900 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop" 
                    alt="Floka Team"
                    className="w-full h-full object-cover grayscale brightness-[0.7] transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  {/* Modular Geometric "F" Logo Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-24 h-32 relative group-hover:scale-110 transition-transform duration-700">
                        <div className="absolute top-0 left-0 w-full h-8 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>
                        <div className="absolute top-0 left-0 w-8 h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>
                        <div className="absolute top-12 left-0 w-2/3 h-8 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>
                     </div>
                  </div>
               </div>
               {/* Massive "Floka" Outlined Text - Tracks Image on Mobile, Base on Desktop */}
               <div className="relative lg:absolute lg:bottom-0 lg:left-0 w-full overflow-hidden pointer-events-none select-none opacity-80 z-10 mt-8 lg:mt-0">
                  <h2 className="text-[80px] sm:text-[120px] md:text-[240px] lg:text-[320px] font-black text-transparent leading-none tracking-tighter" style={{ WebkitTextStroke: "2.5px rgba(255,255,255,1)" }}>
                    Floka
                  </h2>
                </div>
            </div>

            {/* Middle: Nav Links (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-8 text-left">
                <div className="flex flex-col gap-5">
                  {["About Us", "Journal", "Faq", "Get In Touch", "Careers"].map((link, i) => (
                    <motion.a
                      key={link}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover="hover"
                      href="#"
                      className="relative text-[32px] md:text-[38px] font-medium leading-tight text-neutral-500 hover:text-white transition-colors tracking-tight w-fit group"
                    >
                      <span>{link}</span>
                      <motion.span 
                        variants={{
                          hover: { width: "100%", opacity: 1 },
                          initial: { width: "0%", opacity: 0 }
                        }}
                        className="absolute -bottom-1 left-0 h-[2px] bg-white rounded-full"
                        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                      />
                    </motion.a>
                  ))}
                </div>
            </div>

            {/* Right: Studio Meta & Socials (3 Columns) */}
            <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-14 text-left lg:text-right relative">
                {/* Subtle Radiant Background Shape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white opacity-[0.02] blur-[80px] pointer-events-none rounded-full" />
                
                <div className="space-y-6 relative z-10">
                  <p className="text-[15px] md:text-[17px] font-medium text-neutral-400 leading-relaxed max-w-[280px] lg:ml-auto">
                    At <span className="text-white font-bold">Floka</span>, we believe digital experiences should be more than just functional — they should tell your story.
                  </p>
                  <div className="space-y-1">
                    <p className="text-white font-bold text-[18px]">info@floka-design.com</p>
                    <p className="text-neutral-500 font-medium text-[15px]">12/A, Booston Tower, NYC, USA</p>
                  </div>
                </div>
                
                <div className="flex gap-4 relative z-10">
                  {[
                    { id: 'insta', icon: <SocialIcons.Instagram /> },
                    { id: 'fb', icon: <SocialIcons.Facebook /> },
                    { id: 'in', icon: <SocialIcons.Linkedin /> },
                    { id: 'tw', icon: <SocialIcons.Twitter /> }
                  ].map((social) => (
                    <a
                      key={social.id}
                      href="#"
                      className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                      <div className="transition-colors duration-300 scale-110">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
            </div>
         </div>
      </div>
    </section>
  );
}
