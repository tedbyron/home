// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      //   serif: ['"Fredoka One"', ...defaultTheme.fontFamily.serif]
      // }
    },
    container: {
      center: true
    }
  },
  plugins: []
}
