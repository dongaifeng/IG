<template>
  <div>
    <AIheader :h1="info.DOCTOR_NAME" home></AIheader>
    <div class="box">
      <div class="img">
        <el-image :src="toSrc(info.PICTURE)" class="image">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <p class="name">{{info.DOCTOR_NAME}}</p>
      </div>
      <span class="title">专长：</span>
      <p class="text">{{ info.SKILLED }}</p>
      <span class="title">阅历：</span>
      <p class="text">{{info.INTRODUCITON}}</p>
    </div>
  </div>
</template>

<script>
import AIheader from '@/components/AIheader'
export default {
  name: 'nokeepAlive',
  components: { AIheader },
  data() {
    return {
      info: {}
    }
  },
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    toSrc(id) {
      if (id) return require('@/assets/leaderImage/' + id + '.png')
    },
    initData() {
      this.$post('1012', [
        {
          LogicalOperatorsCode: '10',
          key: 'DOCTOR_CODE',
          OperationalCharacterCode: '50',
          value: this.id
        }
      ]).then(res => {
        this.info = res.data[0]
      })
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
  .title {
    font-size: 25px;
    display: block;
    color: blueviolet;
    margin: 20px;
  }
}
</style>