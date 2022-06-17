module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'prettier'
  ],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs', 'svelte.config.js'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2022,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true
  }
}
