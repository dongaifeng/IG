<template>
  <div class="black-color">
    <AIheader :h1="'智能导诊'"></AIheader>
    <el-row>
          <div class="box-redio">
          <el-radio-group @change="symptomList=[];showPart=''"  v-model="radio1" size="medium">
            <el-radio-button label="人体"></el-radio-button>
            <el-radio-button label="列表"></el-radio-button>
          </el-radio-group>
        </div>
    </el-row>
    <el-row>
      <el-col :span="12">
        
<!-- 人体图 -->
        <div v-show="radio1 == '人体'" class="body-img" :style="$imgSrc(src)" >
          <div 
           v-for="item in arr"
           :key="item.name" 
           :style="item" 
           class="body-part" 
           @click="bodyClick(item.name, item.code)">
            <img v-show="item.name === showPart" :src="item.src" />
          </div>
        </div>
<!-- 人体列表 -->
        <div v-show="radio1 == '列表'">
          <h1 class="part-title">人体部位列表</h1>
          <div v-for="item in bodyList" :key="item.code">
              <div class="part"
               @click="bodyClick(item.KNOWLEDGE_BASE_ID, item.CODE)"
               :class="{ myactive: item.KNOWLEDGE_BASE_ID == showPart}"
               >{{item.DESC}}</div>
          </div>
        </div>
      </el-col>

<!-- 症状列表 -->
      <el-col :span="12">
        <div>
        <h1 class="part-title">症状列表</h1>
          <div class="part" v-for="item in symptomList " :key="item.ID" @click="getQuestion(item.DIRECT_RECOMMEND_FLAG, item.KNOWLEDGE_BASE_ID, item.DESC)">{{item.DESC}}</div>
        </div>
        <div v-if="!symptomList.length && radio1=='人体'" class="warn">
          从人体图像中选中部位进行选择症状
        </div>
      </el-col>
    </el-row>


   
  </div>
</template>

<script>
import { mixin } from '@/mixin'
export default {
  name: 'nokeepAlive',
  mixins: [mixin],
  data() {
    return {
      src: '/images/body/body.png',
      showPart: '',
      radio1: '人体',
      questionTitle: '',
      deptList: [],
      symptomList: [],
      bodyList: [],
      questionList: [],
      optionList: [],
      arr:[
        {
          code: 'B1',
          top: '0px',
          left: '125PX',
          width: '90PX',
          height: '122PX',
          name:'head',
          src: '/images/body/head.png'
        },
        {
          code: 'B2',
          top: '145px',
          left: '26PX',
          width: '284PX',
          height: '241PX',
          name:'arm',
          src: '/images/body/arm.png'
        },
         {
          code: 'B2',
          top: '380px',
          left: '-5PX',
          width: '344PX',
          height: '90PX',
          name:'hand',
          src: '/images/body/hand.png'
        },
        {
           code: 'B5',
          top: '230px',
          left: '97PX',
          width: '144PX',
          height: '122PX',
          name:'belly',
          src: '/images/body/belly.png'
        },
         {
            code: 'B2',
          top: '391px',
          left: '86PX',
          width: '161PX',
          height: '336PX',
          name:'leg',
          src: '/images/body/leg.png'
        },
        {
          code: 'B6',
          top: '354px',
          left: '92PX',
          width: '153PX',
          height: '70PX',
          name:'crotch',
          src: '/images/body/crotch.png'
        },
        
         {
          code: 'B2',
          top: '724px',
          left: '93PX',
          width: '148PX',
          height: '71PX',
          name:'foot',
          src: '/images/body/foot.png'
        },
         {
           code: 'B3',
          top: '103px',
          left: '120PX',
          width: '100PX',
          height: '52PX',
          name:'neck',
          src: '/images/body/neck.png'
        },
        {
          code: 'B4',
          top: '158px',
          left: '93PX',
          width: '152PX',
          height: '84PX',
          name:'chest',
          src: '/images/body/chest.png'
        },
       
      ]
    }
  },
  mounted() {
    this.getBodyList()
    this.$store.dispatch('setQuestion', 'clear')
  },
  methods: {
    bodyClick (id, code){
      this.showPart = id
      this.getData(code)
      
    },
    // 点击部位
    getData (code) {
      this.$store.dispatch('setPart', this.bodyList.find(val => val = code))
       this.$post('2001', [
        {
          LogicalOperatorsCode: '10',
          key: 'HIERARCHY',
          OperationalCharacterCode: '50',
          value: 'BODYPART'
        },
        {
          LogicalOperatorsCode: '10',
          key: 'CODE',
          OperationalCharacterCode: '50',
          value: code
        }
      ]).then(res => {
       let { DIRECT_RECOMMEND_FLAG, KNOWLEDGE_BASE_ID } = res.data[0]
       this.query(DIRECT_RECOMMEND_FLAG, KNOWLEDGE_BASE_ID, 'SYMPTOM').then(res => {
          // this.$router.push({name: 'symptom', params: {list: res}})
          this.symptomList = res
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
    },
    getQuestionId(ind){
      ind = ind ? ind : this.questionIndex
      return this.questionList[ind].KNOWLEDGE_BASE_ID
    },
// 点击症状
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
    query(flag, knowId, type){
      let that = this
      if(flag === '1') return this.toDept(knowId, flag)
      return new Promise((resolve, reject) => {
          that.$post('2001', [
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
          ]).then(res => {
            resolve( res.data)
          })
      })
    },


 toDept(id, flag) {
      this.$router.push({name: 'deptList', params: {id, flag}})
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
    // 获取部位列表
    getBodyList(){
      this.$post('2001', [
        {
          LogicalOperatorsCode: '10',
          key: 'HIERARCHY',
          OperationalCharacterCode: '50',
          value: 'BODYPART'
        }
      ]).then(res => {
       this.bodyList = res.data
      
      })
    },
    
  }
}
</script>

<style lang="scss" scoped>
.body-img {
  width: 342PX;
  height: 800PX;
  // border: 1px solid red;
  margin: 10px auto 0px;
  position: relative;
  .body-part {
    // border: 1px solid red;
    position: absolute;
  }
}
.box-redio{
  margin: 10px auto;
  text-align: center;
  .el-radio-button /deep/ .el-radio-button__inner {
    padding: 10px 20px;
  }
}
.part-title{
  text-align: center;
  margin: 20px;
}
.part{
  background: #eee;
  text-align: center;
  margin: 40px 30px;
  font-size: 25px;
  padding: 20px;
  color: #184b8f;
}
.my-dialog .el-dialog__header .el-dialog__title {
  font-size: 30px !important;
}

 .myactive {
    background: #184b8f;
    color: #fff;
    &:before,
    &:after {
      background: #184b8f;
      color: #fff;
    }
  }
  .warn{
    margin: 20vh auto;
    width: 500px;
    height: 240px;
    background: #eee;
    font-size: 25px;
    line-height: 240px; 
    text-align: center
  }
</style>