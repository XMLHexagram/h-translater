<template>
  <div class="grid grid-cols-10 grid-rows-6 h-screen w-screen bg-gray-800">
    <hex-left-bar class="col-span-2 row-span-6">
      <template #header></template>
      <hex-left-bar-item ID="1" router="/">General</hex-left-bar-item>
      <hex-left-bar-item ID="2" router="/about">About</hex-left-bar-item>
      <hex-left-bar-item ID="3" router="/detail">Detail</hex-left-bar-item>
      <hex-left-bar-item ID="5">Setting</hex-left-bar-item>
    </hex-left-bar>

    <router-view class="col-start-3 col-end-11 row-span-6"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style scoped></style>
