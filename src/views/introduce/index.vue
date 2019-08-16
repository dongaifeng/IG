<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-tabs v-model="tabIndex" tab-position="right" stretch type="card" @tab-click="tabClick">
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
import Detail from './components/detail'
import Leader from './components/leader'
export default {
  components: {Detail, Leader},
  data () {
    return {
      tabIndex: '1',
      img: require('../../../public/img/1565939115.png'),
      tabs: [{
          title: 'Tab454 1',
          name: '1',
          component: 'Detail'
        }, {
          title: 'Tab 4542',
          name: '2',
          component: 'Leader'
        }, {
          title: 'Tab 5652',
          name: '3',
          component: 'Leader'
        }, {
          title: 'Tab546 2',
          name: '4',
          component: 'Leader'
        }, {
          title: '返回',
          name: '5',
          component: ''
        }]
    }
  },
  methods: {
    tabClick (tab, event) {
      console.log(tab, event)
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
  }
</style>