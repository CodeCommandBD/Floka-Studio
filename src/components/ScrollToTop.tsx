"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
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
          key="scroll-to-top-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-999 cursor-pointer"
        >
          <div className="relative w-14 h-14 flex items-center justify-center bg-black rounded-full overflow-hidden border border-white/10 shadow-2xl">
             <svg className="absolute inset-0 w-full h-full -rotate-90">
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
}
