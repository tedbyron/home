module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['svelte3', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:n/recommended',
    'plugin:promise/recommended',
    'prettier'
  ],
  ignorePatterns: ['*.cjs', 'svelte.config.js'],
  overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.svelte', '.ts']
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    },
    'svelte3/typescript': () => require('typescript')
  },
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      impliedStrict: true
    },
    extraFileExtensions: ['.svelte'],
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  rules: {
    'n/no-unpublished-import': [0, { allow: ['@sveltejs/kit', 'svelte'] }],
    // eslint-plugin-import covers this
    'n/no-missing-import': 'off'
  }
}
