module.exports = {
  root: true,
  extends: ['@tedbyron/eslint-config-svelte3', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
}
