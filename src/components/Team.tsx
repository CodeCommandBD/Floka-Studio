"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

// Custom SVG Icons to avoid lucide-react version conflicts
const SocialIcon = ({ type }: { type: string }) => {
  if (type === "facebook") return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
  if (type === "twitter") return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
  if (type === "linkedin") return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
  return null;
};

const teamMembers = [
  {
    id: 1,
    name: "Nicolas K. Ellington",
    role: "FOUNDER",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=600&auto=format&fit=crop",
    socials: ["facebook", "twitter", "linkedin"]
  },
  {
    id: 2,
    name: "Carlos E. Ashcroft",
    role: "CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    socials: ["facebook", "twitter", "linkedin"]
  },
  {
    id: 3,
    name: "Leonardo F. Ashton",
    role: "UX DESIGNER",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    socials: ["facebook", "twitter", "linkedin"]
  },
  {
    id: 4,
    name: "Ricardo P. Winslow",
    role: "UI DESIGNER",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    socials: ["facebook", "twitter", "linkedin"]
  }
];

const TeamCard = ({ member, index }: { member: typeof teamMembers[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Magnetic Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-1, 1], ["-8deg", "8deg"]);
  const rotateY = useTransform(springX, [-1, 1], ["8deg", "-8deg"]);
  const translateX = useTransform(springX, [-1, 1], ["-15px", "15px"]);
  const translateY = useTransform(springY, [-1, 1], ["-15px", "15px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 2);
    mouseY.set(y * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
      className="bg-[#f2f2f2] rounded-[32px] p-3 lg:p-4 flex flex-col gap-6 group cursor-pointer border border-transparent hover:border-black/5 transition-all duration-500 shadow-sm"
    >
      {/* Image Container with Parallax Tilt (Studio Portrait orientation) */}
      <div className="relative aspect-4/5 rounded-[24px] overflow-hidden bg-[#dfcfb9]">
        <motion.div 
            style={{ x: translateX, y: translateY, rotateX, rotateY, scale: 1.15 }}
            className="w-full h-full relative"
        >
          <Image 
            src={member.image} 
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Name and Role */}
        <div className="flex flex-col gap-2">
          <h4 className="text-[20px] md:text-[22px] font-bold tracking-tight text-black leading-tight">{member.name}</h4>
          <span className="text-[12px] font-bold uppercase tracking-widest text-[#999]">{member.role}</span>
        </div>

        {/* Social Icons Style from reference */}
        <div className="flex items-center gap-2">
          {member.socials.map((social) => (
            <div 
              key={social}
              className="w-10 h-10 rounded-lg bg-white border border-black/5 flex items-center justify-center group/social hover:bg-black transition-all duration-400"
            >
              <span className="text-black group-hover/social:text-white transition-colors">
                <SocialIcon type={social} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedHeadline = ({ text }: { text: string }) => {
  const lines = [
    "Meet with our",
    "team member"
  ];
  
  return (
    <h2 className="text-[38px] md:text-[54px] lg:text-[64px] font-bold tracking-tight leading-[1.05] text-black mb-14 relative z-20 flex flex-col">
      {lines.map((line, i) => (
        <span key={i} className="inline-block pb-[0.2em]">
          <motion.span
            initial={{ x: "10%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
            className="inline-block relative"
          >
             {line}
             {i === 1 && ( // Decorative circle at the end of the last line
               <motion.span 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                 className="absolute -right-16 top-1/2 -translate-y-1/2 hidden lg:inline-block"
               >
                 <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                   <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                 </div>
               </motion.span>
             )}
          </motion.span>
        </span>
      ))}
    </h2>
  );
};

export default function Team() {
  const [activeTab, setActiveTab] = useState("DESIGN TEAM");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Horizontal Scroll Parallax for the landscape image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xParallax = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]);

  return (
    <section className="w-full bg-[#fafafa] py-28 md:py-36 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-20 lg:gap-32 items-start">
          
          {/* Left Sticky Column */}
          <div className="flex flex-col lg:sticky lg:top-32 h-full">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              className="px-4 py-1.5 bg-black/5 rounded-full max-w-fit mb-10"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                OUR AVENGERS
              </span>
            </motion.div>

            <AnimatedHeadline text="Meet with our team member" />

            {/* Filter Tabs */}
            <div className="flex items-center gap-10 mb-12 relative">
              {["DESIGN TEAM", "DEVELOPMENT TEAM"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all relative py-2 ${
                    activeTab === tab ? "text-black" : "text-neutral-400 hover:text-black"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTeamTab"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-black"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: 0.3 }}
              className="text-[17px] md:text-[19px] text-neutral-500 mb-14 max-w-[480px] leading-relaxed"
            >
              What began over coffee-fueled brainstorming sessions has grown into a thriving digital agency dedicated to helping brands stand out.
            </motion.p>

            {/* JOIN US Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              className="flex items-center gap-5 group cursor-pointer max-w-fit mb-24"
            >
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:rotate-90"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <span className="text-[13px] font-bold uppercase tracking-wider text-black">JOIN WITH US</span>
            </motion.div>

            {/* Featured Team Image Landscape with Scroll Parallax */}
            <div ref={containerRef} className="relative w-full aspect-4/3 md:aspect-3/2 rounded-[40px] overflow-hidden shadow-xl shadow-black/5 bg-[#eee] min-h-[250px] z-10">
              <motion.div style={{ x: xParallax, scale: 1.2 }} className="w-full h-full relative">
                <Image 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                  alt="Our Creative Studio"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Infinite Staggered Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {teamMembers.map((member, idx) => (
              <TeamCard key={member.id} member={member} index={idx} />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
