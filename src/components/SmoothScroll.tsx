"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // ✅ Lenis only on desktop
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // Register ScrollTrigger to GSAP
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4, // Silky glide duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      lerp: 0.1, // Added linear interpolation for consistent smoothness
      infinite: false,
    });

    // Synchronize Lenis with ScrollTrigger
    // This is the most crucial part for smooth scroll-triggered animations
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

