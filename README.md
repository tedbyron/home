<div align="center">
  <h1><code>home</code></h1>
  <p><strong>Customizable home page with search shortcuts</strong></p>
</div>

TODO: better project name

# Development

Node 16 and pnpm package manager are required.

```sh
# install node 16 with your favorite node version manager
nvm install --lts=gallium --latest-npm

# install pnpm with corepack (or manually)
corepack enable pnpm

# install dependencies for all workspace packages
pnpm i

# view available scripts for the entire workspace
pnpm run
```

### Website

```sh
# view available scripts in the website dir
pnpm run
```

### Worker

```sh
# install rustup, the rust toolchain manager
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# add the wasm32-unknown-unknown compilation target
rustup target add wasm32-unknown-unknown

# install wasm-pack and worker-build binaries
cargo install wasm-pack worker-build

# view available scripts in the worker dir
pnpm run
```
