import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: {
        plum: {
          950: "#0f0614",
          900: "#160a1d",
          800: "#1f0f29",
          700: "#2c1639",
          600: "#3b1e4c",
        },
        violet: {
          glow: "#9f84ff",
          soft: "#c7b6ff",
        },
        magenta: {
          DEFAULT: "#e2559f",
          soft: "#f08cc0",
        },
        cream: {
          DEFAULT: "#f5eee6",
          muted: "#d9cfd6",
          dim: "#a99bab",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
