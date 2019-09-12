<template>
  <el-carousel
    height="27vh"
    class="box-car"
    indicator-position="outside"
    loop
    :interval="5000"
    arrow="always"
    trigger="click"
  >
    <el-carousel-item v-for="item in news" :key="item.NEW_STYLE">
      <img width="100%" :src="toSrc(item.IMPAGE)" alt />
      <!-- <img width="100%" :src="'data:image/png;base64,'+item.IMPAGE" alt /> -->
      <!-- <span class="textBox" v-html="item.TXT_CONTENT"></span> -->
      <span class="textBox" v-html="item.TXT_CONTENT.replace(/\n/g, '<br>')"></span>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      news: []
    }
  },
  mounted() {
    this.$post('1004', [
      {
        LogicalOperatorsCode: '10',
        key: 'STATUS',
        OperationalCharacterCode: '50',
        value: '1'
      },
      {
        LogicalOperatorsCode: '10',
        key: 'DELETE_FLAG',
        OperationalCharacterCode: '50',
        value: '0'
      }
    ]).then(res => {
      this.news = res.data
    })
  },
  methods: {
    uncode(url) {
      let Base64 = require('js-base64').Base64
      return Base64.decode(url)
    },
    toSrc(id) {
      return require('@/assets/swiper/' + id + '.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.textBox {
  position: absolute;
  top: 40%;
  left: 30%;
}
</style>