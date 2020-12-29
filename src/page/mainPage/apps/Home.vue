<template>
  <div class="h-full w-full">
    <div
      class="h-1/7 flex justify-center items-center text-blue-100 align-bottom"
    >
      <div class="align-bottom">
        <span class="text-4xl">H-translator</span>
        <span class="text-xs">For Cross-platform v0.0.2-beta</span>
      </div>
    </div>
    <div class="h-6/7 w-full">
      <hex-card-container>
        <hex-card>
          <template #header>
            是否固定副窗口
          </template>
          <template #body>
            <hex-switch v-model="isFix"></hex-switch>
          </template>
        </hex-card>
        <hex-card>
          <template #header>
            {{ subWin.Text1 }}
          </template>
          <template #body>
            <hex-button @click="controlSubWin">{{ subWin.Text2 }}</hex-button>
          </template>
        </hex-card>
        <hex-card>
          <template #header>
            复位
          </template>
          <template #body>
            <hex-button @click="resetSub"> Click </hex-button>
          </template>
        </hex-card>

        <hex-card>
          <template #header>
            <span>所有桌面可见</span>
            <span class="text-xs">macos - only</span>
          </template>
          <template #body>
            <hex-switch v-model="isVisibleOnAll"></hex-switch>
          </template>
        </hex-card>

        <hex-card>
          <template #header>
            <span>修改大小</span>
          </template>
          <template #body>
            <hex-switch v-model="isResizable"></hex-switch>
          </template>
        </hex-card>
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
  data() {
    return {
      isFix: false,
      isVisibleOnAll:false,
      isResizable:false,
      subWin: {
        Text1: '展开翻译式程',
        Text2: 'Start',
        status: true
      }
    }
  },
  components: {},
  methods: {
    resetSub() {
      ipcRenderer.send('reset-sub')
    },
    controlSubWin() {
      if (this.subWin.status === true) {
        ipcRenderer.send('create-sub-win')
        setTimeout(() => {
          this.subWin = {
            Text1: '结束翻译式程',
            Text2: 'End',
            status: false
          }
        }, 1000)
      } else {
        ipcRenderer.send('end-sub-win')
        this.subWin = {
          Text1: '展开翻译式程',
          Text2: 'Start',
          status: true
        }
      }
    }
  },
  watch: {
    isFix: async function(val) {
      if (val === true) {
        ipcRenderer.send('fix-sub')
        // const result = await ipcRenderer.invoke('get-store', 'Author')
        // console.log(result)
      } else {
        ipcRenderer.send('not-fix-sub')
      }
    },
    isVisibleOnAll:async function(val) {
      if (val === true) {
        ipcRenderer.send('sub-visible-on-all')
        // const result = await ipcRenderer.invoke('get-store', 'Author')
        // console.log(result)
      } else {
        ipcRenderer.send('not-sub-visible-on-all')
      }
    },
    isResizable:async function(val) {
      if (val === true) {
        ipcRenderer.send('on-sub-resizable')
        // const result = await ipcRenderer.invoke('get-store', 'Author')
        // console.log(result)
      } else {
        ipcRenderer.send('off-sub-resizable')
      }
    }
  }
}
</script>

<style scoped></style>
