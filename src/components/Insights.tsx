"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const INSIGHTS_DATA = [
  {
    id: 1,
    type: "text-black",
    category: "WEB3",
    date: "NOV 07, 2025",
    title: "Seamless user interfaces, crafted with intent.",
    className: "lg:col-span-4"
  },
  {
    id: 2,
    type: "image",
    category: "WEB3",
    date: "NOV 07, 2025",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
    className: "lg:col-span-4"
  },
  {
    id: 3,
    type: "text-black",
    category: "WEB3",
    date: "NOV 07, 2025",
    title: "Immersive virtual journeys, built with precision",
    className: "lg:col-span-4"
  },
  {
    id: 4,
    type: "image",
    category: "WEB3",
    date: "NOV 07, 2025",
    image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=800&auto=format&fit=crop",
    className: "lg:col-span-4"
  },
  {
    id: 5,
    type: "text-white",
    category: "WEB3",
    date: "NOV 07, 2025",
    title: "Creative web platforms, designed for growth.",
    className: "lg:col-span-4"
  },
  {
    id: 6,
    type: "image",
    category: "WEB3",
    date: "NOV 07, 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    className: "lg:col-span-4"
  }
];

const BlogCard = ({ item, index }: { item: typeof INSIGHTS_DATA[0], index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isImageContainer = item.type.startsWith("image");
  const isBlack = item.type === "text-black";
  const isWhite = item.type === "text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`relative group rounded-[28px] overflow-hidden transition-all duration-500 ${item.className} ${
        isBlack ? "bg-black p-5 md:p-6 min-h-[190px] flex flex-col justify-between cursor-pointer" : 
        isWhite ? "bg-white p-5 md:p-6 border border-neutral-100 min-h-[190px] flex flex-col justify-between cursor-pointer" : 
        "aspect-4/3 cursor-none"
      }`}
    >
      {/* Radial Hover Glow for Text Cards */}
      {(isBlack || isWhite) && (
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${
              isBlack ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.03)"
            }, transparent 80%)`,
          }}
        />
      )}

      {isImageContainer ? (
        <>
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img
            src={item.image!} 
            alt={item.title || "Blog post"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Custom Mouse Following Circle */}
          <motion.div
            className="pointer-events-none absolute top-0 left-0 w-16 h-16 bg-white rounded-full flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl"
            style={{
               x: mouseX,
               y: mouseY,
               translateX: "-50%",
               translateY: "-50%"
            }}
          >
             <div className="w-1.5 h-1.5 bg-black rounded-full" />
          </motion.div>
          
          {/* Bottom Left Plus Button - Still used for visual indicator */}
          <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
        </>
      ) : (
        <div className="relative z-20 flex flex-col h-full">
          <div className="flex items-center gap-5 mb-5">
            <span className={`text-[9px] font-bold tracking-widest ${isBlack ? "text-white" : "text-black"}`}>{item.category}</span>
            <span className={`text-[9px] font-bold tracking-widest ${isBlack ? "text-neutral-500" : "text-neutral-400"}`}>{item.date}</span>
          </div>
          <h3 className={`text-[18px] md:text-[20px] font-bold leading-tight tracking-tight mt-auto ${isBlack ? "text-white" : "text-black"}`}>
            {item.title}
          </h3>
        </div>
      )}
    </motion.div>
  );
};

export default function Insights() {
  return (
    <section className="w-full bg-[#fcfcfc] py-16 md:py-24 px-6 overflow-hidden relative z-20">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              className="px-4 py-1 bg-black/5 rounded-full max-w-fit mb-4"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                INSIGHTS
              </span>
            </motion.div>

            <h2 className="text-[38px] md:text-[54px] lg:text-[74px] font-extrabold tracking-tighter leading-[1] text-black max-w-[800px]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="inline-block"
              >
                Company blog & updates
              </motion.span>
            </h2>
        </div>

        {/* Symmetrical 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
          
          {/* Column 1 */}
          <div className="lg:col-span-4 flex flex-col gap-3">
             <BlogCard item={INSIGHTS_DATA[0]} index={0} />
             <BlogCard item={INSIGHTS_DATA[3]} index={3} />
          </div>

          {/* Column 2 - Swapped Order */}
          <div className="lg:col-span-4 flex flex-col gap-3">
             <BlogCard item={INSIGHTS_DATA[1]} index={1} />
             <BlogCard item={INSIGHTS_DATA[4]} index={4} />
          </div>

          {/* Column 3 */}
          <div className="lg:col-span-4 flex flex-col gap-3">
             <BlogCard item={INSIGHTS_DATA[2]} index={2} />
             <BlogCard item={INSIGHTS_DATA[5]} index={5} />
          </div>

        </div>
      </div>
    </section>
  );
}
