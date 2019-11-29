<template>
  <div>
    <AIheader :h1="'智能导诊'"></AIheader>

    <h2 class="part-title">{{questionList[questionIndex] && questionList[questionIndex].DESC}}</h2>
    <!-- 选项列表 -->
    <div
      class="part"
      v-for="i in optionList"
      :key="i.KNOWLEDGE_BASE_ID"
      @click="nextQuestion(i.DIRECT_RECOMMEND_FLAG, i.KNOWLEDGE_BASE_ID)"
    >
      <span>{{i.DESC}}</span>
    </div>

    <div class="part" @click="nextQuestion()">跳过此问题</div>
  </div>
</template>

<script>
import { mixin } from '@/mixin'

export default {
  mixins: [mixin],
  name: 'nokeepAlive',
  data() {
    return {
      symptomList: [],
      questionIndex: 0,
       optionList: [],
        deptList: [],
      questionList: []
    }
  },
  props: {
    flag: {
      default: ''
    },
    id: {
      deptList: ''
    }
  },
  mounted() {
    console.log('init', this.flag,this.id)
    if(this.id){

      this.init(this.flag, this.id)
    } else {
      this.$router.push({name: 'intelligence'})
    }
  },
  methods: {
    init(flag, id) {
      this.query(flag, id, 'QUESTION').then(res => {
        if (res) {
          this.questionList = res || []
          this.query(flag, this.getQuestionId(), 'OPTION').then(res => {
            this.optionList = res
          })
        }
      })
    },

     // 点击选项
    nextQuestion(flag, id){
      id  && this.getDept(id, flag)
      if(flag === '1' || this.questionIndex >= this.questionList.length-1) {
        this.toDept(flag, id, this.deptList)
        this.questionIndex = 0 
        return false
      }
      this.questionIndex++
      // 获取选项
      this.query(flag || '0', this.getQuestionId(this.questionIndex), 'OPTION').then(res => {
        this.optionList = res
      })
      
    },
     getQuestionId(ind){
      ind = ind ? ind : this.questionIndex
      return this.questionList[ind].KNOWLEDGE_BASE_ID
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
    toDept(id, flag, list) {
      this.$router.push({name: 'deptList', params: {list}})
    },
    getDept(id, flag) {
      return this.$post('1027', [
        {
          LogicalOperatorsCode: '10',
          key: 'KNOWLEDGE_BASE_ID',
          OperationalCharacterCode: '50',
          value: id || ''
        }
      ]).then(res => {
        if (flag === '1') {
          this.deptList = res.data
          this.toDept(flag, id, this.deptList)
        } else {
          this.handleDept(res.data)
        }
      })
    },

     handleDept(res = []){
      res.forEach(ele => {
          let ind = this.deptList.findIndex((value) => value.DEPT_NAME == ele.DEPT_NAME)
          if(ind === -1){
            this.deptList.push(ele)
          } else {
            this.deptList[ind].WEIGHTED_SCORE = Number(this.deptList[ind].WEIGHTED_SCORE) + Number(ele.WEIGHTED_SCORE) 
          }
        })
        this.deptList.sort((a, b) => b.WEIGHTED_SCORE-a.WEIGHTED_SCORE )
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