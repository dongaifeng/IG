<template>
  <div>
    <AIheader :h1="lab" :lab="'查询科室信息'" search home></AIheader>
    <el-tabs type="border-card">
      <el-tab-pane label="科室简介">
        <DepInfo :text="DEPT_INTRODUCITON" />
      </el-tab-pane>
      <el-tab-pane label="主要领导">
        <DepLeader :list="list" />
      </el-tab-pane>
      <el-tab-pane label="专家出诊列表">
        <dep-list :tableData="expertList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mixin } from '@/mixin'
import DepLeader from './DepLeader'
import DepList from './DepList'
import DepInfo from './DepInfo'
export default {
  // name: 'nokeepAlive',
  mixins: [mixin],
  components: { DepInfo, DepList, DepLeader },
  data() {
    return {
      list: [],
      expertList: [],
      lab: null
    }
  },
  props: ['DEPT_INTRODUCITON', 'SHOW_NAME', 'DEPT_CODE'],
  mounted() {
    this.getList()
    this.getExpertList()
    this.lab = this.SHOW_NAME || '科室介绍'
  },
  computed: {},
  methods: {
    getList() {
      this.$post('1010', [
        {
          LogicalOperatorsCode: '10',
          key: 'DEPT_CODE',
          OperationalCharacterCode: '50',
          value: this.DEPT_CODE
        }
      ]).then(res => {
        this.list = res.data
      })
    },
    getExpertList() {
      this.$post('1011', [
        {
          LogicalOperatorsCode: '10',
          key: 'DEPT_CODE',
          OperationalCharacterCode: '50',
          value: this.DEPT_CODE
        }
      ]).then(res => {
        this.expertList = this.toList(res.data)
      })
    },
    toList(list = []) {
      let data = [
        {
          TIME_FRAME_CODE: '上午',
          W01: []
        },
        {
          TIME_FRAME_CODE: '下午',
          W01: []
        }
      ]

      list.forEach(ele => {
        if (ele.TIME_FRAME_CODE === 'AM') {
          if (!data[0][ele.WEEK_CODE]) data[0][ele.WEEK_CODE] = []
          if (ele.SPECIALIST_DOCTOR_NAME && ele.SPECIALIST_DOCTOR_CODE) {
            data[0][ele.WEEK_CODE].push({
              name: ele.SPECIALIST_DOCTOR_NAME,
              code: ele.SPECIALIST_DOCTOR_CODE,
              color: ele.REGISTER_TYPE_CODE
            })
          }
        } else if (ele.TIME_FRAME_CODE === 'PM') {
          if (!data[1][ele.WEEK_CODE]) data[1][ele.WEEK_CODE] = []
          if (ele.SPECIALIST_DOCTOR_NAME && ele.SPECIALIST_DOCTOR_CODE) {
            data[1][ele.WEEK_CODE].push({
              name: ele.SPECIALIST_DOCTOR_NAME,
              code: ele.SPECIALIST_DOCTOR_CODE,
              color: ele.REGISTER_TYPE_CODE
            })
          }
        }
      })

      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tabs {
  box-shadow: none;
  border-bottom: none;
  /deep/ .el-tabs__item {
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}
</style>