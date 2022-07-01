<script lang="ts">
  import Search from 'virtual:icons/tabler/search'

  let formClass = ''
  export { formClass as class }
</script>

<form
  action="/"
  method="get"
  id="search-form"
  class="flex rounded-2xl bg-home-darker-800 {formClass}"
>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    autofocus
    autocorrect="off"
    aria-label="Search query"
    id="search-input"
    name="q"
    class="grow rounded-l-2xl px-4 py-3"
  />

  <button id="search-button" class="rounded-r-2xl p-3">
    <Search />
  </button>
</form>
