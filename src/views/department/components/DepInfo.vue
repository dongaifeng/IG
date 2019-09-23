<template>
  <div>
    <p class="text" v-html="text"></p>
  </div>
</template>
<script>
export default {
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
</style>