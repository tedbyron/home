import path from 'path'

import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({ postcss: true }),
  kit: {
    adapter: adapter(),
    csp: {
      directives: {
        'default-src': ['self']
      }
    },
    prerender: {
      default: true
    },
    vite: {
      resolve: {
        alias: {
          $routes: path.resolve('src', 'routes'),
          $stores: path.resolve('src', 'stores')
        }
      }
    }
  }
}

export default config
