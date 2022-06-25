<script lang="ts">
  let className = ''
  export { className as class }

  const onSubmit = () => {}
</script>

<form on:submit|preventDefault={onSubmit} class="flex flex-col {className}">
  <!--  -->
</form>
