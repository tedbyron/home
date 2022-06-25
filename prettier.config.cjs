/** @type {import('prettier').Options} */
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'none'
}
