<template>
  <el-table :data="tableData" border style="width: 100%" size="medium">
    <el-table-column prop="date" label="时段" align="center"></el-table-column>
    <el-table-column prop="date" label="星期一" align="center">
      <template slot-scope>
        <div v-for="item in 5" :key="item" style="margin:10px;">
          <el-tag type="primary">的开发计</el-tag>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '上午',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  }
}
</script>