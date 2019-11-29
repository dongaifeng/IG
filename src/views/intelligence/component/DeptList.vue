<template>
  <div>
    <div>
      <AIheader :h1="'智能导诊'"></AIheader>
      <div>
        <h1 class="part-title">推荐科室</h1>
        <div type="info" class v-for="item in list" :key="item.ID">
          {{ item.DEPT_NAME }}---{{ item.WEIGHTED_SCORE }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/mixin'
export default {
  mixins: [mixin],
  name: 'nokeepAlive',
  data() {
    return {
      deptList: []
    }
  },
  props: {
    id: {
      default: ''
    },
    flag: {
      default: ''
    },
    list: {
     
    }
  },
  mounted() {
    // this.deptList = this.list
   // this.getDept(this.id, this.flag)
  },
  methods: {
    getDept(id, flag) {
      return this.$post('1027', [
        {
          LogicalOperatorsCode: '10',
          key: 'KNOWLEDGE_BASE_ID',
          OperationalCharacterCode: '50',
          value: id || ''
        }
      ]).then(res => {
        console.log('res', res.data)
        if (flag === '1') {
          this.deptList = res.data
        } else {
          this.handleDept(res.data)
        }
      })
    },

    // 判断flag 并获取 问题列表
    query(flag, knowId, type) {
      let that = this
      if (flag === '1') return this.getDept(knowId, flag)
      return new Promise((resolve, reject) => {
        that
          .$post('1026', [
            {
              LogicalOperatorsCode: '10',
              key: 'HIERARCHY',
              OperationalCharacterCode: '50',
              value: type
            },
            {
              LogicalOperatorsCode: '10',
              key: 'PARENT_ID',
              OperationalCharacterCode: '50',
              value: knowId
            }
          ])
          .then(res => {
            resolve(res.data)
          })
      })
    },

     


  }
}
</script>

<style lang="scss" scoped>
.body-img {
  width: 342px;
  height: 800px;
  border: 1px solid red;
  margin: 10px auto 0px;
  position: relative;
  .body-part {
    // border: 1px solid red;
    position: absolute;
  }
}
.box-redio {
  margin: 10px auto;
  text-align: center;
  .el-radio-button /deep/ .el-radio-button__inner {
    padding: 10px 20px;
  }
}
.part-title {
  text-align: center;
  margin: 20px;
}
.part {
  background: #ccc;
  text-align: center;
  margin: 40px 30px;
  font-size: 25px;
  padding: 20px;
}
.my-dialog .el-dialog__header .el-dialog__title {
  font-size: 30px !important;
}
</style>
