<template>
  <div style="margin-top:20px;">
    <AIinput @query="query" :styleObj="style" lab="科室："></AIinput>
    <el-row style="margin:30px;">
       <img width="60%" :src="src" class="image">
    </el-row>
  </div>
</template>

<script>
import AIinput from '@/components/formItem/AIinput'
import { search } from '@/api'
export default {
  name: 'floor',
  components: { AIinput },
  data () {
    return {
      src: require('@/assets/1566183199(1).jpg'),
       style: {
        width: '40%',
        // paddingLeft: '100px',
      }
    }
  },
  methods: {
    query (p) {
      console.log(p)
      search(p).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 
</style>