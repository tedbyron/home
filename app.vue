<script setup lang="ts">
  const colorMode = useColorMode()
  const themes = [
    'light',
    'dark',
    'acid',
    'aqua',
    'autumn',
    'black',
    'bumblebee',
    'business',
    'cmyk',
    'coffee',
    'corporate',
    'cupcake',
    'cyberpunk',
    'dracula',
    'emerald',
    'fantasy',
    'forest',
    'garden',
    'halloween',
    'lemonade',
    'lofi',
    'luxury',
    'night',
    'pastel',
    'retro',
    'synthwave',
    'valentine',
    'winter',
    'wireframe'
  ]
</script>

<template>
  <section class="container">
    <select class="select" v-model="colorMode.preference">
      <option disabled selected>Theme</option>
      <option v-for="theme of themes" :key="theme">{{ theme }}</option>
    </select>
  </section>
</template>
