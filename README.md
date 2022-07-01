<div align="center">
  <h1><code>home</code></h1>
  <p><strong>Customizable home page with search shortcuts</strong></p>
</div>

TODO:

- better project name
- conditional css import
- homepage modules

# Development

- Clone the repo

  ```
  git clone https://github.com/tedbyron/home
  gh repo clone tedbyron/home
  ```

- Install node 16 with your favorite node version manager

  ```
  nvm install --lts=gallium --latest-npm
  ```

- Enable `pnpm` with corepack, or install it manually (<https://pnpm.io/installation>)

  ```
  corepack prepare pnpm@7.4.1 --activate
  corepack enable pnpm
  pnpm setup
  ```

- Install all dependencies and start the development server

  ```
  pnpm i
  pnpm dev
  ```
