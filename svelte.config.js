import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import autoImport from 'unplugin-auto-import/vite'

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
      plugins: [
        autoImport({
          imports: ['svelte', 'svelte/store', 'svelte/easing', 'svelte/transition'],
          dirs: ['src/components', 'src/lib', 'src/stores'],
          dts: 'src/auto-import.d.ts',
          eslintrc: {
            enabled: true
          }
        })
      ],
      clearScreen: false,
      envPrefix: 'HOME_'
    }
  }
}

export default config
