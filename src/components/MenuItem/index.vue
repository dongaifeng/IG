<template>
  <div class="mixin-components-container">
    <el-row :gutter="40">
      <el-col v-for="(item, index) in menu" :key="index" :span="6" >
        <router-link :to="{name: item.JUMP_PATH}">
        <el-card class="box-card">
         <i :class="item.ICON" class="image"></i>
          <div style="padding: 10px;">
            <div class="bottom clearfix">
            {{item.FIRST_PAGE_MEMU_NAME}}
            </div>
          </div>
        </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'item',
  components: {
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      demo: {
        title: ''
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
      },
    }
  },
  props: {
    menu: {
      type: Array,
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
  min-height: calc(100vh - 400px);
}
.component-item{
  min-height: 100px;
}
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
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
