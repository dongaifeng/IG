<template>
  <div class="box"> 
      <el-row v-for="item in 10" :key="item">
        <el-col :span="2">
         {{item}}
        </el-col>
        <el-col :span="20" align="left">
          <el-link>默认链接</el-link>
        </el-col>
        <el-col :span="2">
         <el-button @click="link" type="text">查看</el-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
 export default {
  components: {},
  data () {
   return {
   }
  },
  methods: {
    link () {
      this.$router.push({name: 'leaderDetail'})
    }
  }
 }
</script>
<style lang="scss" scoped>
  .box{
    
  .el-row{
    height: 50px;
    &:nth-of-type(odd){ background:#eee;}
    .el-col{
      line-height: 45px;
    }
  }
  }
</style>