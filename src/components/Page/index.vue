<template>
  <div class="page-box">
    <el-pagination
      background
      layout="slot, prev, next"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
      :current-page="currentPage"
      @current-change="pageClick"
    >
      <span class="my-total">{{currentPage}} / {{Math.ceil(total / size)}} 页</span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 8
    }
  },
  methods: {
    pageClick(page) {
      this.$emit('current-change', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  // position: fixed;
  // bottom: 10px;
  // right: 10px;
  .el-pagination {
    margin: 0;
    /deep/ .btn-prev,
    /deep/ .btn-next {
      background: #4f90e6;

      color: #fff;
      padding: 10px 30px;
      height: auto;
      span {
        font-size: 18px;
      }
    }
    /deep/ .my-total {
      vertical-align: bottom !important;
    }
  }
}
</style>