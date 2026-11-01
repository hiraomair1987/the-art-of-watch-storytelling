import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        plum: { 950: "#14030f", 900: "#1f0519", 800: "#330a2b", 700: "#4a0c40" },
        brand: "#5d0755",
        maroon: "#371321",
        terracotta: "#a75337",
        sand: "#c8aaa2",
        violet: { 300: "#a0d3f1", 400: "#279fe5", 500: "#1a7dc4" },
        blue: { DEFAULT: "#1a7dc4", bright: "#279fe5", light: "#a0d3f1", pale: "#e8f5fd" },
        navy: "#0d1b2a",
        accent: "#a0d3f1",
        cream: { DEFAULT: "#eeebe4", muted: "rgba(238, 235, 228, 0.7)" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        heavy: ["var(--font-heavy)", "Arial Black", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
