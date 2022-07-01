module.exports = {
  plugins:
    process.env.NODE_ENV === 'development'
      ? { tailwindcss: {}, autoprefixer: {} }
      : {
          tailwindcss: {},
          autoprefixer: {},
          cssnano: {
            preset: 'cssnano-preset-advanced',
            convertValues: { length: true }
          }
        }
}
