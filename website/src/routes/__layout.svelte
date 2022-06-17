<script lang="ts" context="module">
  import '../app.css'
</script>

<script lang="ts">
  import { page } from '$app/stores'
</script>

<svelte:head>
  <meta name="description" content="Customizable search shortcuts and home page" />
  <meta name="url" content={$page.url.href} />
  <meta name="color-scheme" content="#0ea5e9" />
  <meta property="og:description" content="Customizable search shortcuts and home page" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />
</svelte:head>

<slot />
