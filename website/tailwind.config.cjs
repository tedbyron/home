// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      colors: {
        'h-black': '#282a36',
        'h-gray': '#44475a',
        'h-white': '#f8f8f2',
        'h-slate': '#6272a4',
        'h-cyan': '#8be9fd',
        'h-green': '#50fa7b',
        'h-orange': '#ffb86c',
        'h-pink': '#ff79c6',
        'h-purple': '#bd93f9',
        'h-red': '#ff5555',
        'h-yellow': '#f1fa8c'
      }
      // fontFamily: {
      //   sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      //   serif: ['"Fredoka One"', ...defaultTheme.fontFamily.serif]
      // }
    },
    container: {
      center: true
    }
  }
}
