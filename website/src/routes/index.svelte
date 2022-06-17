<script lang="ts">
  import octicons from '@primer/octicons'
  import LoadingIcon from '$lib/components/LoadingIcon.svelte'

  let query = ''
  let loading = false

  const onSubmit = async (): Promise<void> => {
    // TODO
  }

  const searchIcon = octicons.search.toSVG({
    'aria-label': 'Search',
    fill: 'currentColor'
  })
</script>

<svelte:head>
  <title>Home</title>
  <meta property="og:title" content="Home" />
</svelte:head>

<section class="container my-6 flex flex-col items-center overflow-hidden">
  <form on:submit|preventDefault={onSubmit} class="w-full max-w-md px-3 sm:px-0">
    <div
      class="
        flex
        border border-h-white rounded-lg
        focus-within:outline-none
        focus-within:ring-2 focus-within:ring-h-purple
        focus-within:border-h-purple
      "
    >
      <!-- svelte-ignore a11y-autofocus -->
      <input type="text" autofocus bind:value={query} class="grow py-3 pl-3 rounded-l-lg" />

      <button
        class="px-3 rounded-r-lg transition-colors {loading
          ? 'pointer-events-none'
          : 'hover:bg-h-gray/50 hover:text-h-purple focus-visible:bg-h-gray/50 focus-visible:text-h-purple'}"
      >
        {#if loading}
          <LoadingIcon />
        {:else}
          {@html searchIcon}
        {/if}
      </button>
    </div>
  </form>
</section>
