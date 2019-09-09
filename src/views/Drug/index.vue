<template>
  <div>
    <AIheader
      selName="DRUG_NAME"
      :searchAsync="searchAsync"
      @query="query"
      :h1="'医院药品'"
      search
      :lab="'药品名称'"
    ></AIheader>

    <el-row>
      <el-table :data="tableData" border style="width: 100%" size="medium">
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="DRUG_NAME" label="药品名称" align="center"></el-table-column>
        <el-table-column prop="SPEC" label="规格" align="center"></el-table-column>
        <el-table-column prop="MANUFACTORY_NAME" label="产地" align="center"></el-table-column>
        <el-table-column prop="RETAIL_PRICE" label="销售价(元)" align="center"></el-table-column>
        <el-table-column prop="DRUG_COMMON_NAME" label="医保药品名称" align="center"></el-table-column>
        <el-table-column prop="MEDICARE_LEVEL" label="医保等级" align="center"></el-table-column>
        <el-table-column prop="SELF_PAY" label="自付" align="center"></el-table-column>
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
              key: 'DRUG_NAME',
              OperationalCharacterCode: '100',
              value: id
            }
          ]
        : []
      this.$post('1024', arr, { size: 10, current: page }).then(res => {
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

      this.queryId = obj ? obj.DRUG_NAME : null
      this.initData(this.currentPage, this.queryId)
    },
    // 模糊查询回调 cb传入 list 需设置 selName 下拉显示值
    searchAsync(id, cb) {
      console.log(id, 'searchasync=====')
      this.$post('1024', [
        {
          LogicalOperatorsCode: '10',
          key: 'PY_CODE',
          OperationalCharacterCode: '100',
          value: id
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