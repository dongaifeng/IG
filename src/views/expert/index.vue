<template>
  <div>
    <el-row>
      <el-col>
        <AIheader @query="query" :h1="'专家浏览'" :lab="'查医生'" search></AIheader>
      </el-col>
    </el-row>

    <el-row class="tabBox" :gutter="50">
      <el-col :span="3" v-for="item in tabList" :key="item.ID">
        <el-button @click="tabClick(item.CLASS_CODE)" class="tab" plain>{{item.CLASS_NAME}}</el-button>
      </el-col>
    </el-row>

    <el-row class="depBox" :gutter="50">
      <el-col :span="24" v-for="item in expertList" :key="item.DEPT_CODE">
        <!-- <el-button @click="depClick(item)" class="dep" type="primary">{{item.SHOW_NAME}}</el-button> -->
        <div class="expertBox">
          <div class="title">腹部肿瘤内科</div>
          <ul class="nameBox clearfix">
            <li class="nameLi clearfix">
              <p class="type">主任医师</p>
              <div class="name">
                <span class="nameItem" v-for="iten in 40" :key="iten">张平</span>
              </div>
            </li>

            <li class="nameLi clearfix">
              <p class="type">主任医师</p>
              <div class="name">
                <span class="nameItem" v-for="iten in 10" :key="iten">张平</span>
              </div>
            </li>
          </ul>
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
      tabList: [],
      expertList: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    query(id) {
      console.log(id, '<-------------')
      debugger
      this.$router.push({ name: 'expertList' })
    },
    tabClick(id) {
      this.$post('1009', [
        {
          LogicalOperatorsCode: '10',
          key: 'DEPT_TYPE_CODE',
          OperationalCharacterCode: '50',
          value: id
        },
        {
          LogicalOperatorsCode: '10',
          key: 'DELETE_FLAG',
          OperationalCharacterCode: '50',
          value: '0'
        }
      ]).then(res => {
        this.expertList = res.data
      })
    },
    depClick(obj) {
      this.$router.push({ name: 'departmentDetail', params: obj })
    },
    initData() {
      this.$post('1008', [
        {
          LogicalOperatorsCode: '10',
          key: 'DICT_CODE',
          OperationalCharacterCode: '50',
          value: 'DeptType'
        }
      ]).then(res => {
        this.tabList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.expertBox {
  // border: 1px solid red;
  .title {
    background-color: #ccc;

    color: rgb(92, 56, 56);
    padding: 5px 10px;
  }
  .nameBox {
    line-height: 100%;
    height: 100%;
    .nameLi {
      border-bottom: 1px solid #ccc;
      .type {
        font-size: 18px;
        // border-right: 1px solid red;
        float: left;
        width: 7%;
        margin: 10px 10px;
        padding-right: 0px;
        box-sizing: border-box;
        line-height: 100%;
        height: 100%;
      }
      .name {
        float: left;
        width: 85%;
        // border: 1px solid #000;
        .nameItem {
          float: left;
          padding: 10px;
        }
      }
    }
  }
}

.tabBox {
  padding: 30px;
  .tab {
    font-size: 22px;
    padding: 20px 40px;
    border: 2px solid blue;
  }
}

.depBox {
  padding: 0px 30px;
  .dep {
    font-size: 22px;
    padding: 20px 40px;
    margin-bottom: 30px;
  }
}
</style>