<template>
  <div>
    <AIheader :h1="SHOW_NAME" :lab="'查询科室信息'" search home></AIheader>
    <el-tabs type="border-card">
      <el-tab-pane label="科室简介">
        <DepInfo :text="DEPT_INTRODUCITON" />
      </el-tab-pane>
      <el-tab-pane label="主要领导">
        <DepLeader :list="list" />
      </el-tab-pane>
      <el-tab-pane label="专家出诊列表">
        <dep-list />
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
  mixins: [mixin],
  components: { DepInfo, DepList, DepLeader },
  data() {
    return {
      list: []
    }
  },
  props: ['DEPT_INTRODUCITON', 'SHOW_NAME', 'DEPT_CODE'],
  mounted() {
    this.getList()
  },
  computed: {},
  methods: {
    getList() {
      let data = '2323'
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
      return data
    }
  }
}
</script>