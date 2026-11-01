import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        plum: { 950: "#12061a", 900: "#1a0a24", 800: "#261134", 700: "#371a4a" },
        violet: { 300: "#c4a6ff", 400: "#a47bff", 500: "#8456f0" },
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
