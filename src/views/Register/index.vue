<template>
  <div>
    <AIheader
      :selName="selName"
      :searchAsync="searchAsync"
      @query="query"
      :h1="'挂号排版'"
      search
      :lab="[{name:'找医生',val:'1027'}, {name:'找科室',val:'1009'}]"
    ></AIheader>

    <el-row>
      <el-table :data="tableData" border style="width: 100%" size="medium">
        <el-table-column prop="WEEK_NAME" label="门诊时间" align="center" width="80"></el-table-column>
        <el-table-column prop="DEPT_NAME" label="科室名称" align="center" width="230"></el-table-column>
        <el-table-column prop="TIME_FRAME_NAME" label="时段" align="center" width="60"></el-table-column>
        <el-table-column prop="REGISTER_TYPE_NAME" label="挂号类型" align="center"></el-table-column>
        <el-table-column prop="SPECIALIST_DOCTOR_NAME" label="医师" align="center" width="80"></el-table-column>
        <el-table-column prop="LIMIT_NOM" label="限号" align="center"></el-table-column>
        <el-table-column prop="MAX_LIMIT_NOM" label="最高限号" align="center"></el-table-column>
        <el-table-column prop="APPOINTMENT_LIMIT_NOM" label="预约限号" align="center"></el-table-column>
        <el-table-column prop="MEDICAL_SERVICE_FEE" label="医事服务" align="center"></el-table-column>
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
import AIheader from '@/components/AIheader'
import { page } from '@/mixin'

export default {
  mixins: [page],

  components: { AIheader },
  data() {
    return {
      tableData: [],
      dialog: false,

      queryId: null,
      selName: 'DOCTOR_NAME',
      radio: '',
      key: 'DEPT_CODE'
    }
  },
  mounted() {
    this.initData(this.currentPage)
  },
  methods: {
    // 查询方法
    initData(page, id = null) {
      let arr = id
        ? [
            {
              LogicalOperatorsCode: '10',
              key: this.key,
              OperationalCharacterCode: '100',
              value: id
            }
          ]
        : []
      this.$post('1021', arr, { size: 20, current: page }).then(res => {
        this.tableData = res.data
        this.total = res.Total
      })
    },

    // 查询表格数据方法，预先判断 参数
    query(obj) {
      console.log(obj)
      if (obj) {
        if (this.radio === '1027') {
          this.queryId = obj.DOCTOR_CODE
          this.key = 'SPECIALIST_DOCTOR_CODE'
        } else {
          this.queryId = obj.DEPT_CODE
          this.key = 'DEPT_CODE'
        }
      } else {
        this.queryId = null
        this.key = 'DEPT_CODE'
      }
      this.initData(this.currentPage, this.queryId)
    },
    // 模糊查询回调 cb传入 list 需设置 selName 下拉显示值
    searchAsync(id, cb, radio) {
      this.radio = radio
      this.selName = radio === '1027' ? 'DOCTOR_NAME' : 'SHOW_NAME'
      this.$post(radio, [
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
        res.data
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