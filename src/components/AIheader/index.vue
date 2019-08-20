<template>
  <div class="header">
     <span class="header-h1">{{h1}}</span>
     <span class="header-h3">{{h3}}</span>
     <span class="header-btn">
       <el-button v-if="home" @click="goHome">首页</el-button>
       <el-button @click="goBack">返回</el-button>
     </span>
   </div>
</template>

<script>
export default {
  props: {
    h1: {
      type: String,
      default: ' ',
      required: true
    },
    h3: {
      type: String,
      default: ' '
    },
    home: {
      type: Boolean
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
    border-bottom: 1px solid #ccc;
    padding: 10px;
    height: 40px;
    .header-h1{
      float: left; 
      font-size: 28px;
      padding-right: 50px;
      line-height: 50px;
    }
    .header-h3{
      float: left; 
      font-size: 20px;
      line-height: 60px;
    }
    .header-btn{
      float: right;
    }
  }

</style>