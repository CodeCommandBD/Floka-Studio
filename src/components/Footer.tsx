"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-10 px-6 md:px-12 relative z-50 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[12px] font-bold text-black tracking-widest uppercase">
          © 2024 Floka Studio. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-[12px] font-bold text-black hover:opacity-70 transition-opacity tracking-widest uppercase"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[12px] font-bold text-black hover:opacity-70 transition-opacity tracking-widest uppercase"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
