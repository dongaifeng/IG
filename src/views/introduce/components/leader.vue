<template>
<keep-alive>
  <div class="mixin-components-container">
    <el-row :gutter="100">
      <el-col v-for="(item, index) in list" :key="index" :span="6" >
        <router-link :to="{name: 'leaderDetail', params: {info: item}}">
        <el-card class="box-card" shadow="always">
          <img :src="toSrc(item.ID)" class="image">
          <div>
            <span class="name">{{item.LEADER_NAME}}</span>
            <div class="bottom clearfix">
              <span class="job">{{ item.LEADER_DUTY }}</span>
            </div>
          </div>
        </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
  </keep-alive>
</template>

<script>
export default {
  name: 'leader',
  components: {
  },
  data() {
    return {
      src: require('@/assets/leaderImage/1.png'),
      list: []
    }
  },
  mounted () {
    this.list.length === 0 && this.initData()
  },
  methods: {
    initData () {
       this.$post('1005', [{
        LogicalOperatorsCode: "10",
        key: "DELETE_FLAG",
        OperationalCharacterCode: "50",
        value: "0"
       }]).then(res => {
            this.list = res.data
        })
     },
     toSrc (id) {
       return require('@/assets/leaderImage/'+ id +'.png')
     }
  }
}
</script>

<style lang="scss" scoped>
.el-col {
    margin-bottom: 20px;
    border-radius: 4px;
    &:last-child {
      margin-bottom: 0;
    }
  }

.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  text-align: center;
  min-height: calc(100vh - 84px);
}
.job {
    font-size: 13px;
    color: #999;
  }
  .name {
    font-size: 18px;
    color: blue;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
