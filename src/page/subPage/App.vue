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
      <span class="whitespace-no-wrap">{{ wordTranslate.prons.en }}</span>
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
  methods: {
    async submit() {
      if (this.text.indexOf(' ') === -1) {
        this.isWord = true
        this.wordTranslate = await WordTranslateCaiyun(this.text)
      } else {
        this.isWord = false
        this.translate = await TranslateCaiyun(this.text)
      }
    },
    clear() {
      this.text = ''
    }
  }
}
</script>

<style scoped>
.container {
  @apply bg-transparent text-center w-screen h-screen text-gray-300;
}

.source {
  @apply bg-gray-800 bg-opacity-50;
}
.translated {
  -webkit-app-region: drag;
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
