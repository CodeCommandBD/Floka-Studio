import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Floka Studio | Digital Agency",
  description: "High-end digital solutions for modern brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${funnelDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-white text-black"
        style={{ fontFamily: "var(--font-funnel), sans-serif" }}
        suppressHydrationWarning
      >
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        
        {/* Global Fading Bottom Blur Effect for Scroll */}
        <div
          className="fixed bottom-0 left-0 right-0 pointer-events-none z-50 h-24 sm:h-32"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          }}
        />
      </body>
    </html>
  );
}
