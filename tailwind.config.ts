import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hvac: {
          primary: "#0F4C81", // Deep Corporate HVAC Blue
          primaryDark: "#0B3961",
          primaryLight: "#1E68A8",
          secondary: "#FF6B00", // Vibrant HVAC Orange CTA
          secondaryHover: "#E56000",
          accent: "#16A34A", // Fresh Green Trust
          accentHover: "#15803D",
          bg: "#F8FAFC", // Clean Background
          navy: "#0F172A", // Dark slate navy text/bg
          surface: "#FFFFFF",
          muted: "#64748B",
        },
        brand: {
          50: "#F0F7FF",
          100: "#E0F0FF",
          200: "#BAE0FF",
          500: "#0F4C81",
          600: "#0B3961",
          700: "#082947",
          800: "#061F36",
          900: "#041424",
          navy: "#0F172A",
        },
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        'hvac': '20px',
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(15, 76, 129, 0.25)',
        'glow-orange': '0 0 25px -5px rgba(255, 107, 0, 0.35)',
        'card-soft': '0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 20px 40px -15px rgba(15, 76, 129, 0.15), 0 8px 12px -6px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
export default config;

