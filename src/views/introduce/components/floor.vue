<template>
  <div style="margin:30px;">
    <el-row style="margin-bottom:20px;">
      <el-button @click="detail('0')">平面图</el-button>
      <el-button @click="detail(item)" v-for="item in 12" :key="item">{{item}}#</el-button>
    </el-row>
    <el-row>
      <el-col :span="18">
        <img width="100%" :src="src" class="image" />
      </el-col>
      <el-col :span="6">{{txt}}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'floor',
  components: {},
  data() {
    return {
      src: '/images/floor/0.jpg',
      list: [],
      txt: null
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData(page) {
      this.$post('1025').then(res => {
        this.list = res.data || []
      })
    },
    detail(id) {
      if (id > 2) return
      this.src = '/images/floor/' + id + '.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>