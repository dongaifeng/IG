<template>
  <div>
    <AIheader
      selName="SHOW_NAME"
      :searchAsync="searchAsync"
      @query="query"
      :h1="'挂号排版'"
      search
      :lab="'科室名称'"
    ></AIheader>

    <el-row>
      <el-table :data="tableData" border style="width: 100%" size="medium">
        <el-table-column prop="WEEK_NAME" label="门诊时间" align="center"></el-table-column>
        <el-table-column prop="DEPT_NAME" label="科室名称" align="center"></el-table-column>
        <el-table-column prop="TIME_FRAME_NAME" label="时段" align="center"></el-table-column>
        <el-table-column prop="REGISTER_TYPE_NAME" label="挂号类型" align="center"></el-table-column>
        <el-table-column prop="SPECIALIST_DOCTOR_NAME" label="医师" align="center"></el-table-column>
        <el-table-column prop="LIMIT_NOM" label="限号" align="center"></el-table-column>
        <el-table-column prop="MAX_LIMIT_NOM" label="最高限号" align="center"></el-table-column>
        <el-table-column prop="APPOINTMENT_LIMIT_NOM" label="预约限号" align="center"></el-table-column>
        <el-table-column prop="MEDICAL_SERVICE_FEE" label="医事服务" align="center"></el-table-column>
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
import AIheader from '@/components/AIheader'
export default {
  components: { AIheader },
  data() {
    return {
      tableData: [],
      dialog: false,
      total: 0,
      currentPage: 1,
      queryId: null
    }
  },
  mounted() {
    this.initData(this.currentPage)
  },
  methods: {
    initData(page, id = null) {
      let arr = id
        ? [
            {
              LogicalOperatorsCode: '10',
              key: 'DEPT_CODE',
              OperationalCharacterCode: '100',
              value: id
            }
          ]
        : []
      this.$post('1021', arr, { size: 10, current: page }).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.Total
      })
    },
    pageClick(page) {
      console.log(page)
      this.initData(page, this.queryId)
    },
    query(obj) {
      console.log(obj, '-----obj')

      this.queryId = obj ? obj.DEPT_CODE : null
      this.initData(this.currentPage, this.queryId)
    },
    // 模糊查询回调 cb传入 list 需设置 selName 下拉显示值
    searchAsync(id, cb) {
      this.$post('1009', [
        {
          LogicalOperatorsCode: '10',
          key: 'PY',
          OperationalCharacterCode: '100',
          value: id
        },
        {
          LogicalOperatorsCode: '10',
          key: 'DELETE_FLAG',
          OperationalCharacterCode: '50',
          value: '0'
        }
      ]).then(res => {
        console.log(res.data)
        cb(res.data || [])
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