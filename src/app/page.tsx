"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import TeamReveal from "@/components/TeamReveal";
import Portfolio from "@/components/Portfolio";
import FunFacts from "@/components/FunFacts";
import CompanyExpertise from "@/components/CompanyExpertise";
import HappyUsers from "@/components/HappyUsers";
import VideoReel from "@/components/VideoReel";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Awards from "@/components/Awards";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Global performance configuration
    gsap.config({
      force3D: true, // Forces hardware acceleration on all animations
    });

    // Final refresh on window load (when all images are done)
    const handleLoad = () => {
      ScrollTrigger.refresh();
      // Force a resize event to trigger internal GSAP recalculation
      window.dispatchEvent(new Event("resize"));
    };

    window.addEventListener("load", handleLoad);

    // Global refresh after stabilization delay (for HMR and slower components)
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event("resize"));
    }, 1500);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", handleLoad);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main className="flex flex-col w-full bg-white relative overflow-x-clip">
      <ScrollToTop />
      <Hero />
      <Approach />
      <TeamReveal />
      <Portfolio />
      <CompanyExpertise />
      <FunFacts />
      <HappyUsers />
      <VideoReel />
      <Testimonials />
      <ContactSection />
      <Awards />
      <Team />
      <FAQ />
      <Insights />
      <Contact />
      <Footer />
    </main>
  );
}
