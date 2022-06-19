<script lang="ts">
  import { page } from '$app/stores'

  let colorScheme = '#282a36'
  if (matchMedia('(prefers-color-scheme: light)').matches) {
    colorScheme = '#f8f8f2'
  }
</script>

<svelte:head>
  <meta name="description" content="Customizable home page with search shortcuts" />
  <meta name="url" content={$page.url.href} />
  <meta name="color-scheme" content={colorScheme} />
  <meta property="og:description" content="Customizable home page with search shortcuts" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />
</svelte:head>

<slot />

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    :root {
      @apply bg-h-white text-h-black dark:bg-h-black dark:text-h-white;
    }

    [type='text'] {
      @apply bg-h-white dark:bg-h-black;
    }

    a:focus-visible,
    [type='text']:focus-visible,
    button:focus-visible {
      @apply outline-none;
    }
  }
</style>
