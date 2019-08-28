<template>
  <el-carousel indicator-position="outside" loop arrow="always" trigger="click">
    <el-carousel-item v-for="item in news" :key="item.NEW_STYLE">
     
       <img width="100%" :src="'data:image/png;base64,'+item.IMPAGE" alt="">
        <span class="textBox" v-html="item.TXT_CONTENT"></span>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      news: []
    }
  },
  mounted () {
   
     this.$post('1004', [{
        LogicalOperatorsCode: "10",
        key: "STATUS",
        OperationalCharacterCode: "50",
        value: "1"
     },{
        LogicalOperatorsCode: "10",
        key: "DELETE_FLAG",
        OperationalCharacterCode: "50",
        value: "0"
     }]).then(res => {
          console.log(res.data)
          this.news = res.data
      })
  },
  methods: {
    uncode (url) {
      let Base64 = require('js-base64').Base64
      return Base64.decode(url)
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .textBox{
    position: absolute;
    top: 50%;
    left: 30%;
  }
</style>