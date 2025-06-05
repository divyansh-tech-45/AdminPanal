import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5750F1",
          light: "rgba(87, 80, 241, 0.07)",
        },
        dark: {
          DEFAULT: "#111928",
          "2": "#1F2937",
          "3": "#374151",
          "4": "#4B5563",
          "5": "#6B7280",
          "6": "#9CA3AF",
          dark: "#020D1A",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
