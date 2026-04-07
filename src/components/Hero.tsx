"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ParticleLogo from "@/components/ParticleLogo";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (isTouch) {
        // Mobile: simple fade only — no scale, shorter duration
        tl.from([cardRef.current, descRef.current], {
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        });
      } else {
        // Desktop: full cinematic animation
        tl.from(imgRef.current, {
          scale: 1.06,
          opacity: 0,
          duration: 1.4,
        })
          .from(cardRef.current, { y: 40, opacity: 0, duration: 0.9 }, "-=0.6");

        const textElements = descRef.current?.querySelectorAll(".animate-text");
        if (textElements && textElements.length > 0) {
          tl.from(textElements, { 
            y: 30, 
            opacity: 0, 
            duration: 0.8,
            stagger: 0.1,
            ease: "expo.out"
          }, "-=0.5");
        }
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-[82vh] lg:h-screen"
      style={{
        paddingTop: "100px", // updated for white navbar height
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      {/* Hero image/video container with rounded corners — fills remaining viewport */}
      <div
        ref={imgRef}
        className="relative mx-3 md:mx-5 overflow-hidden rounded-[18px]"
        style={{
          height: "100%",
        }}
        suppressHydrationWarning
      >
        {/* ── Background: Particle Animation ── */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto" suppressHydrationWarning>
            <ParticleLogo />
        </div>

        {/* Subtle dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0) 75%)",
          }}
          suppressHydrationWarning
        />

        {/* ── Content Container (Centered & Symmetrical) ── */}
        <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 md:pb-[5%] px-5 z-10 pointer-events-none" suppressHydrationWarning>
          <div className="flex flex-col items-center gap-6 pointer-events-auto w-full max-w-[500px]">
            {/* White/Glass floating card */}
            <motion.div
              ref={cardRef}
              style={{
                borderRadius: "24px",
                boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
                padding: "12px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              className="bg-white/10 border border-white/10 flex flex-row items-stretch overflow-hidden w-full transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Profile photo */}
              <div
                className="relative shrink-0 overflow-hidden"
                style={{ 
                    width: "110px", 
                    height: "110px", 
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                }}
              >
                <Image
                  src="/profile.webp"
                  alt="Shanto Kumar Das"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Card text content */}
              <div className="flex flex-col justify-center px-4 md:px-6 py-2 flex-1">
                <div>
                  <p
                    className="uppercase font-semibold"
                    style={{
                      fontSize: "10px",
                      color: "#FFD700", // Matched Gold
                      letterSpacing: "0.2em",
                    }}
                  >
                    Head of Idea
                  </p>
                  <p
                    className="text-white font-bold mt-1 leading-tight tracking-tight"
                    style={{ fontSize: "19px" }}
                  >
                    Shanto Kumar Das
                  </p>
                </div>
                {/* LET'S TALK Button */}
                <button 
                    className="flex items-center gap-3 mt-4 group w-max transition-all"
                >
                  <span className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                    <span
                      className="text-white group-hover:text-black font-light leading-none"
                      style={{ fontSize: "22px", marginTop: "-3px" }}
                    >
                      +
                    </span>
                  </span>
                  <span
                    className="text-white/80 group-hover:text-white font-bold uppercase tracking-[0.2em] transition-all duration-300"
                    style={{ fontSize: "11px" }}
                  >
                    Let&apos;s Talk
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Description text — Centered & Refined */}
            <div
              ref={descRef}
              className="text-center w-full flex flex-col items-center px-4"
            >
              <p
                className="text-white/90 font-semibold animate-text overflow-hidden"
                style={{ fontSize: "clamp(16px, 1.5vw, 20px)", lineHeight: 1.4 }}
              >
                No cookie-cutter websites. No fluff.
              </p>
              <p
                className="animate-text overflow-hidden"
                style={{
                  fontSize: "clamp(13px, 1vw, 15px)",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                  marginTop: "8px",
                  maxWidth: "400px"
                }}
              >
                Just real tools and smart strategies to grow your business and
                elevate your brand.
              </p>
            </div>
          </div>
          {/* Symmetrical Scroll Indicator */}
          <div className="mt-8 flex flex-col items-center opacity-40 animate-bounce">
            <div className="w-px h-12 bg-linear-to-b from-white/0 via-white to-white/0" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-white mt-4 font-bold">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
