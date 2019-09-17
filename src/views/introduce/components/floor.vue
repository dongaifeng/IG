<template>
  <div style="margin-top:20px;">
    <el-row style="margin:30px;">
      <img width="70%" :src="src" class="image" />
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'floor',
  components: {},
  data() {
    return {
      src: require('@/assets/1566183199(1).jpg')
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>