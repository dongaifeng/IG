<template>
  <el-row class="header">
     <el-col :span="4" class="header-h1">{{h1}}</el-col>
     <el-col :span="16" align="center">
        <AIinput v-if="search" @query="query" :styleObj="style" :lab="lab"></AIinput>
     </el-col>
     <el-col :span="4" class="header-btn" align="right"> 
        <el-button icon="el-icon-s-home" v-if="home" @click="goHome">首页</el-button>
        <el-button icon="el-icon-arrow-left" @click="goBack">返回</el-button>
     </el-col>
   </el-row>
</template>

<script>
import AIinput from '@/components/formItem/AIinput'
export default {
  components: { AIinput },
  data () {
    return {
      src: require('@/assets/1566183199(1).jpg'),
       style: {
        width: '60%',
        // paddingLeft: '100px',
      }
    }
  },
  props: {
    h1: {
      type: String,
      default: '',
      required: true
    },
    lab: {
      type: String,
      default: ' '
    },
    home: {
      type: Boolean
    },
    search: {
      type: Boolean
    }
  },
  watch:{
    $route(){
      // console.log(to, '<======');
    }
  },
  methods: {
      goBack() {
        this.$router.back({params: this.$route.params})
      },
      goHome() {
        this.$router.push({path: '/', params: this.$route.params})
      },
        query (p) {
      console.log(p)
      // getList({
      //   key: p
      // }).then(res => {
      //   console.log(res)
      //   search(p).then(res2 => {
      //   console.log(res2)
      // })
      // })
      
    }
  }
}
</script>

<style lang="scss" scoped>
   .header{
     border:1px solid red;
     background: #2461b3;
     padding: 15px;
    .header-h1{
      color: #fff;
      font-size: 28px;
     
    }
    .header-btn{
      float: right;
    }
  }

</style>