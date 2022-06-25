<svelte:head>
  <meta name="description" content="Customizable home page with search shortcuts" />
</svelte:head>

<header>
  <slot name="header">
    <!-- TODO -->
  </slot>
</header>

<main>
  <slot />
</main>

<footer>
  <slot name="footer">
    <!-- TODO -->
  </slot>
</footer>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    :root {
      @apply bg-home-white text-home-black
      dark:bg-home-black dark:text-home-white;
    }

    :root,
    body,
    main {
      @apply min-h-full;
    }
  }
</style>
