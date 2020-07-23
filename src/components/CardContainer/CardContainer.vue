<template>
  <div
    class="h-full w-full grid grid-cols-3 grid-rows-4 gap-6 overflow-y-auto px-12 pb-12"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HexCardContainer'
}
</script>

<style scoped></style>
