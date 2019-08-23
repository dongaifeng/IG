<template>
<keep-alive>
  <div class="mixin-components-container">
    <el-row :gutter="40">
      <el-col v-for="(item, index) in list" :key="index" :span="6" >
        <router-link :to="{name: 'leaderDetail'}">
        <el-card class="box-card" shadow="always">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
            <div class="bottom clearfix">
              <span class="time">{{ item.job }}</span>
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
      demo: {
        title: ''
      },
      list: [
        {name: 'aaa', img: '', job: 'dfjhdfuh', link: 'fdhdfhui'},
        {name: 'aaa', img: '', job: 'dfjhdfuh', link: 'fdhdfhui'},
        {name: 'aaa', img: '', job: 'dfjhdfuh', link: 'fdhdfhui'},
        {name: 'aaa', img: '', job: 'dfjhdfuh', link: 'fdhdfhui'},
        {name: 'aaa', img: '', job: 'dfjhdfuh', link: 'fdhdfhui'},
        {name: 'aaa', img: '', job: 'dfjhdfuh', link: 'fdhdfhui'},
        {name: 'aaa', img: '', job: 'dfjhdfuh', link: 'fdhdfhui'},
    
      ]
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
  min-height: calc(100vh - 84px);
}
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    font-size: 50px;
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
