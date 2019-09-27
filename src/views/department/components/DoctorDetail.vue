<template>
  <div>
    <AIheader :h1="info.DOCTOR_NAME" home></AIheader>

    <el-tabs stretch type="border-card">
      <el-tab-pane label="个人简介">
        <div class="box">
          <div class="img">
            <el-image :src="info.PICTURE" class="image">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <p class="name">{{info.DOCTOR_NAME}}</p>
          </div>
          <span class="title">专长：</span>
          <p class="text">{{ info.SKILLED }}</p>
          <span class="title">阅历：</span>
          <p class="text">{{info.INTRODUCITON}}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="门诊出诊时间">
        <el-table :data="tableData" border style="width: 100%" size="medium">
          <el-table-column prop="DEPT_NAME" label="门诊科室" align="center"></el-table-column>
          <el-table-column prop="VISIT_TIME" label="门诊时间" align="center"></el-table-column>
          <el-table-column prop="VISIT_PLACES" label="出诊地点" align="center"></el-table-column>
          <el-table-column prop="REGISTER_TYPE_NAME" label="出诊类别" align="center"></el-table-column>
          <el-table-column prop="MEDICAL_SERVICE_FEE" label="医师服务费" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AIheader from '@/components/AIheader'
export default {
  name: 'nokeepAlive',
  components: { AIheader },
  data() {
    return {
      info: {},
      tableData: []
    }
  },
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    this.initData()
    this.initTableData()
  },
  methods: {
    // toSrc(id) {
    //   if (id) return '/images/leaderImage/' + id + '.png'
    // },
    initData() {
      this.$post('1012', [
        {
          LogicalOperatorsCode: '10',
          key: 'DOCTOR_CODE',
          OperationalCharacterCode: '50',
          value: this.id
        }
      ]).then(res => {
        this.info = res.data[0]
      })
    },
    initTableData() {
      this.$post('1026', [
        {
          LogicalOperatorsCode: '10',
          key: 'SPECIALIST_DOCTOR_CODE',
          OperationalCharacterCode: '50',
          value: this.id
        }
      ]).then(res => {
        this.tableData = res.data || []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 30px;
  .img {
    width: 15%;
    float: left;
    text-align: center;
    padding-right: 20px;
    .image {
      width: 100%;
      /deep/ .image-slot {
        width: 100%;
        height: 228px;
        font-size: 30px;
        line-height: 228px;
        background: #ccc;
      }
    }

    .job {
      font-size: 16px;
    }
    .name {
      font-size: 20px;
    }
  }
  .text {
    font-size: 20px;
    text-indent: 2em;
  }
  .title {
    font-size: 25px;
    display: block;
    color: blueviolet;
    margin: 20px;
  }
}

.el-tabs {
  box-shadow: none;
  border-bottom: none;
  /deep/ .el-tabs__item {
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}
</style>