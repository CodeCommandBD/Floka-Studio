"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const MOBILE_VIDEO_SRC = "/Hero-video.mp4";
const DESKTOP_VIDEO_SRC = "/hero-pc.mp4";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState(DESKTOP_VIDEO_SRC);
  const flokaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    // Handle responsive video switching to prevent running two videos
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    setVideoSrc(mediaQuery.matches ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC);
    
    const handler = (e: MediaQueryListEvent) => {
      setVideoSrc(e.matches ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC);
    };
    mediaQuery.addEventListener("change", handler);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (isTouch) {
        // Mobile: simple fade only — no scale, shorter duration
        tl.from([flokaRef.current, cardRef.current, descRef.current], {
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
          .from(flokaRef.current, { y: 60, opacity: 0, duration: 1 }, "-=0.8")
          .from(cardRef.current, { y: 40, opacity: 0, duration: 0.9 }, "-=0.6")
          .from(descRef.current, { y: 20, opacity: 0, duration: 0.7 }, "-=0.5");
      }
    }, containerRef);

    return () => {
      ctx.revert();
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-[82vh] lg:h-screen"
      style={{
        paddingTop: "60px", // navbar height
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
      >
        {/* ── Background: Video ── */}
        <video
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ 
            pointerEvents: "none",
            transform: "translateZ(0)", 
            willChange: "transform" 
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Subtle dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0) 75%)",
          }}
        />

        {/* ── Content Container (Responsive Stack on Mobile, Row on Desktop) ── */}
        <div className="absolute inset-x-5 md:inset-x-10 bottom-6 md:bottom-[5%] flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 lg:gap-0 z-10 pointer-events-none">
          {/* ── Left: Floka + Studio ── */}
          <div
            ref={flokaRef}
            className="flex flex-col self-start select-none pointer-events-auto"
            style={{ lineHeight: 1 }}
          >
            <h1
              className="text-white leading-none self-start"
              style={{
                fontSize: "clamp(80px, 20vw, 240px)",
                fontWeight: 400,
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
              }}
            >
              Floka
            </h1>
            <p
              className="self-end"
              style={{
                fontSize: "clamp(38px, 8.5vw, 85px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
                color: "rgba(255,255,255,0.35)",
                marginTop: "-8px",
                paddingRight: "0.15em",
              }}
            >
              Studio
            </p>
          </div>

          {/* ── Right side: card + description ── */}
          <div className="flex flex-col items-start lg:items-end gap-5 pointer-events-auto w-full lg:w-auto">
            {/* White floating card */}
            <div
              ref={cardRef}
              className="bg-white flex flex-row items-stretch overflow-hidden w-full lg:w-[clamp(300px,30vw,400px)] max-w-[400px]"
              style={{
                borderRadius: "18px",
                boxShadow: "0 15px 50px rgba(0,0,0,0.15)",
                padding: "10px",
              }}
            >
              {/* Profile photo — square with rounded corners inside the card */}
              <div
                className="relative shrink-0 overflow-hidden"
                style={{ width: "110px", height: "110px", borderRadius: "12px" }}
              >
                <Image
                  src="/almond-nelsi.png"
                  alt="Almond D. Nelsi"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Card text content */}
              <div className="flex flex-col justify-center px-4 md:px-5 py-2 flex-1">
                <div>
                  <p
                    className="uppercase font-semibold"
                    style={{
                      fontSize: "10px",
                      color: "#C8984A",
                      letterSpacing: "0.15em",
                    }}
                  >
                    Head of Idea
                  </p>
                  <p
                    className="text-black font-bold mt-1 leading-tight tracking-tight"
                    style={{ fontSize: "17px" }}
                  >
                    Almond D. Nelsi
                  </p>
                </div>
                {/* LET'S TALK */}
                <button className="flex items-center gap-3 mt-4 group w-max">
                  <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center shrink-0 group-hover:bg-gray-800 transition-colors">
                    <span
                      className="text-white font-light leading-none"
                      style={{ fontSize: "20px", marginTop: "-2px" }}
                    >
                      +
                    </span>
                  </span>
                  <span
                    className="text-black font-semibold uppercase tracking-[0.15em]"
                    style={{ fontSize: "11px" }}
                  >
                    Let&apos;s Talk
                  </span>
                </button>
              </div>
            </div>

            {/* Description text — below card */}
            <div
              ref={descRef}
              className="text-left lg:text-right w-full"
              style={{ maxWidth: "clamp(280px, 25vw, 340px)" }}
            >
              <p
                className="text-white font-semibold"
                style={{ fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.4 }}
              >
                No cookie-cutter websites. No fluff.
              </p>
              <p
                style={{
                  fontSize: "clamp(12px, 0.95vw, 14px)",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  marginTop: "6px",
                }}
              >
                Just real tools and smart strategies to grow your business and
                elevate your brand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
