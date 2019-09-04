<template>
  <div>
    <AIheader :h1="'医院领导'" home></AIheader>

    <div class="box clearfix" v-for="i in 5" :key="i">
      <div class="img">
        <img :src="toSrc()" class="image" />
      </div>

      <p class="name">
        <span class="first">马屁精</span>
        <span class="jobtype">大主任</span>
        <el-button style="float:right" type="info">查看</el-button>
      </p>
      <p class="job">科室： 既然如可</p>
      <p class="text">擅长：dfhvdhfvdhfvj</p>
    </div>
  </div>
</template>

<script>
import AIheader from '@/components/AIheader'
export default {
  components: { AIheader },
  data() {
    return {}
  },
  props: {
    info: {
      type: Object
    }
  },
  methods: {
    toSrc(id) {
      console.log(id)
      return require('@/assets/leaderImage/1.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 30px;
  .img {
    width: 10%;
    float: left;
    text-align: center;
    padding-right: 20px;
    .image {
      width: 100%;
    }
  }
  .job {
    font-size: 13px;
    margin-bottom: 10px;
  }
  .name {
    font-size: 18px;
    margin: 10px 0px;
    .first {
      color: blueviolet;
      padding-right: 20px;
    }
    .jobtype {
      font-size: 16px;
    }
  }
  .text {
    // font-size: 18px;
  }
}
</style>