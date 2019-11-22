<template>
  <div>
    <!-- 智能导诊
    <svg-icon icon-class="111_03" style="font-size:50px; color: red;" />-->
    <h1>暂未开通</h1>
  </div>
</template>

<script>
export default {
  name: 'nokeepAlive',
  mounted() {
    this.open()
  },
  methods: {
    open() {
      this.$alert('功能尚未开通', '提示', {
        confirmButtonText: '返回首页',
        callback: action => {
          this.$router.push('home')
        }
      })
    }
  }
}
</script>