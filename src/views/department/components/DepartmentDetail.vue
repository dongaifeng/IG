<template>
  <div>
    <AIheader :h1="lab" home></AIheader>
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
import { mapState } from 'vuex'
export default {
  name: 'nokeepAlive',
  mixins: [mixin],
  components: { DepInfo, DepList, DepLeader },
  data() {
    return {
      list: [],
      expertList: [],
      lab: ''
    }
  },
  computed: {
    ...mapState({
      DEPT_INTRODUCITON: state => state.app.departmentDetail.DEPT_INTRODUCITON,
      SHOW_NAME: state => state.app.departmentDetail.SHOW_NAME,
      DEPT_CODE: state => state.app.departmentDetail.DEPT_CODE
    })
  },
  // props: ['DEPT_INTRODUCITON', 'SHOW_NAME', 'DEPT_CODE'],
  // beforeRouteEnter(to, from, next) {
  //   console.log(from)
  //   if (from.name === 'department') {
  //     next(vm => {
  //       debugger
  //       vm.$nextTick(function() {
  //         vm.getList()
  //         vm.getExpertList()
  //         vm.lab = vm.SHOW_NAME || '科室介绍'
  //       })
  //     })
  //   } else {
  //     next()
  //   }
  // },
  mounted() {
    this.getList()
    this.getExpertList()
    this.lab = this.SHOW_NAME || '科室介绍'
  },
  watch: {},

  methods: {
    // 获取主要领导数据
    getList() {
      this.$post('1010', [
        {
          LogicalOperatorsCode: '10',
          key: 'DEPT_CODE',
          OperationalCharacterCode: '50',
          value: this.DEPT_CODE
        }
      ]).then(res => {
        this.list = res.data || []
      })
    },
    // 获取专家出诊列表
    getExpertList() {
      this.$post('1011', [
        {
          LogicalOperatorsCode: '10',
          key: 'DEPT_CODE',
          OperationalCharacterCode: '50',
          value: this.DEPT_CODE
        }
      ]).then(res => {
        this.expertList = res.data ? this.toList(res.data) : []
      })
    },
    // 专家出诊列表 数据转换
    toList(list = []) {
      if (list.length === 0) return
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