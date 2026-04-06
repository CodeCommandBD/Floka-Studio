'use client';

import React from 'react';

const TeamReveal: React.FC = () => {
  const marqueeText = "how our team combines creativity, technology, and strategy — ";

  return (
    <section className="relative w-full py-4 md:py-8 bg-[#F9F9F9] overflow-hidden" style={{ fontFamily: 'var(--font-funnel), sans-serif' }}>
      {/* Centered Spotlight Container (NARROWER SPOTLIGHT) */}
      <div 
        className="relative w-full overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, black 15%, black 85%, rgba(0,0,0,0.15) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 0%, black 15%, black 85%, rgba(0,0,0,0.15) 100%)'
        }}
      >
        {/* The Seamless Auto-moving Marquee */}
        <div className="flex whitespace-nowrap animate-marquee-seamless hover:pause w-fit">
          <div className="flex items-center pr-10">
            <h2 className="text-6xl md:text-[5rem] font-normal text-black/90 -tracking-[0.05em] lowercase leading-[1.2] py-2">
              {marqueeText}
            </h2>
          </div>
          {/* Exact duplicate for seamless loop */}
          <div className="flex items-center pr-10">
            <h2 className="text-6xl md:text-[5rem] font-normal text-black/90 -tracking-[0.05em] lowercase leading-[1.2] py-2">
              {marqueeText}
            </h2>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee-seamless {
          display: flex;
          animation: marquee 12s linear infinite;
        }
        .pause:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TeamReveal;
