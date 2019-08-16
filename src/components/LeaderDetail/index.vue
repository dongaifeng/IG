<template>
  <div>
   <el-row class="header">
     <el-col :span='3' class="header-h1">大领导</el-col>
     <el-col :span="6" class="header-h3">我是大领导</el-col>
     <el-col :span="4" push="11">
       <el-button @click="goBack">返回</el-button>
     <el-button @click="goHome">首页</el-button>
     </el-col>
     
   </el-row>
    <el-divider></el-divider>
    <span v-for="index in 25" :key="index">{{index}}少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
      goBack() {
        this.$router.back()
      },
      goHome() {
        this.$router.push({path: '/'})
      }
    }
}
</script>

<style lang="scss" scoped>
  .header{
    padding: 15px 0 0 0;
    .header-h1{
      font-size: 26px;
      height: 100%;
    }
    .header-h3{
      font-size: 16px;
      height: 100%;
      margin-top: 10px;

    }
  }
</style>