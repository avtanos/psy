import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0D3941",
          50:  "#F1F6F4",
          100: "#DDE9E5",
          200: "#B5CCC4",
          300: "#82A89D",
          400: "#4A7B70",
          500: "#1F5A52",
          600: "#13464A",
          700: "#0D3941",
          800: "#092A30",
          900: "#051C20",
        },
        mint: {
          50:  "#F4F8F5",
          100: "#E6EFE8",
          200: "#CFE0D3",
          300: "#A9C4B0",
          400: "#7BA68A",
          500: "#578E6B",
          600: "#3F7256",
          700: "#305945",
        },
        cream: {
          50:  "#FAF7F2",
          100: "#F2EDE2",
          200: "#E3DAC4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 4px 20px -8px rgba(13, 57, 65, 0.08)",
        card: "0 2px 10px -2px rgba(13, 57, 65, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
