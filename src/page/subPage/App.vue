<template>
  <div class="container">
    <div class="col-span-1 bg-gray-800 bg-opacity-50">
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

    <div class=" translated">
      <textarea
        @keydown.ctrl.enter="submit"
        @keydown.esc="clear"
        v-model="translate"
        type="text"
        required
        autocomplete="off"
        class="textarea"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import { TranslateCaiyun } from '@/api/translateAPI'

export default {
  name: 'App',
  data() {
    return {
      text: '',
      translate: ''
    }
  },
  methods: {
    async submit() {
      this.translate = await TranslateCaiyun(this.text)
      console.log(this.translate+"translate")
    },
    clear() {
      this.text = ''
    }
  }
}
</script>

<style scoped>
.container {
  @apply grid grid-cols-2 bg-transparent text-center w-screen h-screen;
}

.translated {
  @apply col-span-1 bg-gray-700 bg-opacity-50;
  -webkit-app-region: drag;
}

.textarea {
  @apply h-full w-full p-0 border-0 bg-transparent text-gray-200 text-2xl text-center;
}
</style>
