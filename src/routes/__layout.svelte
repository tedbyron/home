<svelte:head>
  <meta name="description" content="Customizable home page with search shortcuts" />
</svelte:head>

<header>
  <slot name="header">
    <!-- TODO -->
  </slot>
</header>

<slot />

<footer>
  <slot name="footer">
    <!-- TODO -->
  </slot>
</footer>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
