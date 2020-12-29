<template>
  <div class="text-gray-300">
    <div v-if="isDict">
      <div v-if="trans_res.dictionary.entry != null">
        <hex-line-text-group>
          <hex-line-text
            :Text="trans_res.dictionary.entry"
            :Size="'large'"
          ></hex-line-text>
        </hex-line-text-group>
      </div>

      <hex-line-text-group>
        <div v-for="(item,key) in trans_res.dictionary.explanations" :key="key">
          <hex-line-text v-bind:Text="item"></hex-line-text>
        </div>
      </hex-line-text-group>

      <hex-line-text-group>
        <div v-for="(item,key) in trans_res.dictionary.prons" :key="key">
          <hex-line-text v-bind:Text="key+' : '+item"></hex-line-text>
        </div>
      </hex-line-text-group>


      <hex-line-text-group>
        <div v-for="item in trans_res.dictionary.wqx_example" :key="item[0]">
          <hex-line-text :Text="`${item[0]} : ${item[1]}`"></hex-line-text>
        </div>
      </hex-line-text-group>

    </div>
    <div v-else>
      <hex-line-text-group>
        <hex-line-text
          :Text="trans_res.source"
        ></hex-line-text>
      </hex-line-text-group>

      <hex-line-text-group>
        <hex-line-text
          :Text="trans_res.target"
        ></hex-line-text>
      </hex-line-text-group>

      <hex-line-text-group>
        <hex-line-text
          :Text="trans_res.confidence"
        ></hex-line-text>
      </hex-line-text-group>


    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron')
export default {
  name: 'Detail',
  data() {
    return {
      trans_res: {}
    }
  },
  computed: {
    isDict: function() {
      return this.trans_res.isDict || false
    }
  },
  async mounted() {
    this.trans_res = await ipcRenderer.invoke('get-store', 'trans_res')
    ipcRenderer.on('upgrade_detail', async () => {
      this.trans_res = await ipcRenderer.invoke('get-store', 'trans_res')
    })
  }
}
</script>

<style scoped></style>
