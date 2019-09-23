<template>
  <div>
    <AIheader :h1="'医院领导'" home></AIheader>
    <div class="box">
      <div class="img">
        <!-- <img :src="toSrc(info.LEADER_PICTURE)" class="image" /> -->

        <el-image :src="toSrc(info.PICTURE)" class="image">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <p class="name">{{info.LEADER_NAME}}</p>
        <p class="job">{{ info.LEADER_DUTY }}</p>
      </div>

      <p
        class="text"
        v-html="info.LEADER_INTRODUCTION && info.LEADER_INTRODUCTION.replace(/\n/g, '<br>')"
      ></p>
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
      if (id) return require('../../../public/images/leaderImage/' + id + '.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 30px;
  .img {
    width: 15%;
    float: left;
    text-align: center;
    padding-right: 20px;
    .image {
      width: 100%;
      /deep/ .image-slot {
        width: 100%;
        height: 228px;
        font-size: 30px;
        line-height: 228px;
        background: #ccc;
      }
    }
    .job {
      font-size: 16px;
    }
    .name {
      font-size: 20px;
    }
  }
  .text {
    font-size: 20px;
    text-indent: 2em;
  }
}
</style>