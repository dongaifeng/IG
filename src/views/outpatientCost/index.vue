<template>
  <div>
    <AIheader :h1="'门诊费用'"></AIheader>

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
      <el-table
        header-row-class-name="myTableHeader"
        :data="tableData"
        border
        style="width: 100%"
        size="medium"
      >
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="PATIENT_NAME" label="病人姓名" align="center"></el-table-column>
        <el-table-column prop="SETTLEMENT_DATE_TIME" label="收费日期" align="center"></el-table-column>

        <el-table-column prop="CARD_NO" label="就诊卡号" align="center"></el-table-column>
        <el-table-column prop="TOTAL_FEE" label="费用总额" align="center" :formatter="caseFormatter"></el-table-column>
        <el-table-column label="费用明细查看" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row, 'outpatientCostDetial')">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="margin-top: 20px;">
      <!-- <el-col :span="8" align="center">
        <el-button @click="dialog = true" type="primary">高级筛查</el-button>
      </el-col>-->
      <el-col :span="24">
        <span>合计金额：{{totalCase}}</span>
        <page
          style="float: right"
          @current-change="pageClick"
          :total="total"
          :currentPage="currentPage"
          :size="10"
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
import { parseTime } from '@/utils'
export default {
  name: 'nokeepAlive',
  mixins: [mixin, page],
  data() {
    return {
      itemList: [{ lab: '姓名', val: 'name' }],
      tableData: [],
      form: {
        name: ''
      },
      formLabelWidth: '80px',
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    totalCase() {
      let a = this.tableData.reduce((pre, cur) => {
        return pre + Number(cur['TOTAL_FEE'])
      }, 0)
      return a.toFixed(2)
    }
  },
  mounted() {
    this.initData(this.currentPage)
  },
  methods: {
    handleEdit(row, route) {
      this.$router.push({ name: route, params: { row } })
    },
    caseFormatter(row, column) {
      let a = Number(row[column.property])
      return a.toFixed(2)
    },
    dateFormatter(row, column) {
      let a = row[column.property]
      return parseTime(a)
    },

    initData(page) {
      if (!this.userInfo) return
      this.$post(
        '1019',
        [
          {
            LogicalOperatorsCode: '10',
            key: 'PERSON_ID',
            OperationalCharacterCode: '50',
            value: (this.userInfo && this.userInfo.PERSON_ID) || ''
          }
        ],
        { size: 10, current: page }
      ).then(res => {
        this.form.name = `${this.userInfo.PATIENT_NAME} (${res.data[0]
          .GENDER_NAME || ''})`
        this.tableData = res.data || []
        this.total = res.Total
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.userInfo === null || vm.userInfo === '') {
        next({ name: 'home' })
      }
    })
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