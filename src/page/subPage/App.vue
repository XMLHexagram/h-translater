<template>
  <div class="container">
    <div class="source">
      <textarea
        @keydown.ctrl.enter="submit"
        @keydown.esc="clear"
        v-model="text"
        type="text"
        required
        autocomplete="off"
        class="textarea"
      >
      </textarea>
    </div>

    <div v-if="isWord" class="translated text-left p-2">
      <span class="font-bold mr-2">{{ wordTranslate.entry }} </span>
      <span class="whitespace-no-wrap">{{ pronForShow }}</span>
      <div v-for="item in wordTranslate.explanations" :key="item" class="my-1">
        <span>{{ item }}</span>
      </div>
    </div>

    <div v-else class="translated">
      <span>{{ translate }}</span>
    </div>
  </div>
</template>

<script>
import { TranslateCaiyun, WordTranslateCaiyun } from '@/api/translateAPI'
// TODO:放到原型链上去
const { ipcRenderer } = window.require('electron')

export default {
  name: 'App',
  data() {
    return {
      text: '',
      translate: '',
      wordTranslate: {
        entry: '',
        explanations: [],
        prons: {
          en: '',
          'en-us': ''
        }
      },
      isWord: false
    }
  },
  mounted() {
    ipcRenderer.send('change-sub-height', document.body.offsetHeight+10)
  },
  methods: {
    async submit() {
      await this.getTranslate()
      // console.log(document.body.offsetHeight)
      ipcRenderer.send('change-sub-height', document.body.offsetHeight+10)
    },
    clear() {
      this.text = ''
    },
    async getTranslate() {
      if (this.text.indexOf(' ') === -1) {
        this.isWord = true
        let result = await WordTranslateCaiyun(this.text)
        this.wordTranslate.entry = result.entry
        this.wordTranslate.explanations = result.explanations
        // console.log(result.prons)
        this.wordTranslate.prons = result.prons
      } else {
        this.isWord = false
        this.translate = await TranslateCaiyun(this.text)
      }
    }
  },
  computed: {
    pronForShow() {
      // console.log(this.wordTranslate.prons.en)
      // console.log(Object.keys(this.wordTranslate.prons))
      // console.log(this.wordTranslate.prons.en)
      if (
        this.wordTranslate.prons === undefined ||
        this.wordTranslate.prons === null
      ) {
        return ''
      } else if (
        this.wordTranslate.prons.en !== null &&
        this.wordTranslate.prons.en !== undefined
      ) {
        // console.log(1)
        return this.wordTranslate.prons.en
      } else if (
        this.wordTranslate.prons['en-us'] !== null &&
        this.wordTranslate.prons['en-us'] !== undefined
      ) {
        // console.log(2)
        return this.wordTranslate.prons['en-us']
      }
      // console.log(3)
      return ''
    }
  }
}
</script>

<style scoped>
.container {
  @apply bg-transparent text-center w-screen h-full text-gray-300;
}

.source {
  @apply bg-gray-800 bg-opacity-50;
}
.translated {
  -webkit-app-region: drag;
  min-height: 10px;
  @apply bg-gray-700 bg-opacity-50;
}

span {
  -webkit-app-region: no-drag;
}

.textarea {
  @apply h-full w-full p-0 border-0 bg-transparent text-gray-200 text-2xl text-center;
}

.textarea:focus {
  @apply outline-none;
}
</style>
