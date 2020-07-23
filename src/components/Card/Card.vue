<template>
  <div class="container">
    <div class="header">
      <slot name="header">header</slot>
    </div>
    <div class="body">
      <slot name="body">body</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HexCard'
}
</script>

<style scoped>
.container {
  @apply bg-gray-600 rounded-br-sm rounded-tl-sm rounded-bl-lg rounded-tr-lg grid grid-rows-2;
}

.header {
  @apply text-xl font-bold flex justify-center items-center row-span-1;
}

.body {
  @apply row-span-1 flex justify-center items-center;
}
</style>
