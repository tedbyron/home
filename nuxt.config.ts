import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'description', content: 'Customizable home page with search shortcuts' },
        { property: 'og:description', content: 'Customizable home page with search shortcuts' },
        { property: 'og:type', content: 'website' }
      ]
    }
  },
  colorMode: {
    preference: 'light',
    dataValue: 'theme'
  },
  experimental: {
    reactivityTransform: true
  },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  nitro: {
    preset: 'cloudflare'
  },
  postcss: {
    plugins: {
      cssnano: {
        preset: 'cssnano-preset-advanced',
        convertValues: { length: true },
        discardComments: { removeAll: true }
      }
    }
  },
  ssr: false,
  telemetry: false,
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true
  }
})
