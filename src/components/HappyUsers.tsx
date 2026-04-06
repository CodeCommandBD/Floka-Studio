"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Layers, BarChart, Globe, Zap, Box, Compass } from "lucide-react";

const logos = [
  { id: 1, name: "TechFlow", icon: <Cpu size={40} /> },
  { id: 2, name: "Layered", icon: <Layers size={40} /> },
  { id: 3, name: "DataViz", icon: <BarChart size={40} /> },
  { id: 4, name: "Globalize", icon: <Globe size={40} /> },
  { id: 5, name: "QuickZap", icon: <Zap size={40} /> },
  { id: 6, name: "Boxed", icon: <Box size={40} /> },
  { id: 7, name: "Navi", icon: <Compass size={40} /> },
];

export default function HappyUsers() {
  return (
    <section className="w-full bg-white border-t border-black/5 pb-2">
      {/* Upper Header Bar */}
      <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-start md:items-center border-x border-black/5">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
          Happy Users
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/30 mt-2 md:mt-0">
          ©2025 FLOKA™ STUDIO — GLOBAL DESIGN PARTNER
        </span>
      </div>

      {/* Grid Container */}
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-neutral-100 rounded-[48px] overflow-hidden bg-white shadow-sm">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`group relative h-64 flex flex-col items-center justify-center p-12 border-neutral-100 bg-white
                ${(index + 1) % 4 !== 0 ? 'lg:border-r' : ''} 
                ${(index + 1) % 2 !== 0 ? 'sm:border-r' : ''}
                ${index < 4 ? 'lg:border-b' : ''}
                ${index < 6 ? 'sm:border-b' : 'border-b sm:border-b-0'}
                border-b lg:border-b-0
                transition-colors duration-500`}
            >
              <div className="text-black group-hover:scale-105 transition-all duration-500 flex flex-col items-center">
                {logo.icon}
                {/* Small dot/circle decoration for the second logo as per screenshot */}
                {logo.id === 2 && (
                  <div className="mt-2 w-6 h-6 rounded-full border border-black/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-black/40" />
                  </div>
                )}
              </div>
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-black/60">
                {logo.name}
              </span>
            </motion.div>
          ))}

          {/* Last CTA Box - Pure White Background */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="group relative h-64 flex flex-col items-center justify-center p-12 border-neutral-100 bg-white cursor-pointer transition-colors duration-500"
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400">
                Next can be you.
              </span>
              <h3 className="text-[15px] font-bold uppercase tracking-widest text-black group-hover:scale-105 transition-transform">
                Let's Talk
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
