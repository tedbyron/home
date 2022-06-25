module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano:
      process.env.NODE_ENV === 'development'
        ? false
        : {
            preset: 'cssnano-preset-advanced',
            convertValues: { length: true },
            discardComments: { removeAll: true }
          }
  }
}
