<template>
  <div class="box">
    <!-- <span></span> -->
    <el-autocomplete
      class="inline-input"
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请首查询字母"
      :debounce="600"
      :trigger-on-focus="false"
      :value-key="selName"
      @select="handleSelect"
      @focus="show"
      @change="handleSelect"
      :style="styleObj"
      popper-class="myautocomplete"
    >
      <template class="my-tab" slot="prepend">{{lab}}</template>
      <el-button slot="append" @click="query">查询</el-button>
    </el-autocomplete>
    <!-- <el-button style="width:100px; margin-left:20px;" @click="query">搜索</el-button> -->
    <keyboard :layout="'normal'" class="kb" ref="keyboard"></keyboard>
  </div>
</template>

<script>
// searchAsync  作为props参数传入 第一个参数传id，第二个是回调函数
// query 是点事查询函数
import Keyboard from '@/components/Keyboard'
export default {
  data() {
    return {
      input: '',
      restaurants: [],
      select: null
    }
  },
  props: {
    styleObj: {
      type: Object,
      default: null
    },
    lab: {
      type: String
    },
    searchAsync: {
      type: Function,
      default: function() {
        return function() {}
      }
    },
    selName: {
      type: String,
      default: ''
    }
  },
  components: { Keyboard },
  mounted() {
    // this.restaurants = this.loadAll()
  },
  methods: {
    query() {
      if (this.select) {
        this.hide()
      }
      this.$emit('query', this.select)
    },
    show(e) {
      // console.log(e)
      this.$refs.keyboard.show(e)
    },
    hide() {
      this.$refs.keyboard.hide()
    },
    querySearchAsync(queryString, cb) {
      console.log(queryString, 'queryString===')
      this.select = null
      this.searchAsync(queryString, function(list = []) {
        cb(list)
      })
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    loadAll() {
      return []
    },
    handleSelect(item) {
      this.select = item
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  .inline-input {
    width: 100%;
  }

  .kb {
    position: fixed;
    bottom: 0px;
  }
  .el-autocomplete {
    /deep/ .el-input__inner {
      font-size: 18px !important;
      height: 45px;
    }
    /deep/ .el-input-group__prepend {
      color: #000 !important;
      font-size: 18px !important;
    }
    /deep/ .el-input-group__append {
      color: #5590df !important;
      font-size: 18px !important;
    }
  }
}
</style>
