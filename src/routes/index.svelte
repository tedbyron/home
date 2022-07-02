<script lang="ts">
  import { quadInOut } from 'svelte/easing'
  import { fade } from 'svelte/transition'
  import Search from 'virtual:icons/tabler/search'
  import X from 'virtual:icons/tabler/x'

  let input: HTMLInputElement
  let value: string

  const clearInput = (): void => {
    value = ''
    input.focus()
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta property="og:title" content="Home" />
</svelte:head>

<section class="flex min-h-full flex-col items-center justify-center px-4 pt-4">
  <form
    action="/"
    method="get"
    id="search-form"
    class="flex w-full max-w-lg rounded-2xl bg-home-darker-800"
  >
    <div id="search-button" class="flex items-center rounded-l-2xl p-3">
      <Search />
    </div>

    <!-- svelte-ignore a11y-autofocus -->
    <input
      autofocus
      autocomplete="off"
      autocapitalize="off"
      autocorrect="off"
      id="search-input"
      name="q"
      bind:value
      bind:this={input}
      aria-label="Search query"
      class:rounded-r-2xl={!value}
      class="grow py-3 text-xl tracking-wide"
    />

    {#if value}
      <button
        type="button"
        id="search-clear"
        on:click={clearInput}
        transition:fade={{ duration: 300, easing: quadInOut }}
        class="rounded-r-2xl p-3"
      >
        <X />
      </button>
    {/if}
  </form>
</section>
