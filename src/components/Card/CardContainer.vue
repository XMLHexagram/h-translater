<template>
  <div
    class="h-full w-full grid grid-cols-3 grid-rows-4 gap-6 overflow-y-auto px-16 pb-12"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CardContainer'
}
</script>

<style scoped></style>
