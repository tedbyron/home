import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({ postcss: true }),
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/lib/components',
      $routes: 'src/routes',
      $stores: 'src/stores'
    },
    csp: {
      directives: {
        'default-src': ['self']
      }
    },
    vite: {
      clearScreen: false,
      envPrefix: 'HOME_'
    }
  }
}

export default config
