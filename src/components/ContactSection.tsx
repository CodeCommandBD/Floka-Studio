"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, MapPin, ChevronDown, Plus } from "lucide-react";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-Precision Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 1. Staggered Horizontal Parallax for Sentence Parts
  const headingX1 = useTransform(scrollYProgress, [0, 0.8], [400, -200]);
  const headingX2 = useTransform(scrollYProgress, [0.1, 0.9], [600, -300]);
  
  // 2. Individual Row/Field Zoom-in Scale
  const fieldScale1 = useTransform(scrollYProgress, [0, 0.45], [0.75, 1]);
  const fieldScale2 = useTransform(scrollYProgress, [0.05, 0.5], [0.75, 1]);
  const fieldScale3 = useTransform(scrollYProgress, [0.1, 0.55], [0.75, 1]);
  const fieldScale4 = useTransform(scrollYProgress, [0.15, 0.6], [0.75, 1]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] py-40 px-6 relative z-10 overflow-hidden" suppressHydrationWarning>
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" suppressHydrationWarning></div>
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center" suppressHydrationWarning>
        
        {/* Left Column - Static Heading */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div className="space-y-6">
            <span className="text-[14px] uppercase tracking-[0.3em] text-neutral-500 font-bold">Get in Touch</span>
            <div className="flex flex-col gap-2 overflow-visible">
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-[48px] md:text-[68px] font-extrabold tracking-tight leading-[1] text-white"
               >
                 Tell us about your project
               </motion.h2>
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="text-[38px] md:text-[58px] font-extrabold tracking-tight leading-[1.1] text-neutral-400"
               >
                 — whatever it may be.
               </motion.h2>
            </div>
          </div>

          <div className="space-y-12">
            {/* Talk to Us */}
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 text-white">
                  <MessageCircle size={20} className="text-neutral-400" />
                  <span className="text-[14px] font-bold uppercase tracking-widest">Talk to Us</span>
               </div>
               <p className="text-[18px] font-medium text-neutral-400">
                  Work and general inquiries <br />
                  <span className="text-white font-bold">+123 456 789 00</span>
               </p>
            </div>

            {/* Post Address */}
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 text-white">
                  <MapPin size={20} className="text-neutral-400" />
                  <span className="text-[14px] font-bold uppercase tracking-widest">Post Address</span>
               </div>
               <p className="text-[18px] font-medium text-neutral-400 leading-relaxed max-w-[320px]">
                  541 Melville Ave, Palo Alto, <br />
                  CA 94301, United States
               </p>
            </div>
          </div>
        </div>

        {/* Right Column - The Form with Grid Zoom */}
        <div className="lg:col-span-7">
          <motion.div 
             style={{ opacity }}
             className="bg-white p-10 md:p-14 rounded-[40px] shadow-2xl relative z-10"
          >
             <h3 className="text-[32px] md:text-[38px] font-medium text-black mb-10 tracking-tight">
                Have a project in mind?
             </h3>

             <form className="space-y-8">
                {/* Inputs Pair Zoom */}
                <motion.div style={{ scale: fieldScale1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <input 
                     type="text" 
                     placeholder="YOUR NAME" 
                     className="w-full bg-neutral-50 px-8 py-5 rounded-2xl text-[13px] font-bold tracking-widest focus:outline-none focus:bg-white focus:ring-4 focus:ring-black/3 transition-all duration-300 border border-transparent focus:border-neutral-200"
                   />
                   <input 
                     type="email" 
                     placeholder="BUSINESS EMAIL" 
                     className="w-full bg-neutral-50 px-8 py-5 rounded-2xl text-[13px] font-bold tracking-widest focus:outline-none focus:bg-white focus:ring-4 focus:ring-black/3 transition-all duration-300 border border-transparent focus:border-neutral-200"
                   />
                </motion.div>

                {/* Dropdowns Zoom */}
                <motion.div style={{ scale: fieldScale2 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-3">
                      <span className="text-[12px] font-bold uppercase tracking-widest text-neutral-400 ml-2">Budget</span>
                      <div className="relative group">
                         <select className="w-full bg-neutral-50 px-8 py-5 rounded-2xl text-[13px] font-bold tracking-widest appearance-none cursor-pointer focus:outline-none focus:bg-white focus:ring-4 focus:ring-black/3 transition-all duration-300 border border-transparent focus:border-neutral-200">
                            <option>$1000 - $5000</option>
                            <option>$5000 - $10000</option>
                            <option>$10000+</option>
                         </select>
                         <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none transition-transform group-focus-within:rotate-180" size={18} />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <span className="text-[12px] font-bold uppercase tracking-widest text-neutral-400 ml-2">Service</span>
                      <div className="relative group">
                         <select className="w-full bg-neutral-50 px-8 py-5 rounded-2xl text-[13px] font-bold tracking-widest appearance-none cursor-pointer focus:outline-none focus:bg-white focus:ring-4 focus:ring-black/3 transition-all duration-300 border border-transparent focus:border-neutral-200">
                            <option>CONSULTANCY</option>
                            <option>DESIGN</option>
                            <option>DEVELOPMENT</option>
                         </select>
                         <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none transition-transform group-focus-within:rotate-180" size={18} />
                      </div>
                   </div>
                </motion.div>

                {/* Message Zoom */}
                <motion.div style={{ scale: fieldScale3 }} className="space-y-3">
                   <textarea 
                     placeholder="MESSAGE" 
                     rows={4}
                     className="w-full bg-neutral-50 px-8 py-6 rounded-3xl text-[13px] font-bold tracking-widest focus:outline-none focus:bg-white focus:ring-4 focus:ring-black/3 transition-all duration-300 border border-transparent focus:border-neutral-200 resize-none"
                   />
                </motion.div>

                {/* Button Zoom */}
                <motion.button 
                  style={{ scale: fieldScale4 }}
                  className="flex items-center gap-5 group mt-4 focus:outline-none"
                >
                   <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:rotate-90 group-hover:scale-105 group-focus:scale-95">
                      <Plus className="text-white" size={24} />
                   </div>
                   <span className="text-[15px] font-bold uppercase tracking-[0.2em] text-black">
                      Let's Talk
                   </span>
                </motion.button>
             </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
