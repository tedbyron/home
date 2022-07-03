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
  corepack prepare pnpm@7.5.0 --activate
  corepack enable pnpm
  pnpm setup
  ```

- Install all dependencies and start the development server

  ```
  pnpm i
  pnpm dev
  ```

- View available scripts

  ```
  pnpm run
  ```

- Build and preview the website

  ```
  pnpm build && pnpm preview
  ```

## Reference

- [`@sveltejs/adapter-cloudflare`](https://github.com/sveltejs/kit/tree/master/packages/adapter-cloudflare#readme)
- [KV API](https://developers.cloudflare.com/workers/runtime-apis/kv)
- [KV Limits](https://developers.cloudflare.com/workers/platform/limits/#kv-limits)
