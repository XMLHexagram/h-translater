<template>
  <div class="h-full w-full">
    <div
      class="h-1/7 flex justify-center items-center text-blue-100 align-bottom"
    >
      <div class="align-bottom">
        <span class="text-4xl">H-transter </span>
        <span class="text-xs">For Win v0.0.1-beta</span>
      </div>
    </div>
    <div class="h-6/7 w-full">
      <hex-card-container>
        <hex-card>
          <!-- <template #header></template> -->
          <template #body>
            <hex-switch></hex-switch>
          </template>
        </hex-card>
        <hex-card>
          <template #header>
            运行式程
          </template>
          <template #body>
            <hex-button @click="showSubWin">Start</hex-button>
          </template>
        </hex-card>
        <hex-card></hex-card>
        <hex-card></hex-card>
        <hex-card></hex-card>
        <hex-card></hex-card>
        <hex-card></hex-card>
        <!-- <hex-card></hex-card> <hex-card></hex-card><hex-card></hex-card
        ><hex-card></hex-card><hex-card></hex-card> -->
      </hex-card-container>
    </div>
  </div>
</template>

<script>
// TODO:放到原型链上去
const { ipcRenderer } = window.require('electron')
export default {
  name: 'Home',
  components: {},
  methods: {
    showSubWin() {
      ipcRenderer.send('create-sub-win')
    }
  }
}
</script>

<style scoped></style>
