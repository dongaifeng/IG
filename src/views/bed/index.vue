<template>
  <div>
    <AIheader :h1="'床位浏览'" :lab="'查询科室信息'" search home></AIheader>
    <el-row>
      <el-col :span="4" v-for="item in 18" :key="item" align="center" class="colClass">
        <div class="bedBox">
          <div class="bedTop">
            <p class="num">1</p>
            <div class="img">
              <img :src="man" alt />
            </div>
          </div>

          <div class="bedBody">
            <p class="name">王嘉诚</p>
            <p class="type">北京医保</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mixin } from '@/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      man: require('@/assets/man.png'),
      woman: require('@/assets/woman.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.colClass {
  margin-top: 20px;
  .bedBox {
    width: 45%;
    height: 160px;
    background: blueviolet;
    padding: 15px 10px;
    color: #fff;
    border-radius: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .bedTop {
      .num {
        font-size: 22px;
        float: left;
      }
      .img {
        float: right;
      }
    }

    .bedBody {
      margin-top: 80%;
      .name {
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 8px;
      }
      .type {
      }
    }
  }
}
</style>>
