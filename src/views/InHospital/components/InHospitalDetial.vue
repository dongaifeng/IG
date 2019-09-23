<template>
  <div>
    <AIheader :h1="'住院费用'"></AIheader>

    <el-row>
      <el-form :label-position="'right'" label-width="100px" :model="row">
        <el-col :span="8" v-for="(item, index) in itemList" :key="index">
          <el-form-item :label="item.lab">
            <span>{{row[item.val]}}</span>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-row>
      <el-table :data="tableData" border style="width: 100%" size="medium">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="CLASS_NAME" label="收费类型" align="center"></el-table-column>
        <el-table-column prop="CHARGE_ITEM_NAME" label="收费项目" align="center"></el-table-column>
        <el-table-column prop="CHARGE_ITEM_SPEC" label="单位" align="center"></el-table-column>
        <el-table-column prop="CHARGE_ITEM_PRICE" label="单价" align="center"></el-table-column>
        <el-table-column prop="QUANTITY" label="数量" align="center"></el-table-column>
        <el-table-column prop="CHARGE_FEE" label="金额" align="center"></el-table-column>
        <el-table-column prop="SETTLEMENT_DATE_TIME" label="结算日期" align="center"></el-table-column>
        <el-table-column prop="CHARGE_DATE" label="发生日期" align="center"></el-table-column>
        <el-table-column prop="CHARGE_STATUS" label="状态" align="center"></el-table-column>
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
        ></page>
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
import { mixin, page } from '@/mixin'
import { mapGetters } from 'vuex'
export default {
  name: 'nokeepAlive',
  mixins: [mixin, page],
  data() {
    return {
      itemList: [
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
      formLabelWidth: '80px',
      dialog: false
    }
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.initData(this.currentPage)
  },
  methods: {
    handleEdit(id) {
      this.$router.push({ name: 'inHospitalDetial' })
    },
    initData(page) {
      if (!this.userInfo) return
      this.$post(
        '1017',
        [
          {
            LogicalOperatorsCode: '10',
            key: 'ENCOUNTER_ID',
            OperationalCharacterCode: '100',
            value: this.row.ENCOUNTER_ID
          }
        ],
        { size: 10, current: page }
      ).then(res => {
        // this.form.name = `${this.userInfo.PATIENT_NAME} (${res.data[0].GENDER_NAME})`
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