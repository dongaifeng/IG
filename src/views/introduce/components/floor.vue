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
import { search, getList } from '@/api'
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
      getList({
        key: p
      }).then(res => {
        console.log(res)
        search(p).then(res2 => {
        console.log(res2)
      })
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
 
</style>