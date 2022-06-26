<script lang="ts">
  import '../app.css'
</script>

<svelte:head>
  <meta name="description" content="Customizable home page with search shortcuts" />
  <meta property="og:description" content="Customizable home page with search shortcuts" />
</svelte:head>

<div class="container flex min-h-screen flex-col">
  <header>
    <slot name="header" />
  </header>

  <main class="grow">
    <slot />
  </main>

  <footer>
    <slot name="footer" />
  </footer>
</div>
