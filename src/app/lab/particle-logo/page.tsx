import React from "react";
import Link from "next/link";
import ParticleLogo from "@/components/ParticleLogo";
import { ArrowLeft } from "lucide-react";

export default function ParticleLabPage() {
  return (
    <main className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
            <Link 
                href="/" 
                className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors uppercase text-[10px] tracking-[0.4em] font-bold"
            >
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-all">
                    <ArrowLeft size={16} />
                </div>
                Return to Studio
            </Link>
            
            <div className="flex flex-col items-end">
                <span className="text-white/20 text-[9px] uppercase tracking-widest leading-none">
                    Expt: 001 — Particle Logo
                </span>
                <span className="text-white/40 text-[9px] uppercase tracking-widest mt-1">
                    Powered by GSAP & Canvas
                </span>
            </div>
        </div>

        {/* The Particle Engine */}
        <div className="w-full h-full">
            <ParticleLogo />
        </div>

        {/* Footer info */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-30">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.5em]">
                Interactive Lab Experiment &copy; 2025 Floka Studio
            </p>
        </div>
    </main>
  );
}
