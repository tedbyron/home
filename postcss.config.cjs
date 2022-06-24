module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      preset: 'cssnano-preset-advanced',
      convertValues: { length: true },
      discardComments: { removeAll: true }
    }
  }
}
