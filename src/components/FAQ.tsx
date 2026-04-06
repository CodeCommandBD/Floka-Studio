"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const FAQ_DATA = [
  {
    id: 1,
    question: "What is artificial intelligence (AI)?",
    answer: "Explore how we transform ideas into extraordinary digital experiences. Each case study is a testament to our design thinking, strategic approach, and creative execution.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    question: "How does AI improve business efficiency?",
    answer: "Explore how we transform ideas into extraordinary digital experiences. Each case study is a testament to our design thinking, strategic approach, and creative execution.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    question: "How long does AI implementation take?",
    answer: "Explore how we transform ideas into extraordinary digital experiences. Each case study is a testament to our design thinking, strategic approach, and creative execution.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    question: "What industries can benefit from AI?",
    answer: "Explore how we transform ideas into extraordinary digital experiences. Each case study is a testament to our design thinking, strategic approach, and creative execution.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    question: "What are the costs of AI solutions?",
    answer: "Explore how we transform ideas into extraordinary digital experiences. Each case study is a testament to our design thinking, strategic approach, and creative execution.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
  }
];

const FAQItem = ({ item, isOpen, onClick, index }: { item: typeof FAQ_DATA[0], isOpen: boolean, onClick: () => void, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-4 bg-white rounded-[24px] overflow-hidden border border-black/5 shadow-sm"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-7 md:p-8 text-left hover:bg-black/5 transition-colors duration-400 group"
      >
        <span className="text-[18px] md:text-[22px] font-bold tracking-tight text-black leading-snug">
          {item.question}
        </span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-black text-white rotate-180' : 'bg-black text-white'}`}>
           {isOpen ? (
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
           ) : (
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
           )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-7 md:px-8 pb-10 border-t border-black/5 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 items-center">
                
                {/* Accordion Image */}
                <div className="rounded-[20px] overflow-hidden bg-neutral-100 w-full" style={{ height: "220px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.question}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-8">
                  <p className="text-[16px] md:text-[18px] text-neutral-500 leading-relaxed font-medium">
                    {item.answer}
                  </p>
                  
                  {/* Internal Button */}
                  <div className="flex items-center gap-4 group/btn cursor-pointer max-w-fit">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center transition-transform duration-500 group-hover/btn:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                    <span className="text-[12px] font-bold uppercase tracking-widest text-black">GET IN TOUCH</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(2); // Second item open by default as in screenshot
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const dividerX = useTransform(scrollYProgress, [0, 1], ["-15%", "5%"]);

  return (
    <section className="w-full bg-[#fafafa] pt-0 pb-28 md:pb-36 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header Area - Badge & Divider */}
        <div className="flex flex-col gap-10 mb-16">
          <motion.div
            initial={{ x: "50px", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-black/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
              FAQ & GET ANSWER
            </span>
          </motion.div>
          <div className="w-full h-px bg-black/[0.06]" />
        </div>

        {/* Main Headline - Offset to the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mb-28">
           <div className="lg:col-start-5 lg:col-span-8">
              <h2 className="text-[38px] md:text-[54px] lg:text-[74px] font-extrabold tracking-tighter leading-[1] text-black relative z-20 flex flex-col gap-4">
                {["Have more questions?", "We've answers."].map((line, i) => (
                  <span key={i} className="inline-block pb-[0.2em] -mb-[0.2em]">
                    <motion.span
                      initial={{ x: "60%", opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: false, amount: 0.1 }}
                      transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block"
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h2>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20 lg:gap-32 items-start">
          
          {/* Left Column Sticky - Supporting Content */}
          <div className="flex flex-col lg:sticky lg:top-32">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: false, amount: 0.1 }}
               className="flex flex-col gap-10"
            >
              <p className="text-[17px] md:text-[19px] text-neutral-500 max-w-[420px] leading-relaxed">
                Don't found anything yet. Feel free to ask anything. <span className="text-black font-bold border-b border-black cursor-pointer hover:opacity-70 transition-opacity">Let's Talk</span>
              </p>

              {/* Side Featured Image */}
              <div className="relative w-full aspect-[1.15/1] rounded-[32px] overflow-hidden shadow-2xl shadow-black/5 bg-[#eee]">
                <Image 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop" 
                  alt="FAQ support"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Accordion List */}
          <div className="flex flex-col">
            {FAQ_DATA.map((item, idx) => (
              <FAQItem 
                key={item.id} 
                item={item} 
                isOpen={openId === item.id} 
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                index={idx}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Scrolling Dotted Divider */}
      <div ref={containerRef} className="w-full mt-28 md:mt-40 overflow-hidden relative border-t border-transparent pt-10">
        <motion.div 
          style={{ x: dividerX }}
          className="flex items-center whitespace-nowrap min-w-[200vw]"
        >
          
          {/* Dashes */}
          <div className="flex-1 flex items-center gap-[60px]">
            {Array.from({ length: 150 }).map((_, i) => (
              <div key={i} className="w-[2px] h-[10px] bg-black/50 shrink-0" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
