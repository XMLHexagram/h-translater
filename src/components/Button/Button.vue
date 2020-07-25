<template>
  <button class="btn" @click="handleClick">
    <span>
      <slot>empty</slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'HexButton',
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>
.btn {
  @apply text-xs bg-gray-800 text-gray-300 font-bold py-1 px-1 rounded inline-flex items-center justify-center;
}

.btn:hover {
  @apply bg-gray-700;
}

.btn:focus {
  @apply outline-none;
}
</style>
