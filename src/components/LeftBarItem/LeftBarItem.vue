<template>
  <div
    v-on:click="afterClicked"
    class="default"
    :class="[isActive ? 'actived' : 'before-active']"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HexLeftBarItem',

  inject: ['rootLeftBar'],

  props: {
    ID: String,
    router: String
  },

  data() {
    return {}
  },

  methods: {
    afterClicked() {
      this.rootLeftBar.activeID = this.ID
      let router = this.router || this.ID
      this.$router.push(router)
    }
  },

  computed: {
    isActive() {
      return this.ID === this.rootLeftBar.activeID
    }
  }
}
</script>

<style scoped>
.default {
  @apply flex justify-center items-center flex-none text-gray-600 h-12;
}

.default:hover {
  /* @apply bg-gray-700; */
}

.actived {
  @apply bg-gray-800 text-gray-200;
}

.before-active {
  @apply bg-gray-600 text-gray-300;
}
</style>
