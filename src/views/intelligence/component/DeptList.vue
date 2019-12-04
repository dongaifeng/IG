<template>
  <div  class="black-color">
    <div>
      <AIheader :h1="'智能导诊'"></AIheader>
        <div class="cont-box">
        <div class="part-title"><p class="title-in">推荐科室</p><p style="float:right;">{{ new Date().toLocaleString()}}</p></div>
        <div class="cont dept" v-for="(item, ind) in list" :key="item.ID">
            
             <div v-if="ind<3">
                 {{ item.DEPT_NAME }}
             </div>

          <!-- --{{ item.WEIGHTED_SCORE }} -->
        </div>
      </div>
      <el-row >
        <el-col :span="12">
          <div>
            <div class="part-title"><p class="title-in">部位</p></div>
            <div class="cont">
              {{ $store.state.intelligence.part.DESC }}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
        <div class="part-title"><p class="title-in">症状</p></div>
        <div class="cont">
          {{ $store.state.intelligence.symptom }}
        </div>
      </div>
        </el-col>
      </el-row>

      <div>
        <div class="part-title"><p class="title-in">问答情况</p></div>
        <div class v-for="(item, ind) in $store.state.intelligence.question" :key="item.question">
         <div class="cont">
            {{ind + 1}}. {{ item.question }}?
         </div>
         <p class="text"><i class="el-icon-check"></i> {{ item.option }}</p>
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
      default: () => []
    }
  },
  mounted() {
    // this.deptList = this.list
   // this.getDept(this.id, this.flag)
  },
 
  methods: {
   
    getDept(id, flag) {
      return this.$post('2002', [
        {
          LogicalOperatorsCode: '10',
          key: 'KNOWLEDGE_BASE_ID',
          OperationalCharacterCode: '50',
          value: id || ''
        }
      ]).then(res => {
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

     


  }
}
</script>

<style lang="scss" scoped>
.cont-box{
  margin-bottom:20px;
  padding: 10px 0px 20px;
  box-sizing: border-box;
  border-bottom: 2px solid #eee;
}
.box{
  color: #606266;
}
.cont{
  font-size: 30px;
  padding-left: 20px;
}
.text{
  font-size: 30px;
  padding-left: 40px;
  margin-bottom:20px;
  font-family: cursive;
}
.part-title {
  padding-left: 0px;
  margin: 20px 10px;
 
  font-size: 28px;
  .title-in{
    background: #2461b3;
    display: inline-block;
    padding: 5px 18px;
    color: #fff;
  }
}
.part {
  background: #ccc;
  text-align: center;
  margin: 40px 30px;
  font-size: 25px;
  padding: 20px;
}
.dept{
 font-size: 30px;
 font-weight: 700;
 margin: 20px 30px;
}

</style>
