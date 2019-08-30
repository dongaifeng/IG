<template>
  <div>
    <AIheader :h1="SHOW_NAME" :lab="'查询科室信息'" search></AIheader>
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
  props: ['DEPT_INTRODUCITON', 'SHOW_NAME', 'DEPT_CODE'],
  computed: {
    list: function() {
      return this.getList()
    }
  },
  methods: {
    getList() {
      let data
      this.$post('10010', [
        {
          LogicalOperatorsCode: '10',
          key: 'DEPT_CODE',
          OperationalCharacterCode: '50',
          value: this.DEPT_CODE
        }
      ]).then(res => {
        data = res.data
      })
      return data
    }
  }
}
</script>