<template>
  <div>
    <div>
      <AIheader :h1="'智能导诊'"></AIheader>
      <h1 class="part-title">症状列表</h1>
      <div
        class="part"
        v-for="item in symptomList "
        :key="item.ID"
        @click="getQuestion(item.DIRECT_RECOMMEND_FLAG, item.KNOWLEDGE_BASE_ID, item.DESC)"
      >{{item.DESC}}</div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/mixin'

export default {
 
  mixins: [mixin],

  data() {
    return {
      symptomList: [],
      deptList: [],
      questionList: []
    }
  },
  props: {
    list: {
      default: ''
    }
  },
  activated() {
    this.symptomList = this.list ? this.list : this.symptomList
  },
  methods: {
    // 点击症状
    getQuestion(flag, id, desc) {
      this.$store.dispatch('setSymptom', desc)
      if (flag === '1') {
        this.getDept(id, flag)
        
      } else {
        this.$router.push({ name: 'question', params: { flag, id } })
      }
    },
  

    // 判断flag 并获取 问题列表
    query(flag, knowId, type) {
      let that = this
      if (flag === '1') return this.getDept(knowId, flag)
      return new Promise((resolve, reject) => {
        that
          .$post('2001', [
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

    getDept(id, flag) {
      return this.$post('2002', [
        {
          LogicalOperatorsCode: '10',
          key: 'KNOWLEDGE_BASE_ID',
          OperationalCharacterCode: '50',
          value: id || ''
        }
      ]).then(res => {
        
          this.$router.push({ name: 'deptList', params: { flag, id, list: res.data} })
       
      })
    }
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