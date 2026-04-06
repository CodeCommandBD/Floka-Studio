"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!visible) setVisible(true);

      // Dot snaps to cursor immediately
      gsap.set(dot, {
        x: mouseX - 4,
        y: mouseY - 4,
      });
    };

    // Ring follows with smooth lag (lerp)
    const tick = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      gsap.set(ring, {
        x: ringX - 18,
        y: ringY - 18,
      });

      rafId = requestAnimationFrame(tick);
    };

    // Scale up ring when hovering interactive elements
    const onEnter = () => {
      gsap.to(ring, { scale: 1.8, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.2, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const onEnterNoCursor = () => setVisible(false);
    const onLeaveNoCursor = () => setVisible(true);

    const addListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

      const noCursorElements = document.querySelectorAll("[data-no-cursor]");
      noCursorElements.forEach((el) => {
        el.addEventListener("mouseenter", onEnterNoCursor);
        el.addEventListener("mouseleave", onLeaveNoCursor);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);

    // slight delay so DOM is ready
    setTimeout(addListeners, 500);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Don't render anything on touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) setIsTouch(true);
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 w-9 h-9 rounded-full border-[1.5px] border-white z-99999 opacity-0 mix-blend-difference will-change-transform transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
          backgroundColor: "transparent",
        }}
      />

      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-99999 opacity-0 mix-blend-difference will-change-transform transition-opacity duration-300"
        style={{
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
