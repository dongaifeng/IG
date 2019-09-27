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
    <el-carousel-item v-for="(item, i) in news" :key="i">
      <img class="img" width="100%" :src="item.IMPAGE" alt />
      <!-- <img width="100%" :src="'data:image/png;base64,'+item.IMPAGE" alt /> -->
      <!-- <span class="textBox" v-html="item.TXT_CONTENT"></span> -->
      <span
        class="textBox"
        v-html="item.TXT_CONTENT.replace(/\n/g, '<br>')"
        :style="toObj(item.CONTENT_STYLE)"
      ></span>
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

    toObj(str) {
      if (typeof str != 'string') return {}
      let obj = {}
      var arr2 = str.split('&')
      for (var i = 0; i < arr2.length; i++) {
        var res = arr2[i].split('=')
        obj[res[0]] = res[1]
      }
      return obj
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
.img {
  height: 100%;
}
</style>