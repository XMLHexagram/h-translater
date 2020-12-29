<template>
  <div class="container">
    <div class="source">
      <textarea
        @keydown.ctrl.enter="submit"
        @keydown.esc="clear"
        @input="autoSubmit"
        v-model="text"
        type="text"
        required
        autocomplete="off"
        class="textarea"
      >
      </textarea>
    </div>

    <div v-if="isDict" class="translated text-left p-2">
      <span class="font-bold mr-2">{{ dictionary.entry }} </span>
      <span class="whitespace-no-wrap">{{ pronForShow }}</span>
      <div v-for="item in dictionary.explanations" :key="item" class="my-1">
        <span>{{ item }}</span>
      </div>
    </div>

    <div v-else class="translated">
      <span class="font-bold mr-2 ">{{ translator.target }}</span>
      <span class="font-bold mr-2 block">自信度:{{ translator.confidence.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script>
import {
  ChineseWordTranslateCaiyun,
  EnglishWordTranslateCaiyun
} from '@/api/translateAPI'
// TODO:放到原型链上去
const { ipcRenderer } = window.require('electron')

export default {
  name: 'App',
  data() {
    return {
      text: '',
      dictionary: {
        entry: '',
        explanations: [],
        prons: {
          en: '',
          'en-us': ''
        }
      },
      translator: {
        confidence: 0,
        target: ''
      },
      isDict: true,
      timer:null,
    }
  },
  mounted() {
    ipcRenderer.send('change-sub-height', document.body.offsetHeight + 10)
  },
  methods: {
    async submit() {
        await this.getTranslate()
        ipcRenderer.send('change-sub-height', document.body.offsetHeight + 10)
      // console.log(document.body.offsetHeight)
    },
    async autoSubmit() {
      clearTimeout(this.timer)
      this.timer = setTimeout(async ()=> {
        await this.getTranslate()
        ipcRenderer.send('change-sub-height', document.body.offsetHeight + 10)
      },1500)
      // console.log(document.body.offsetHeight)
    },
    clear() {
      this.text = ''
    },
    async getTranslate() {
      // if (this.text.indexOf(' ') === -1) {
      //   this.isWord = true
      //   let result = await WordTranslateCaiyun(this.text)
      //   this.wordTranslate.entry = result.entry
      //   this.wordTranslate.explanations = result.explanations
      //   // console.log(result.prons)
      //   this.wordTranslate.prons = result.prons
      // } else {
      //   this.isWord = false
      //   this.translate = await TranslateCaiyun(this.text)
      // }

      const pattern = new RegExp('[\u4E00-\u9FA5]+')
      let result
      if (pattern.test(this.text)) {
        // 是中文
        result = await ChineseWordTranslateCaiyun(this.text)
        console.log(result)
      } else {
        // console.log(222)
        result = await EnglishWordTranslateCaiyun(this.text)
        // console.log(result)
      }
      // console.log(1,result)
      if (result.isDict) {
        // console.log(111)
        // console.log(result)
        this.isDict = result.isDict
        this.dictionary.entry = result.dictionary.entry
        this.dictionary.explanations = result.dictionary.explanations
        this.dictionary.prons = result.dictionary.prons
      } else {
        this.isDict = result.isDict
        this.translator = {
          target: result.target,
          confidence: result.confidence,
        }
      }

      console.log(this.dictionary)
    }
  },
  computed: {
    pronForShow() {
      // console.log(this.wordTranslate.prons.en)
      // console.log(Object.keys(this.wordTranslate.prons))
      // console.log(this.wordTranslate.prons.en)
      if (
        this.dictionary.prons === undefined ||
        this.dictionary.prons === null
      ) {
        return ''
      } else if (
        this.dictionary.prons.en !== null &&
        this.dictionary.prons.en !== undefined
      ) {
        // console.log(1)
        return this.dictionary.prons.en
      } else if (
        this.dictionary.prons['en-us'] !== null &&
        this.dictionary.prons['en-us'] !== undefined
      ) {
        // console.log(2)
        return this.dictionary.prons['en-us']
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
