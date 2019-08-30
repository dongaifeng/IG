<template>
  <div>
    <el-row>
      <el-col>
        <AIheader :h1="'专家浏览'" :lab="'查医生'" search></AIheader>
      </el-col>
    </el-row>

    <el-row class="tabBox" :gutter="50">
      <el-col :span="3" v-for="item in tabList" :key="item.ID">
        <el-button @click="tabClick(item.CLASS_CODE)" class="tab" plain>{{item.CLASS_NAME}}</el-button>
      </el-col>
    </el-row>

    <el-row class="depBox" :gutter="50">
      <el-col :span="24" v-for="item in expertList" :key="item.DEPT_CODE">
        <!-- <el-button @click="depClick(item)" class="dep" type="primary">{{item.SHOW_NAME}}</el-button> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mixin } from '@/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      tabList: [],
      expertList: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    tabClick(id) {
      this.$post('1009', [
        {
          LogicalOperatorsCode: '10',
          key: 'DEPT_TYPE_CODE',
          OperationalCharacterCode: '50',
          value: id
        },
        {
          LogicalOperatorsCode: '10',
          key: 'DELETE_FLAG',
          OperationalCharacterCode: '50',
          value: '0'
        }
      ]).then(res => {
        this.expertList = res.data
      })
    },
    depClick(obj) {
      this.$router.push({ name: 'departmentDetail', params: obj })
    },
    initData() {
      this.$post('1008', [
        {
          LogicalOperatorsCode: '10',
          key: 'DICT_CODE',
          OperationalCharacterCode: '50',
          value: 'DeptType'
        }
      ]).then(res => {
        this.tabList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tabBox {
  padding: 30px;
  .tab {
    font-size: 22px;
    padding: 20px 40px;
    border: 2px solid blue;
  }
}

.depBox {
  padding: 0px 30px;
  .dep {
    font-size: 22px;
    padding: 20px 40px;
    margin-bottom: 30px;
  }
}
</style>