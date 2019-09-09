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
        <el-table-column prop="SETTLEMENT_DATE_TIME" label="结算日期" align="center"></el-table-column>
        <el-table-column prop="BABY_SELF_FEE" label="婴儿计费" align="center"></el-table-column>
        <el-table-column prop="TOTAL_FEE" label="总费用" align="center"></el-table-column>
        <el-table-column prop="SELF_PAYMENT_FEE" label="自费费用" align="center"></el-table-column>
        <el-table-column prop="MI_SELF_FEE" label="其中自理" align="center"></el-table-column>
        <el-table-column prop="SETTLEMENT_DATE_TIME" label="结算日期" align="center"></el-table-column>
        <!-- <el-table-column label="查看明细" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">查看明细</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="8">
        <span>合计金额：</span>
      </el-col>
      <el-col :span="8" align="center">
        <el-button @click="dialog = true" type="primary">高级筛查</el-button>
      </el-col>
      <el-col :span="8">
        <el-pagination
          background
          layout="->, total, prev, next"
          :total="total"
          :current-page="currentPage"
          @current-change="pageClick"
        ></el-pagination>
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
import { mixin } from '@/mixin'
import { mapGetters } from 'vuex'
export default {
  name: 'nokeepAlive',
  mixins: [mixin],
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
      dialog: false,
      total: 0,
      currentPage: 1
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
      this.$router.push({ name: 'inHospitalDetial', params: { row: this.row } })
    },
    initData(page) {
      if (!this.userInfo) return
      this.$post(
        '1018',
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
        console.log(res)
        // this.form.name = `${this.userInfo.PATIENT_NAME} (${res.data[0].GENDER_NAME})`
        this.tableData = res.data || []
        this.total = res.Total
      })
    },
    pageClick(page) {
      console.log(page)
      this.initData(page)
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