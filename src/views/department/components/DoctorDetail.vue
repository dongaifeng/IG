<template>
  <div>
    <AIheader :h1="info.DOCTOR_NAME" home></AIheader>
    <div class="box">
      <div class="img">
        <img :src="toSrc(info.PICTURE)" class="image" />
        <p class="name">{{info.DOCTOR_NAME}}</p>
        <p class="job">{{ info.SKILLED }}</p>
      </div>

      <p class="text">{{info.INTRODUCITON}}</p>
    </div>
  </div>
</template>

<script>
import AIheader from '@/components/AIheader'
export default {
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
    }
    .job {
      font-size: 13px;
    }
    .name {
      font-size: 18px;
    }
  }
  .text {
    font-size: 18px;
    text-indent: 2em;
  }
}
</style>