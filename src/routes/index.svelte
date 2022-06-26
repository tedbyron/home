<script lang="ts">
  import Search from '$components/Search.svelte'
</script>

<svelte:head>
  <title>Home</title>
  <meta property="og:title" content="Home" />
</svelte:head>

<div class="flex grow flex-col items-center justify-center">
  <Search class="w-full max-w-md" />
</div>
