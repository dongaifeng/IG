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
  methods: {
    handleScroll(e) {
      let scrolltop = e.target.scrollTop
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false)
    },
    InTop() {
      document.body.scrollTop = document.documentElement.scrollBy({
        top: -50,
        left: 0,
        behavior: 'smooth'
      })
    },
    InBottom() {
      // let top = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(top, '<======')

      document.body.scrollTop = document.documentElement.scrollBy({
        top: 50,
        left: 0,
        behavior: 'smooth'
      })
    },
    ScrollTop(number = 0, time) {
      if (!time) {
        document.body.scrollTop = document.documentElement.scrollTop = number
        return number
      }
      const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
      let spacingInex = time / spacingTime // 计算循环的次数
      let nowTop = document.body.scrollTop + document.documentElement.scrollTop // 获取当前滚动条位置
      let everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
      let scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
          spacingInex--
          this.ScrollTop((nowTop += everTop))
        } else {
          clearInterval(scrollTimer) // 清除计时器
        }
      }, spacingTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.gotop-box {
  position: fixed;
  right: 50px;
  bottom: 30px;

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