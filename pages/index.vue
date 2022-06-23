<script setup lang="ts">
  definePageMeta({
    layout: 'default'
  })

  useHead({
    title: 'Home',
    meta: [{ property: 'og:title', content: 'Home' }]
  })

  const onSubmit = async () => {
    // do stuff
  }
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex">
      <input type="text" />
      <button class="px-3 rounded-r-lg">submit</button>
    </div>
  </form>
</template>
