<template>
  <el-row class="header">
    <el-col :span="6" class="header-h1">
      {{h1}}
      <span>{{$store.getters.time}}</span>
    </el-col>
    <el-col :span="12" align="center">
      <AIinput
        v-if="search"
        @query="query"
        :styleObj="style"
        :lab="lab"
        :searchAsync="searchAsync"
        :selName="selName"
      ></AIinput>
    </el-col>
    <el-col :span="6" class="header-btn" align="right">
      <el-button class="my-btn" icon="el-icon-s-home" v-if="home" @click="goHome">首页</el-button>
      <el-button class="my-btn" icon="el-icon-arrow-left" @click="goBack">返回</el-button>
    </el-col>
  </el-row>
</template>

<script>
import AIinput from '@/components/formItem/AIinput'
export default {
  components: { AIinput },
  data() {
    return {
      src: require('../../../public/images/1566183199(1).jpg'),
      time: 5,
      style: {
        width: '90%'
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
      default: ' '
    },
    selName: {
      type: String,
      default: ' '
    },
    home: {
      type: Boolean,
      default: true
    },
    search: {
      type: Boolean
    },
    searchAsync: {
      type: Function
    }
  },
  mounted() {},
  watch: {
    $route() {
      // console.log(to, '<======');
    }
  },
  methods: {
    goBack() {
      this.$router.back({ params: this.$route.params })
    },
    goHome() {
      this.$router.push({ path: '/', params: this.$route.params })
    },
    query(p) {
      this.$emit('query', p)
    },
    sub() {}
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #2461b3;
  padding: 15px;
  .header-h1 {
    color: #fff;
    font-size: 30px;
  }
  .header-btn {
    float: right;
  }
  .my-btn {
    font-size: 22px;
    font-weight: bold;
    background: transparent;
    color: #fff;
    border: none;
    padding: 12px 15px;
  }
}
</style>