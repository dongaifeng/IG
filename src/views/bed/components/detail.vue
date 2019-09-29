<template>
  <div>
    <AIheader :h1="'费用明细'"></AIheader>

    <!-- <el-row>
      <el-form :label-position="'right'" label-width="100px" :model="form">
        <el-col :span="8" v-for="(item, index) in itemList" :key="index">
          <el-form-item :label="item.lab">
            <span>{{form[item.val]}}</span>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>-->

    <el-row>
      <el-table :data="tableData" border style="width: 100%" size="medium">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="CLASS_NAME" label="收费类型" align="center" width="100"></el-table-column>
        <el-table-column prop="CHARGE_ITEM_NAME" label="收费项目" align="center"></el-table-column>
        <el-table-column prop="CHARGE_ITEM_UNIT" label="单位" align="center" width="80"></el-table-column>
        <el-table-column prop="CHARGE_ITEM_PRICE" label="单价" align="center" width="80"></el-table-column>
        <el-table-column prop="QUANTITY" label="数量" align="center" width="80"></el-table-column>
        <el-table-column prop="CHARGE_FEE" label="金额" align="center" width="80"></el-table-column>
        <!-- <el-table-column prop="SETTLEMENT_DATE_TIME" label="结算日期" align="center"></el-table-column> -->
        <el-table-column prop="CHARGE_DATE" label="发生日期" align="center" width="100"></el-table-column>
        <!-- <el-table-column prop="CHARGE_STATUS" label="状态" align="center"></el-table-column> -->
      </el-table>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <page
          style="float: right"
          @current-change="pageClick"
          :total="total"
          :currentPage="currentPage"
          :size="18"
        ></page>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mixin, page } from '@/mixin'
export default {
  name: 'nokeepAlive',
  mixins: [mixin, page],
  data() {
    return {
      itemList: [
        { lab: '姓名', val: 'PATIENT_NAME_DESC' },
        { lab: '病案号', val: 'MED_RECORD_NO' },
        { lab: '入住科室', val: 'DEPT_NAME' },
        { lab: '床位', val: 'BED_NO' },
        { lab: '预缴金额', val: 'PREPAY_FEE' },
        { lab: '余额', val: 'BALANCE' },
        { lab: '入院日期', val: 'VISIT_DATE_TIME' },
        { lab: '出院日期', val: 'DISCHARGE_DATE_TIME' },
        { lab: '住院天数', val: 'IN_DAYS' },
        { lab: '总费用', val: 'TOTAL_FEE' },
        { lab: '自付', val: 'TOTAL_SELF_PAYMENT_FEE' }
      ],
      tableData: [],
      form: {
        name: ''
      },
      formLabelWidth: '80px',
      dialog: false
    }
  },
  props: ['encounterID'],
  mounted() {
    this.initData(this.currentPage)
  },
  methods: {
    initData(page) {
      this.$post(
        '1030',
        [
          {
            LogicalOperatorsCode: '10',
            key: 'ENCOUNTER_ID',
            OperationalCharacterCode: '50',
            value: this.encounterID || ''
          }
        ],
        { size: 18, current: 1 }
      ).then(res => {
        this.tableData = res.data || []
        this.total = res.Total
      })
    }
  }
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