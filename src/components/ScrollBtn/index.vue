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
    console.log(
      document.body.scrollHeight,
      document.documentElement.clientHeight,
      window.document.getElementById('app').firstChild.clientHeight
    )
  },
  methods: {
    handleScroll(e) {
      let scrolltop = e.target.scrollTop
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false)
    },
    InTop() {
      console.log(this.hasScrollbar)
      document.body.scrollTop = document.documentElement.scrollBy({
        top: -50,
        left: 0,
        behavior: 'smooth'
      })
    },
    InBottom() {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      let dd =
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
        (document.documentElement.offsetHeight || document.body.offsetHeight)
      // console.log(top, dd, '<======')
      if (top === dd) {
        this.$message('已经到底了')
      } else {
        document.body.scrollTop = document.documentElement.scrollBy({
          top: 50,
          left: 0,
          behavior: 'smooth'
        })
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
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    color: #666;
    font-size: 60px;
  }
}
</style>