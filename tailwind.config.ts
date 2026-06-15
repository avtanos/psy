import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1F4E5F",
          50:  "#F1F6F8",
          100: "#DCE8EC",
          200: "#B7D1D8",
          300: "#8FB6C0",
          400: "#5C8E9C",
          500: "#1F4E5F",
          600: "#1A4350",
          700: "#153642",
          800: "#102932",
          900: "#0B1D24"
        }
      },
      fontFamily: {
        sans: ["system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
