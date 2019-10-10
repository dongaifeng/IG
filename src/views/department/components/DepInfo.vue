<template>
  <div class="box">
    <p class="text" v-html="text"></p>
    <ScrollBtn />
  </div>
</template>
<script>
import ScrollBtn from '@/components/ScrollBtn'

export default {
  components: { ScrollBtn },
  props: {
    text: {
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  margin: 20px;
  font-size: 20px;
}
.box {
  // border: 1px solid red;
  // height: 1000px;
  // overflow-y: scroll;
}
</style>