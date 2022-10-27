/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        gridshift: {
          '0%': {
            transform: 'translateY(0%)'
          },
          '100%': {
            transform: 'translateY(100%)'
          }
        }
      },
      animation: {
        gridshift: 'gridshift 5s linear infinite'
      },
      colors: {
        primary: '#00E676',
        secondary: '#00B0FF',
        muted: '#757575'
      },
      fontFamily: {
        caviar: ['CaviarDreams', 'sans-serif'],
        squids: ['GameOfSquids', 'cursive']
      },
      backgroundImage: {
        // cover: 'linear-gradient(to right bottom, #414345, #232526)'
        cover: 'linear-gradient(to right bottom, rgba(50, 50, 50, 0.9), rgba(0, 0, 0, 0.9)), url("../public/images/cover.jpg")'
      }
    }
  },
  plugins: []
}
