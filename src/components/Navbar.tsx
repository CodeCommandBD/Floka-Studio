"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Pages", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Blog", href: "#" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      
      // Refined logic to eliminate any 'flick' during scroll-down
      if (currentScrollY <= 120) {
        // Absolute at top
        setIsVisible(true);
        setIsSticky(false);
      } else if (scrollingDown) {
        // Scrolling down - let it scroll away naturally in absolute/invisible state
        setIsVisible(false);
        // Don't flip to sticky/fixed yet to avoid the flick
      } else if (!scrollingDown && currentScrollY > 250) {
        // Scrolling up - only now become fixed sticky
        setIsVisible(true);
        setIsSticky(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      ref={navRef}
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.35, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={cn(
        "left-0 right-0 z-50 transition-all duration-300",
        isSticky 
          ? "fixed top-0 shadow-md bg-white py-1" 
          : "absolute top-0 bg-white py-3 md:py-4 shadow-sm" // White bg and reduced padding
      )}
    >
      <nav className="flex items-center justify-between h-[65px] px-8 md:px-16 max-w-[1800px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {/* F icon in black square */}
          <div className="w-9 h-9 bg-black flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-base leading-none">
              F
            </span>
          </div>
          <span className="text-black font-semibold text-xl tracking-tight">
            Floka
          </span>
        </Link>

        {/* Desktop Nav Links — centered */}
        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-black text-sm font-medium hover:opacity-60 transition-opacity duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="mailto:info@floka.com"
            className="text-black text-sm font-medium hover:opacity-60 transition-opacity"
          >
            info@floka.com
          </Link>
          {/* Grid/dots menu icon */}
          <button
            className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <GridIcon />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} className="text-black" /> : <Menu size={22} className="text-black" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-black text-base font-medium hover:opacity-60 transition-opacity"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="mailto:info@floka.com" className="text-black text-base font-medium hover:opacity-60 transition-opacity">
            info@floka.com
          </Link>
        </div>
      )}
    </motion.header>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="7" height="7" rx="1" fill="black" />
      <rect x="11" y="0" width="7" height="7" rx="1" fill="black" />
      <rect x="0" y="11" width="7" height="7" rx="1" fill="black" />
      <rect x="11" y="11" width="7" height="7" rx="1" fill="black" />
    </svg>
  );
}
