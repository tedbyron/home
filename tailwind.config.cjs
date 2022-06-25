// const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.svelte'],
  theme: {
    extend: {
      colors: {
        'home-black': '#282a36',
        'home-gray': '#44475a',
        'home-white': '#f8f8f2',
        'home-slate': '#6272a4',
        'home-cyan': '#8be9fd',
        'home-green': '#50fa7b',
        'home-orange': '#ffb86c',
        'home-pink': '#ff79c6',
        'home-purple': '#bd93f9',
        'home-red': '#ff5555',
        'home-yellow': '#f1fa8c'
      },
      fontFamily: {
        // // @ts-expect-error
        // sans: [ '"Avenir LT Std"', ...defaultTheme.fontFamily.sans ],
        // // @ts-expect-error
        // serif: [ '"Baskerville URW"', ...defaultTheme.fontFamily.serif ]
      }
    },
    container: {
      center: true
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
