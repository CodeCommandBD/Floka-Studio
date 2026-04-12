<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

# 🎨 Floka Studio | Digital Agency

### High-End Digital Solutions for Modern Brands

<div align="center">
  <a href="https://floka-studio.vercel.app/">
    <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Deployed on Vercel" />
  </a>
  <a href="https://floka-studio.vercel.app/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-7c3aed?style=for-the-badge" alt="Live Demo" />
  </a>
</div>

<p align="center">
  A premium, performance-optimized digital agency landing page featuring immersive animations, smooth scrolling, and a cutting-edge visual aesthetic.
</p>

</div>

---

## 📋 Table of Contents

- [📖 Introduction](#-introduction)
- [✨ Key Features](#-key-features)
- [🎯 Feature Showcase](#-feature-showcase)
- [📊 System Architecture](#-system-architecture)
- [⚙️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🤝 Contributing](#-contributing)

---

## 📖 Introduction

**Floka Studio** is a state-of-the-art digital agency website designed to showcase high-end creative work. Built with **Next.js 16** and **React 19**, it prioritizes visual excellence and smooth user interactions. The platform features:

- 🪄 **Immersive GSAP Animations** for scroll-triggered excellence
- 🌊 **Smooth Scrolling** via Lenis integration
- ✨ **Framer Motion Micro-interactions** for a premium feel
- 📱 **Fully Responsive Layout** crafted with Tailwind CSS 4
- 🖱️ **Custom Interactive Cursor** for enhanced engagement
- 🧭 **Optimized Performance** with Next.js 16 features

---

## ✨ Key Features

### User Experience
- 🚀 **Fluid Navigation** - Seamless transitions between sections.
- 🎨 **Modern Aesthetics** - Dark/Light mode compatible (White theme default) with vibrant accents.
- 📏 **Precision Layouts** - Pixel-perfect components using Tailwind CSS 4.
- ⚡ **Performance First** - Optimized for high frame rates even with complex animations.

### Sections
- 🏠 **Hero Section** - Impactful entrance with particle effects or dynamic typography.
- 💼 **Portfolio Showcase** - High-resolution presentation of creative projects.
- 👥 **Team Reveal** - Interactive member profiles with hover effects.
- 📊 **Company Expertise** - Detailed breakdown of services and technical skills.
- 💬 **Testimonials & FAQs** - Clean, animated feedback and informational sections.
- 📧 **Contact Hub** - Integrated contact section for lead generation.

---

## 🎯 Feature Showcase

The interface is designed to be responsive, intuitive, and visually stunning.

### 🏠 Homepage & Interaction

| User Interface | Feature Details |
| :---: | :--- |
| <div align="center"><img src="./public/portfolio-1.webp" width="90%" /></div> | **Creative Portfolio**<br><br>A visually engaging grid featuring top-tier projects with hover-state reveals. |
| <div align="center"><img src="./public/video-banner-new.webp" width="90%" /></div> | **Video Reel**<br><br>Immersive high-definition video backgrounds for a grand cinematic experience. |
| <div align="center"><img src="./public/expertise-1.webp" width="90%" /></div> | **Expertise Showcase**<br><br>Dynamic presentation of core competencies and agency strengths. |

---

## 📊 System Architecture

### Frontend Data & Interaction Flow

```mermaid
graph TB
    User((User))
    Client[Next.js 16 App Router]
    Styles[Tailwind CSS 4]
    Animate[GSAP + Framer Motion]
    Scroll[Lenis Smooth Scroll]

    User -->|Interacts| Client
    Client -->|Applies| Styles
    Client -->|Triggers| Animate
    Client -->|Manages| Scroll
    
    Layout[src/app/layout.tsx]
    Pages[src/app/page.tsx]
    Components[src/components]
    
    Client --> Layout
    Layout --> Pages
    Pages --> Components
```

### Animation Orchestration

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant GSAP
    participant ScrollTrigger
    participant Component

    User->>Browser: Scrolls Page
    Browser->>GSAP: Update Scroll Position
    GSAP->>ScrollTrigger: Check Markers
    ScrollTrigger->>Component: Trigger Animation Class/Style
    Component-->>User: Visual Change (Fade/Slide/Scale)
```

---

## ⚙️ Tech Stack

### Core
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript

### Styling & Animation
- **Styling**: Tailwind CSS 4, CSS Variables
- **Animations**: GSAP (GreenSock), Framer Motion
- **Scrolling**: Lenis (@studio-freight/lenis)
- **Icons**: Lucide React

### Fonts
- **Typography**: Funnel Display (via Google Fonts)

---

## 📁 Project Structure

```bash
Floka-Studio/
├── public/                     # Static assets (images, logos, svgs)
├── src/
│   ├── app/                    # Next.js App Router (Layouts, Pages, Globals)
│   │   ├── layout.tsx          # Root layout with Navbar/SmoothScroll
│   │   ├── page.tsx            # Main landing page assembly
│   │   └── globals.css         # Global styles & Tailwind directives
│   ├── components/             # Reusable UI components (Hero, Portfolio, etc.)
│   │   ├── Navbar.tsx          # Dynamic navigation
│   │   ├── Hero.tsx            # Main entrance component
│   │   └── ...                 # Other layout sections
│   └── lib/                    # Utility functions and configurations
│
├── tailwind.config.ts          # Tailwind configuration (if applicable)
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18.x or higher
- **npm/yarn/pnpm**: Package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeCommandBD/Floka-Studio.git
   cd Floka-Studio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` (or the port specified in your terminal)

---

## 🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  <b>Elevating Digital Experiences. Built with Passion. 🚀</b>
</div>
