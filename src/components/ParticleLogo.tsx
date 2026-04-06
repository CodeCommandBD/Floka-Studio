"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  friction: number;
  ease: number;
}

export default function ParticleLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, radius: 150 }); // Larger radius for scattering
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Load SVG 
    const img = new Image();
    img.src = "/bird-logo.svg";
    img.crossOrigin = "Anonymous";
    imageRef.current = img;

    img.onload = () => {
      init();
    };

    const init = () => {
      // Set canvas size
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Logo scaling logic
      const imgWidth = Math.min(canvas.width * 0.6, 500); 
      const ratio = img.width / img.height;
      const imgHeight = imgWidth / ratio;
      
      const startX = (canvas.width - imgWidth) / 2;
      const startY = (canvas.height - imgHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, startX, startY, imgWidth, imgHeight);

      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // HIGH DENSITY: gap: 1.5, size: 1
      const gap = 1.8;
      particles.current = [];

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
          const alpha = pixels[index + 3];

          if (alpha > 128) {
            particles.current.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              originX: x,
              originY: y,
              color: "#ffcc00",
              size: 1, // High resolution dots
              vx: 0,
              vy: 0,
              friction: 0.92, // SILKY DECELERATION
              ease: 0.05,    // SLOW BUT STEADY RETURN
            });
          }
        }
      }

      gsap.ticker.add(render);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mX = mouse.current.x;
      const mY = mouse.current.y;
      const mRadius = mouse.current.radius;
      const repulsionPower = 10000; // Strong base force

      particles.current.forEach((p) => {
        const dx = mX - p.x;
        const dy = mY - p.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        // INVERSE SQUARE REPULSION (High-end feel)
        if (dist < mRadius) {
            const force = (mRadius - dist) / mRadius;
            const angle = Math.atan2(dy, dx);
            const scattering = (repulsionPower / distSq) * force;
            
            p.vx -= Math.cos(angle) * scattering;
            p.vy -= Math.sin(angle) * scattering;
        }

        // SPRING-LIKE RETURN TO ORIGIN
        p.vx += (p.originX - p.x) * p.ease;
        p.vy += (p.originY - p.y) * p.ease;

        // RESTLESS MOTION (IDLE JITTER)
        p.vx += (Math.random() * 0.1 - 0.05);
        p.vy += (Math.random() * 0.1 - 0.05);

        p.vx *= p.friction;
        p.vy *= p.friction;

        p.x += p.vx;
        p.y += p.vy;

        // Fast drawing
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const handleResize = () => {
        init();
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-black cursor-none">
        {/* Glow behind particles */}
        <div 
            className="fixed w-48 h-48 bg-yellow-400/10 blur-[80px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 transition-opacity duration-300"
            style={{ left: mouse.current.x, top: mouse.current.y }}
        />
        <canvas ref={canvasRef} className="relative z-10 block" />
        
        {/* Cinematic Text Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 text-center mix-blend-difference">
            <h2 className="text-white/20 text-[clamp(40px,10vw,120px)] font-black uppercase tracking-tighter select-none">
                Interactive Lab
            </h2>
            <p className="text-white/40 text-[clamp(8px,1vw,12px)] uppercase tracking-[0.8em] mt-4">
                Dynamic Particle Interaction — Expt 001
            </p>
        </div>
    </div>
  );
}
