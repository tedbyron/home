<script lang="ts">
  import Search from 'virtual:icons/tabler/search'

  let formClass = ''
  export { formClass as class }
  let value = ''

  const search = async (): Promise<void> => {}
</script>

<form on:submit|preventDefault={search} class="flex rounded-2xl bg-home-darker-800 {formClass}">
  <!-- svelte-ignore a11y-autofocus -->
  <input autofocus autocorrect="off" bind:value class="grow rounded-l-2xl px-4 py-3" />
  <button class="rounded-r-2xl p-3">
    <Search />
  </button>
</form>
