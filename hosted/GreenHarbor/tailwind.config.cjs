/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #FF4B2B, #FF416C)',
      },
      colors: {
        'custom-red': '#FF416C',
        'custom-orange': '#FF4B2B',
      },
    },
  },
  plugins: [],
} 