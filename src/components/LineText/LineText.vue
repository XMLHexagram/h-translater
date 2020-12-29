<template>
  <div class="bg-gray-600 px-2 m-0" :class="fontSize">
    {{Text}}
  </div>
</template>

<script>
export default {
  name: 'HexLineText',
  props: {
    Text: String,
    Size: {
      type:String,
      default:'large'
    }
  },
  computed:{
    fontSize:function(){
      switch (this.Size) {
        case 'small': {
          return 'text-sm'
        }
        case 'middle':{
          return 'text-base'
        }
        case 'large':{
          return 'text-xl'
        }
        default:{
          return 'text-base'
        }
      }
    }
  }
}
</script>

<style scoped></style>
