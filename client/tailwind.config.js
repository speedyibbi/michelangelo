/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caviar: ["CaviarDreams", "sans-serif"],
        squids: ["GameOfSquids", "cursive"],
      },
    },
  },
  plugins: [],
}
