/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      transitionDelay: {
        0: '0ms'
      },
      colors: {
        primary: '#00E676',
        secondary: '#00B0FF',
        special: '#F50057',
        muted: '#757575'
      },
      fontFamily: {
        caviar: ['CaviarDreams', 'sans-serif'],
        squids: ['GameOfSquids', 'cursive']
      },
      backgroundImage: {
        main: 'linear-gradient(to right bottom, rgba(50, 50, 50, 0.9), rgba(0, 0, 0, 0.9)), url("../public/images/cover.jpg")',
        gradient: 'linear-gradient(to right bottom, #414345, #232526)',
        gif_home: 'url("../public/images/naruto.gif")',
        gif_game_1: 'url("../public/images/sonic_1.gif")',
        gif_game_2: 'url("../public/images/sonic_2.gif")'
      },
      gridAutoRows: {
        13: '13rem'
      }
    }
  },
  plugins: []
}
