<template>
  <div>
    <AIheader :h1="'姓名'" :h3="'领导介绍职位'" home></AIheader>
   <div style="padding:30px;">
    <span v-for="index in 25" :key="index">{{index}}少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
   </div>
  </div>
</template>

<script>
 import AIheader from '@/components/AIheader'
export default {
  components: { AIheader },
  data () {
    return {
      
    }
  },
  methods: {
    
    }
}
</script>

<style lang="scss" scoped>
 
</style>