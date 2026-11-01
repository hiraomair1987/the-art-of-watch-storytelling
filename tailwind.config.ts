import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        plum: { 950: "#14030f", 900: "#1f0519", 800: "#330a2b", 700: "#4a0c40" },
        brand: "#610955",
        maroon: "#351321",
        terracotta: "#a7583a",
        sand: "#c8aaa2",
        violet: { 300: "#e4a8f2", 400: "#a47bff", 500: "#8456f0" },
        accent: "#f07ac8",
        cream: { DEFAULT: "#f6efe6", muted: "rgba(246, 239, 230, 0.7)" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
