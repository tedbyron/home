module.exports = {
  root: true,
  extends: ['@tedbyron/eslint-config-svelte3', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2022
  },
  env: {
    browser: true,
    node: true
  }
}
