<template>
  <div>
    <el-table
      cell-class-name="cell-class"
      header-cell-class-name="header-myclass"
      :data="tableData"
      border
      style="width: 100%"
      size="medium"
    >
      <el-table-column prop="TIME_FRAME_CODE" label="时段" align="center"></el-table-column>
      <el-table-column
        v-for="(item, ind) in col"
        :key="ind"
        :prop="item.code"
        :label="item.name"
        align="center"
      >
        <template slot-scope="scope">
          <div
            v-for="(item,ind) in scope.row[item.code]"
            :key="ind"
            style="margin:10px;"
            @click="doctorDetail(item.code)"
          >
            <el-tag type="primary" :color="bg[item.color][1]">{{bg[item.color][0][0]}}</el-tag>
            <span>{{ item.name | toName }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <span v-for="(item, ind) in bg" :key="ind">
          <el-tag :color="item[1]">{{item[0][0]}}</el-tag>
          <span class="job-title">{{item[0]}}</span>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      col: [
        { code: '1', name: '星期一' },
        { code: '2', name: '星期二' },
        { code: '3', name: '星期三' },
        { code: '4', name: '星期四' },
        { code: '5', name: '星期五' },
        { code: '6', name: '星期六' },
        { code: '7', name: '星期日' }
      ],
      bg: {
        GHLB01: ['普通', '#FF9F40'],
        GHLB07: ['台州院区', '#63A2F5'],
        GHLB04: ['资深专家', '#A389EB'],
        GHLB02: ['专家', '#FF9F40'],
        GHLB03: ['特需', '#E96254'],
        GHLB05: ['资深特需', '#FF9F40'],
        GHLB06: ['名中医', '#FF9F40']
      }
    }
  },
  props: {
    tableData: {
      default: () => []
    }
  },
  created() {
    // this.$slots.default = [this.renderField()]
  },
  computed: {},
  filters: {
    toName: function(value) {
      if (!value) return
      return value
    }
  },
  methods: {
    renderField() {
      const h = this.$createElement
      return h('div', {}, ['dftghjif', h('span', {}, 'aaaa')])
    },
    doctorDetail(id) {
      this.$router.push({
        name: 'doctorDetail',
        params: { id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  color: #fff;
  font-size: 18px;
  line-height: 40px;
  height: 40px;
}
.el-table {
  font-size: 20px;
}
.job-title {
  font-size: 20px;
  padding-right: 30px;
}
</style>