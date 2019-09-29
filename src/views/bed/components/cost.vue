<template>
  <div>
    <AIheader :h1="'费用清单'"></AIheader>

    <el-row>
      <el-form :label-position="'right'" label-width="100px" :model="form">
        <el-col :span="8" v-for="(item, index) in itemList" :key="index">
          <el-form-item :label="item.lab">
            <span>{{form[item.val]}}</span>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-table :data="tableData" border style="width: 100%" size="medium">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="CLASS_NAME" label="费用类别" align="center"></el-table-column>
        <el-table-column prop="TOTAL_FEE" label="总费用" align="center"></el-table-column>
        <!-- <el-table-column prop="BABY_SELF_FEE" label="婴儿计费" align="center"></el-table-column> -->
        <el-table-column prop="SELF_PAYMENT_FEE" label="自费金额" align="center"></el-table-column>
        <el-table-column prop="MI_SELF_FEE" label="医保自理" align="center"></el-table-column>
        <el-table-column label="每日清单" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row, 'costList')">每日清单</el-button>
          </template>
        </el-table-column>
        <el-table-column label="查看明细" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row, 'bedDetail')">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="margin-top: 20px;">
      <!-- <el-col :span="8">
        <span>合计金额：</span>
      </el-col>
      <el-col :span="8" align="center">
        <el-button @click="dialog = true" type="primary">高级筛查</el-button>
      </el-col>-->
      <el-col :span="24">
        <page
          style="float: right"
          @current-change="pageClick"
          :total="total"
          :currentPage="currentPage"
          :size="10"
        ></page>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mixin, page } from '@/mixin'
export default {
  mixins: [mixin, page],
  data() {
    return {
      itemList: [
        { lab: '姓名', val: 'PATIENT_NAME_DESC' },
        { lab: '病案号', val: 'MED_RECORD_NO' },
        { lab: '入院日期', val: 'VISIT_DATE_TIME' },
        { lab: '预缴金额', val: 'PREPAY_FEE' },
        { lab: '总费用', val: 'TOTAL_FEE' },
        { lab: '住院天数', val: 'IN_DAYS' },
        { lab: '余额', val: 'BALANCE' },
        { lab: '自付', val: 'TOTAL_SELF_PAYMENT_FEE' },
        { lab: '入住科室', val: 'DEPT_NAME' }
      ],
      tableData: [],
      form: {},
      ddd: null,
      formLabelWidth: '80px',
      dialog: false
    }
  },
  props: ['encounterID', 'row'],
  mounted() {
    this.ddd = this.encounterID
    this.form = this.row
  },
  activated() {
    this.initData(this.currentPage)
  },
  methods: {
    handleEdit(row, route) {
      this.$router.push({
        name: route,
        params: { encounterID: this.ddd }
      })
    },
    initData(page) {
      this.$post(
        '1029',
        [
          {
            LogicalOperatorsCode: '10',
            key: 'ENCOUNTER_ID',
            OperationalCharacterCode: '50',
            value: this.encounterID || this.ddd || ''
          }
        ],
        { size: 10, current: 1 }
      ).then(res => {
        this.tableData = res.data || []
        this.total = res.Total
      })
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (vm.userInfo === null || vm.userInfo === '') {
  //       next({ name: 'home' })
  //     }
  //   })
  // }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0px;
}
.el-pagination {
  margin: 0px 20px;
  text-align: center;
}
</style>