<template>
  <div class="grid grid-cols-10 grid-rows-6 h-screen w-screen bg-gray-800">
    <left-bar class="col-span-2 row-span-6">
      <template #header></template>

      <left-bar-item ID="1" router="/">General</left-bar-item>
      <left-bar-item ID="2" router="/about">About</left-bar-item>
      <left-bar-item ID="3">Setting</left-bar-item>
    </left-bar>

    <router-view class="col-start-3 col-end-11 row-span-6"></router-view>
  </div>
</template>

<script>
import LeftBar from '@/components/LeftBar/LeftBar'
import LeftBarItem from '@/components/LeftBar/LeftBarItem'

export default {
  name: 'App',
  components: {
    LeftBar,
    LeftBarItem
  }
}
</script>

<style scoped></style>
