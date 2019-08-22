<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-tabs v-model="tabIndex" tab-position="right" stretch type="card" @tab-click="tabClick">
        <el-tab-pane label="就医指南" disabled>就医指南</el-tab-pane>
        <el-tab-pane
          v-for="(item, index) in tabs"
          :key="index"
          :label="item.title"
          :name="item.name"
        >
       <keep-alive include="leader">
          <component :is="item.component"></component>
         </keep-alive>
        </el-tab-pane>
      </el-tabs>
      
    </el-col>
    <img width="11%" style="position: absolute; bottom:40px; right:30px;" :src="img" />
  </el-row>
</div>
</template>

<script>
import Outpatient from './components/Outpatient'
// import Emergency from './components/Emergency'
export default {
  components: { Outpatient },
  data () {
    return {
      tabIndex: '1',
      activeIndex: '0',
      img: require('../../../public/img/1565939115.png'),
      tabs: [{
          title: '门诊指南',
          name: '1',
          component: 'Outpatient'
        }, {
          title: '急诊指南',
          name: '2',
          component: 'Outpatient'
        }]
    }
  },
  methods: {
    tabClick (tab) {
      // console.log(tab, event)
      this.activeIndex = tab.name
      if (tab.name === '5') this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-tabs {
   height: 98vh;
    /deep/ .el-tabs__header{
      width: calc(15% - 10px);
      .el-tabs__item{
        height: 50px;
        line-height: 50px;
      }
    }
    /deep/ .el-tabs__content{
      width: 85%;
      height: 100%;
      overflow: auto;
    }
    /deep/ .is-disabled{
      color: #fff;
      background: blue;
    }
  }
</style>