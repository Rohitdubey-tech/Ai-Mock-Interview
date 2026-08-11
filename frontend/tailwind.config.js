/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#08090d", // Ultra-dark obsidian space
        surface: "#11121a", // Deep card surface
        surfaceHover: "#181924", // Hovered card surface
        cardBg: "#141520", // Main card background
        primary: "#a78bfa", // Soft lavender accent button fill
        primaryHover: "#8b5cf6", // Hover lavender accent
        secondary: "#60a5fa", // Bright blue
        accent: "#34d399", // Emerald success green
        warning: "#f87171", // Soft red error
        border: "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glass': 'linear-gradient(135deg, rgba(30, 27, 75, 0.6) 0%, rgba(17, 18, 26, 0.95) 100%)',
        'card-glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(17, 18, 26, 0.8) 100%)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
