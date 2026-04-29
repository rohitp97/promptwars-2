/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B35",
        secondary: "#1A6B3C",
        accent: "#003580",
        background: "#FAFAF8",
        surface: "#FFFFFF",
        textMain: "#1A1A1A",
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
