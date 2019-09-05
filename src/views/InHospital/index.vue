<template>
  <div>
    <el-row>
      <el-form :label-position="'right'" label-width="100px" :model="formLabelAlign">
        <el-col :span="8" v-for="(item, index) in itemList" :key="index">
          <el-form-item :label="item.lab">
            <span>{{formLabelAlign[item.val]}}</span>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-table :data="tableData" border style="width: 100%" size="medium">
        <el-table-column prop="date" label="收费类型" align="center"></el-table-column>
        <el-table-column prop="date" label="收费项目" align="center"></el-table-column>
        <el-table-column prop="date" label="单位" align="center"></el-table-column>
        <el-table-column prop="date" label="单价" align="center"></el-table-column>
        <el-table-column prop="date" label="数量" align="center"></el-table-column>
        <el-table-column prop="date" label="结算日期" align="center"></el-table-column>
        <el-table-column prop="date" label="发生日期" align="center"></el-table-column>
        <el-table-column prop="date" label="状态" align="center"></el-table-column>
      </el-table>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="8">
        <span>合计金额：</span>
      </el-col>
      <el-col :span="8">
        <el-button @click="dialog = true" type="primasy">高级筛查</el-button>
      </el-col>
      <el-col :span="8">
        <el-pagination background layout="->, total, prev, next" :total="50"></el-pagination>
      </el-col>
    </el-row>

    <el-drawer
      title="我嵌套了 Form !"
      :visible.sync="dialog"
      custom-class="demo-drawer"
      ref="drawer"
      modal-append-to-body
    >
      <div class="demo-drawer__content">
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        { lab: '姓名', val: 'name' },
        { lab: '病案号', val: 'name' },
        { lab: '病案号', val: 'name' },
        { lab: '住院时段', val: 'name' },
        { lab: '预缴金额', val: 'name' },
        { lab: '住院天数', val: 'name' },
        { lab: '余额', val: 'name' },
        { lab: '自付', val: 'name' },
        { lab: '入住科室', val: 'name' }
      ],
      formLabelAlign: {
        name: 'uyguyg',
        region: '',
        type: ''
      },
      tableData: [
        {
          date: '上午',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      dialog: false
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>