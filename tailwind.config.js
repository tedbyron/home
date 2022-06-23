const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.vue'],
  theme: {
    extend: {
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
  plugins: [require('@tailwindcss/typography')],
}
