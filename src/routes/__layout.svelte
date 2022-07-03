<script lang="ts">
  import '../app.css'
</script>

<svelte:head>
  <meta name="description" content="Customizable home page with search shortcuts" />
  <meta property="og:description" content="Customizable home page with search shortcuts" />
</svelte:head>

<div class="container flex h-full max-w-screen-xl flex-col">
  <header>
    <slot name="header" />
  </header>

  <main class="h-full">
    <slot />
  </main>

  <footer>
    <slot name="footer" />
  </footer>
</div>
