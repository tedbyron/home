import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import icons from 'unplugin-icons/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({ postcss: true }),
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/components',
      $routes: 'src/routes',
      $stores: 'src/stores'
    },
    csp: {
      directives: {
        'default-src': ['self']
      }
    },
    vite: {
      plugins: [icons({ compiler: 'svelte' })],
      clearScreen: false,
      envPrefix: 'HOME_'
    }
  }
}

export default config
