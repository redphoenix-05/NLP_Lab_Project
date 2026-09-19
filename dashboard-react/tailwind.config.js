/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#090A0D",
          surface: "#111318",
          secondary: "#17191F",
        },
        border: {
          subtle: "#252832",
          hover: "#343846",
          accent: "#8B5CF6",
        },
        text: {
          primary: "#F5F7FA",
          secondary: "#8B919D",
          muted: "#5A606E",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          hover: "#7C3AED",
          light: "#A78BFA",
          subtle: "rgba(139, 92, 246, 0.12)",
          border: "rgba(139, 92, 246, 0.28)",
        },
        sarcastic: {
          DEFAULT: "#F43F5E",
          subtle: "rgba(244, 63, 94, 0.12)",
          border: "rgba(244, 63, 94, 0.28)",
        },
        clean: {
          DEFAULT: "#10B981",
          subtle: "rgba(16, 185, 129, 0.12)",
          border: "rgba(16, 185, 129, 0.28)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: "0 0 24px -4px rgba(139, 92, 246, 0.25)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
}
