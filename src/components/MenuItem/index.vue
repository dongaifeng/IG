<template>
  <div class="mixin-components-container">
    <el-row>
      <el-col v-for="(item, index) in menu" :key="index" :span="6">
        <el-card class="box-card" :style="imgSrc(item.ICON)">
          <router-link :to="{name: item.JUMP_PATH}">
            <div style="padding: 10px;">
              <div class="bottom clearfix">{{item.FIRST_PAGE_MEMU_NAME}}</div>
            </div>
          </router-link>
        </el-card>
      </el-col>

      <el-col :span="6" class="wx">
        <el-card class="box-card" @click="imgClick">
          <img width="70%" class="image" :src="img" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'item',
  components: {},
  data() {
    return {
      img: require('@/assets/1565939115.png')
    }
  },
  props: {
    menu: {
      type: Array
    }
  },
  methods: {
    imgSrc(icon) {
      // console.log(icon, '<=====icon')
      return {
        backgroundImage: 'url(' + require(`@/assets/icon/${icon}.png`) + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }
    },
    imgClick() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.mixin-components-container {
  padding: 10px;
  min-height: calc(100vh - 400px);
  height: 70vh;
  box-sizing: border-box;
}
.el-col {
  margin: 0px auto;
}

.el-card {
  border: 0px;
}
.box-card {
  //  height: calc(100vh - 715px);
  width: 65%;
  margin: 10px auto;
  box-shadow: 0 0px 0px 0;
}

.component-item {
  min-height: 100px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 60%;
  // line-height: 12px;
  text-align: center;
  font-size: 20px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  overflow: hidden;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
