<template>
  <div class="box">
    <img width="100%" :src="src" class="image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: require('../../../../public/images/structure.png'),
      list: [],
      txt: null
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  margin-top: 20px;
}
</style>