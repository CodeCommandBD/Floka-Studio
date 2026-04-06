"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Nicolas K. Ellington",
    role: "IT Specialist",
    rating: 5,
    text: "As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.",
    layoutVariant: "authorTop",
  },
  {
    id: 2,
    name: "Julian T. Beaumont",
    role: "IT Specialist",
    rating: 5,
    text: "As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.",
    layoutVariant: "authorBottom",
  },
  {
    id: 3,
    name: "Felipe D. Hawthorne",
    role: "IT Specialist",
    rating: 5,
    text: "As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.",
    layoutVariant: "authorTop",
  },
  {
    id: 4,
    name: "Alex Thompson",
    role: "CEO at TechFlow",
    rating: 5,
    text: "As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.",
    layoutVariant: "authorBottom",
  },
  {
    id: 5,
    name: "Emma Davis",
    role: "Creative Lead",
    rating: 4.9,
    text: "As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.",
    layoutVariant: "authorTop",
  },
  {
    id: 6,
    name: "Lisa Wang",
    role: "Design Lead",
    rating: 5,
    text: "As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.",
    layoutVariant: "authorBottom",
  },
];

const TestimonialCard = ({ item }: { item: typeof testimonials[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col gap-3 group cursor-default"
    >
      {/* Author Box - Top Variant (Animates from Top) */}
      {item.layoutVariant === "authorTop" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm border border-neutral-100/50 overflow-hidden"
        >
          {/* Animated Background Filler (From Top) */}
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: isHovered ? "0%" : "-100%" }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0 bg-black z-0"
          />
          
          <div className="relative z-10">
            <motion.h4 
              animate={{ color: isHovered ? "#ffffff" : "#000000" }}
              className="font-bold text-[16px] tracking-tight"
            >
              {item.name}
            </motion.h4>
            <motion.p 
              animate={{ color: isHovered ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)" }}
              className="text-[12px] font-medium uppercase tracking-wider mt-1"
            >
              {item.role}
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Feedback Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative bg-white p-8 md:p-12 rounded-[40px] md:rounded-[48px] shadow-sm border border-neutral-100/50 flex flex-col justify-between min-h-[340px] transition-transform duration-500 overflow-hidden"
      >
        {/* Animated Background Filler (Direction depends on Variant) */}
        <motion.div 
          initial={{ y: item.layoutVariant === "authorTop" ? "100%" : "-100%" }}
          animate={{ y: isHovered ? "0%" : (item.layoutVariant === "authorTop" ? "100%" : "-100%") }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.05 }}
          className="absolute inset-0 bg-black z-0"
        />

        <div className="relative z-10 flex flex-col justify-between h-full grow">
          <div>
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-orange-500 text-orange-500" />
              ))}
            </div>
            <motion.p 
              animate={{ color: isHovered ? "#ffffff" : "#262626" }}
              className="text-[18px] md:text-[21px] leading-normal font-normal"
            >
              " {item.text} "
            </motion.p>
          </div>
          <motion.div 
            animate={{ color: isHovered ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)" }}
            className="mt-12 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            " GREAT DESIGN SOLUTIONS "
          </motion.div>
        </div>
      </motion.div>

      {/* Author Box - Bottom Variant (Animates from Bottom) */}
      {item.layoutVariant === "authorBottom" && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm border border-neutral-100/50 overflow-hidden"
        >
          {/* Animated Background Filler (From Bottom) */}
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: isHovered ? "0%" : "100%" }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
            className="absolute inset-0 bg-black z-0"
          />

          <div className="relative z-10">
            <motion.h4 
              animate={{ color: isHovered ? "#ffffff" : "#000000" }}
              className="font-bold text-[16px] tracking-tight"
            >
              {item.name}
            </motion.h4>
            <motion.p 
              animate={{ color: isHovered ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)" }}
              className="text-[12px] font-medium uppercase tracking-wider mt-1"
            >
              {item.role}
            </motion.p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="w-full bg-[#f8f8f8] pt-2 pb-32 px-6 overflow-hidden">
      <div className="max-w-[1340px] mx-auto">
        {/* Section Header */}
        <div className="mb-24">
          <div className="flex flex-col gap-6">
            <div className="w-full flex flex-col gap-2">
               <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-black">
                User Feedbacks
              </span>
              <div className="w-full h-px bg-neutral-200" />
            </div>
            
            <div className="relative mt-4 flex justify-end">
              <h2 className="text-[28px] md:text-[45px] lg:text-[55px] font-normal tracking-tight leading-[1.1] text-black max-w-[900px] text-left">
                Accelerating growth, and unlocking new potential.
                <span className="inline-flex items-center align-middle mx-4 -mt-1">
                  <div className="flex -space-x-3">
                    {/* Placeholder users matching screenshot avatars */}
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-4 border-[#f8f8f8] overflow-hidden relative">
                      <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User" fill className="object-cover" />
                    </div>
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-4 border-[#f8f8f8] overflow-hidden relative">
                      <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User" fill className="object-cover" />
                    </div>
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-4 border-[#f8f8f8] overflow-hidden relative">
                      <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User" fill className="object-cover" />
                    </div>
                  </div>
                </span>
                Let's build your brand—together.
              </h2>
            </div>
          </div>
        </div>

        {/* Aligned Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            <TestimonialCard item={testimonials[0]} />
            <TestimonialCard item={testimonials[3]} />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8">
            <TestimonialCard item={testimonials[1]} />
            <TestimonialCard item={testimonials[4]} />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8">
            <TestimonialCard item={testimonials[2]} />
            <TestimonialCard item={testimonials[5]} />
          </div>
        </div>
      </div>
    </section>
  );
}
