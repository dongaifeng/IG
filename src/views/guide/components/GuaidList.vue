<template>
  <div class="box"> 
     <el-row>
        <el-col>
          <AIheader :h1="title" home></AIheader>
        </el-col>
      </el-row> 

      <el-row class="list" v-for="item in list" :key="item.ID">
        <el-col :span="2">
         {{item.ID}}
        </el-col>
        <el-col :span="20" align="left">
          <el-link>{{item.RECORD_TITLE_NAME}}</el-link>
        </el-col>
        <el-col :span="2">
         <el-button @click="link(item)" type="text">查看</el-button>
        </el-col>
      </el-row>
  </div>
</template>

<script>
 import AIheader from '@/components/AIheader'
 export default {
  components: { AIheader },
  data () {
   return {
      title: '',
      id: '',
      list: []
   }
  },
  activated () {  
    // this.getData()
  },
  methods: {
    link (item) {
      this.$router.push({name: 'guaidDetail', params: {title: this.title, text: item.RECORD_CONTENT, type: item.RECORD_TYPE}})
    },
    getData (id) {
       this.$post('1007', [{
        LogicalOperatorsCode: "10",
        key: "DYNAMIC_MEMU_CODE",
        OperationalCharacterCode: "50",
        value: id
       }]).then(res => {
            this.list = res.data
        })
     }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // console.log(to, from)
      if (to.params.title) vm.title = to.params.title
      if (to.params.id) vm.getData(to.params.id)
  })
  },
 }
</script>
<style lang="scss" scoped>
.box{
  .list{
    height: 50px;
    &:nth-of-type(odd){ background:#eee;}
    .el-col{
      line-height: 45px;
    }
  }
}
</style>