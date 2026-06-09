import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A", // PCD primary dark background
        "background-stitch": "#16130d", // Stitch container/base background
        foreground: "#e9e1d7",
        primary: "#e6c364", // Gold accent from Stitch
        secondary: "#e6c368",
        tertiary: "#b9c4ff",
        "gold-accent": "#C9A84C", // Primary Gold from PCD/Stitch
        "gold-light": "#E8C56A",
        "gold-muted": "#A0844A",
        "white-primary": "#F5F5F5",
        "white-secondary": "#BDBDBD",
        "white-muted": "#757575",
        surface: "#1A1A1A", // PCD surface container
        "surface-stitch": "#16130d",
        "surface-container": "#221f19",
        "surface-container-low": "#1e1b15",
        "surface-container-lowest": "#100e08",
        "surface-container-high": "#2d2a23",
        "surface-container-highest": "#38342d",
        "surface-variant": "#38342d",
        "on-background": "#e9e1d7",
        "on-surface": "#e9e1d7",
        "on-surface-variant": "#d0c5b2",
        outline: "#99907e",
        "outline-variant": "#4d4637",
        error: "#ffb4ab",
      },
      fontFamily: {
        bebas: ["var(--font-bebas-neue)", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      spacing: {
        "grid-margin": "40px",
        base: "8px",
        gutter: "24px",
        "section-gap-desktop": "120px",
        "section-gap-mobile": "64px",
      },
      boxShadow: {
        goldGlow: "0 0 15px rgba(201, 168, 76, 0.3)",
        cardHover: "0 0 30px rgba(201, 168, 76, 0.15)",
        goldGlowActive: "0 0 15px rgba(230, 195, 100, 0.4)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        fadeUp: "fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
