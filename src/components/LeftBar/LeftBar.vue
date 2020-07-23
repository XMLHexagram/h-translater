<template>
  <div class="w-full h-full flex flex-col bg-gray-600">
    <div
      class="h-1/10 flex justify-center items-center border-gray-900 border-b-2"
    >
      <slot name="header">H-transter</slot>
    </div>

    <slot></slot>
  </div>
</template>

<script>
// import LeftBarItem from './LeftBarItem'
export default {
  name: 'HexLeftBar',

  // components: { LeftBarItem },

  provide() {
    return {
      rootLeftBar: this
    }
  },

  data() {
    return {
      activeID: null
    }
  },

  methods: {
    // eslint-disable-next-line no-unused-vars
    changeActive(id) {
      for (const item of this.activeControl) {
        this.activeControl.set(item[0], true)
      }
      console.log(this.activeControl)
    }
  }
}
</script>

<style scoped></style>
