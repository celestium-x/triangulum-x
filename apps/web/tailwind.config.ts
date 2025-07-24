// tailwind.config.ts or tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Geist Mono"', "monospace"],
      },
      colors: {
        dark: {
          base: "#242424",
        },
      },
    },
  },
  plugins: [],
};

export default config;
