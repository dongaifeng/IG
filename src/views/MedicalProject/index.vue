<template>
  <div>
    <AIheader
      selName="ITEM_NAME"
      :searchAsync="searchAsync"
      @query="query"
      :h1="'医疗项目'"
      search
      :lab="'医疗项目名称'"
    ></AIheader>

    <el-row>
      <el-table :data="tableData" border style="width: 100%" size="medium">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="ITEM_NAME" label="项目名称" align="center"></el-table-column>
        <el-table-column prop="UNIT" label="单位" align="center" width="60"></el-table-column>
        <el-table-column prop="PRICE" label="单价" align="center" width="80"></el-table-column>
        <el-table-column prop="MEDICARE_ITEM_CODE" label="医保代码" align="center" width="100"></el-table-column>
        <el-table-column prop="MEDICARE_ITEM_NAME" label="医保项目名称" align="center"></el-table-column>
        <el-table-column prop="OUT_FLAG" label="门诊" align="center" width="60"></el-table-column>
        <el-table-column prop="IN_FLAG" label="住院" align="center" width="60"></el-table-column>
        <el-table-column prop="MEDICARE_LEVEL" label="医保等级" align="center" width="100"></el-table-column>
        <el-table-column prop="SELF_PAY" label="自付" align="center" width="60"></el-table-column>
      </el-table>
    </el-row>

    <el-row style="margin-top: 20px;">
      <!-- <el-col :span="8">
        <span>合计金额：</span>
      </el-col>-->
      <!-- <el-col :span="8" align="center">
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
import { page } from '@/mixin'
import AIheader from '@/components/AIheader'
export default {
  components: { AIheader },
  mixins: [page],
  data() {
    return {
      tableData: [],
      dialog: false
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
              key: 'PY_CODE',
              OperationalCharacterCode: '100',
              value: id
            }
          ]
        : []
      this.$post('1014', arr, { size: 10, current: page }).then(res => {
        this.tableData = res.data
        this.total = res.Total
      })
    },

    query(obj) {
      this.tableData = [obj]
      // this.initData(this.currentPage, id)
    },
    // 模糊查询回调 cb传入 list 需设置 selName 下拉显示值
    searchAsync(id, cb) {
      this.$post(
        '1014',
        [
          {
            LogicalOperatorsCode: '10',
            key: 'PY_CODE',
            OperationalCharacterCode: '100',
            value: id
          }
        ],
        { size: 10, current: 1 }
      ).then(res => {
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