<template>
  <div class="gotop-box">
    <div class="gotop" @click="InTop">
      <i class="el-icon-caret-top"></i>
    </div>
    <div class="gotop" @click="InBottom">
      <i class="el-icon-caret-bottom"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nokeepAlive',
  data() {
    return {
      a: null
    }
  },
  mounted() {
    // console.log(
    //   document.body.scrollHeight,
    //   document.documentElement.clientHeight,
    //   window.document.getElementById('app').firstChild.clientHeight
    // )
  },
  methods: {
    handleScroll(e) {
      let scrolltop = e.target.scrollTop
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false)
    },
    InTop() {
      // console.log(this.$parent.$parent.$refs.ddd)
      let dom =
        this.$refs.scrollBox ||
        this.$parent.$refs.scrollBox ||
        this.$parent.$parent.$refs.scrollBox ||
        this.$parent.$parent.$parent.$parent.$refs.scrollBox ||
        document.getElementsByClassName('contant-box')[0]
      dom.scrollTop = dom.scrollTop - 50
      // window.scrollBy(0, -50)
    },
    InBottom() {
      // let top = document.documentElement.scrollTop || document.body.scrollTop
      // let dd =
      //   (document.documentElement.scrollHeight || document.body.scrollHeight) -
      //   (document.documentElement.offsetHeight || document.body.offsetHeight)
      // // console.log(top, dd, '<======')
      let dom =
        this.$refs.scrollBox ||
        this.$parent.$refs.scrollBox ||
        this.$parent.$parent.$refs.scrollBox ||
        this.$parent.$parent.$parent.$parent.$refs.scrollBox ||
        document.getElementsByClassName('contant-box')[0]

      // console.log(this.$parent.$parent.$parent.$parent)

      if (dom.scrollTop >= dom.scrollHeight) {
        this.$message('已经到底了')
      } else {
        dom.scrollTop = dom.scrollTop + 50
        // window.scrollBy({
        //   top: 50,
        //   left: 0,
        //   behavior: 'smooth'
        // })
      }
    }
  },
  computed: {
    hasScrollbar() {
      return (
        document.body.scrollHeight >
        (window.innerHeight || document.documentElement.clientHeight)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.gotop-box {
  position: fixed;
  right: 50px;
  bottom: 100px;

  .gotop {
    text-align: center;
    cursor: pointer;
    padding: 10px;
    margin: 10px;
    border-radius: 10%;
    background: rgba(0, 0, 0, 0.2);
    color: #666;
    font-size: 50px;
  }
}
</style>