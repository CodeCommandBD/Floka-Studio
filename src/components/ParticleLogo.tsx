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
    img.src = "/floka-logo.svg";
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

      // RESPONSIVE SCALING & POSITIONING
      const isSmallScreen = window.innerWidth < 1024;
      
      // Scale: 50% width on desktop/large laptop, 80% on small screens
      const scaleMultiplier = isSmallScreen ? 0.8 : 0.5;
      const imgWidth = Math.min(canvas.width * scaleMultiplier, 500); 
      const ratio = img.width / img.height;
      const imgHeight = imgWidth / ratio;
      
      const startX = (canvas.width - imgWidth) / 2;
      
      // TARGET CENTER: 15% on small screens, 25% on desktop
      const targetCenterY = isSmallScreen ? canvas.height * 0.15 : canvas.height * 0.25;
      const startY = targetCenterY - imgHeight / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, startX, startY, imgWidth, imgHeight);

      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // REDUCED DENSITY for Performance: gap: 2.8, size: 1
      const gap = 2.8;
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
              color: "#FFD700", // Golden premium feel
              size: 1, // High resolution dots
              vx: 0,
              vy: 0,
              friction: 0.92, // SILKY DECELERATION
              ease: 0.05,    // SLOW BUT STEADY RETURN
            });
          }
        }
      }
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

        // INVERSE SQUARE REPULSION (Fluid & Stronger)
        if (dist < mRadius) {
            const force = (mRadius - dist) / mRadius;
            const angle = Math.atan2(dy, dx);
            const scattering = (repulsionPower / distSq) * force * 1.5; // Added slight boost
            
            p.vx -= Math.cos(angle) * scattering;
            p.vy -= Math.sin(angle) * scattering;
            
            // Dynamic color shift when near mouse
            if (dist < 50) {
                p.color = "#FFFACD"; // Brighter LemonChiffon gold when active
            } else {
                p.color = "#FFD700";
            }
        } else {
            p.color = "#FFD700";
        }

        // FLUID MOTION (Adjusted ease and friction)
        p.vx += (p.originX - p.x) * (p.ease * 1.2); 
        p.vy += (p.originY - p.y) * (p.ease * 1.2); 

        // SLIGHT WAVE JITTER
        p.vx += (Math.random() * 0.15 - 0.075);
        p.vy += (Math.random() * 0.15 - 0.075);

        p.vx *= (p.friction - 0.02); // Slightly more snappy
        p.vy *= (p.friction - 0.02);

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
    gsap.ticker.add(render);

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-[#020617] overflow-hidden rounded-[inherit]">
        {/* Mesh Gradient Blobs — Optimized Blur */}
        <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-slate-500/5 blur-[60px] rounded-full hover:bg-slate-500/10 transition-colors duration-1000 pointer-events-none" />

        {/* Dynamic Glow behind particles — Performance Optimized */}
        <div 
            className="fixed w-[20vw] h-[20vw] bg-yellow-600/5 blur-[80px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 transition-opacity duration-300"
            style={{ left: mouse.current.x, top: mouse.current.y }}
        />
        <canvas ref={canvasRef} className="relative z-10 block" />
        
        {/* Cinematic Text Overlay (Responsive Position) */}
        <div className="absolute top-[15%] lg:top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 text-center mix-blend-difference">
            <h2 className="text-white/5 text-[clamp(40px,10vw,120px)] font-black uppercase tracking-tighter select-none leading-[0.9]">
                FLOKA STUDIO
            </h2>
        </div>
    </div>
  );
}
