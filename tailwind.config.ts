import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Тёплый лесной/шалфейный зелёный (header, primary, заголовки)
        brand: {
          DEFAULT: "#234C3C",
          50:  "#F0F4F1",
          100: "#DCE7DF",
          200: "#BCD0C2",
          300: "#92B19E",
          400: "#5F8A72",
          500: "#3C6650",
          600: "#2C5141",
          700: "#234C3C",
          800: "#1A382C",
          900: "#11241D",
        },
        // Мягкий шалфей для иконок-кружков, бейджей, акцентов
        mint: {
          50:  "#F2F4EB",
          100: "#E4E9D6",
          200: "#CFD9BB",
          300: "#B2C396",
          400: "#8FA86E",
          500: "#6E8C4C",
          600: "#54703A",
          700: "#3F562C",
        },
        // Тёплый кремовый фон и поверхности
        cream: {
          50:  "#F7F2E8",
          100: "#F0E8D7",
          200: "#E4D7BD",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        display: ["var(--font-lora)", "Georgia", "Cambria", "serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(30, 58, 46, 0.12)",
        card: "0 2px 14px -4px rgba(30, 58, 46, 0.08)",
        float: "0 20px 50px -20px rgba(30, 58, 46, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
