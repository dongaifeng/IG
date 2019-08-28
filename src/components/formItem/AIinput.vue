<template>
  <div class="box">
      <!-- <span></span> -->
     <el-autocomplete
      class="inline-input"
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      :debounce="600"
      :trigger-on-focus="false"
      value-key="address"
      @select="handleSelect"
      @focus="show"
      :style="styleObj"
    >
       <template slot="prepend">{{lab}}</template>
       <el-button slot="append" icon="el-icon-search"></el-button>
    </el-autocomplete>
    <!-- <el-button style="width:100px; margin-left:20px;" @click="query">搜索</el-button> -->
    <keyboard :layout="'normal'" class="kb" ref="keyboard"></keyboard>
  </div>
</template>

<script>
import Keyboard from '@/components/Keyboard'
export default {
  data() {
    return {
      input: '',
      restaurants: [],
    }
  },
  props: {
    styleObj: {
      type: Object,
      default: null
    },
    lab:{
      type: String
    }
  },
  components: { Keyboard },
  mounted() {
    this.restaurants = this.loadAll();
  },
  methods: {
    query () {
      this.$emit('query', this.input)
    },
    show(e) {
      // console.log(e)
      this.$refs.keyboard.show(e)
    },
    hide() {
      this.$refs.keyboard.hide()
    },
     querySearchAsync(queryString, cb) {
       console.log(queryString)
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        cb(results);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "1", "address": "长宁区新渔路144号" },
          { "value": "12", "address": "上海市长宁区淞虹路661号" },
          { "value": "123", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
  }
}
</script>

<style lang="scss" scoped>
  .box{
    width: 100%;
    .inline-input{
      width: 100%;
    }
    .kb{
      position: fixed;
      bottom: 0px;
    }
  }
</style>
