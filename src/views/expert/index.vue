<template>
  <div>
    <el-row>
      <el-col>
        <AIheader @query="query" :h1="'专家浏览'" :lab="'查找医生'" search></AIheader>
      </el-col>
    </el-row>

    <el-row class="tabBox">
      <el-col :span="3" v-for="item in tabList" :key="item.ID">
        <el-button
          :class="{ myactive: item.CLASS_CODE == setbtnID}"
          @click="tabClick(item.CLASS_CODE)"
          class="tab"
          plain
        >{{item.CLASS_NAME}}</el-button>
      </el-col>
    </el-row>

    <el-row class="depBox">
      <el-col :span="24" v-for="(item, ind) in expertList" :key="ind">
        <!-- <el-button @click="depClick(item)" class="dep" type="primary">{{item.SHOW_NAME}}</el-button> -->
        <div class="expertBox">
          <div class="title">{{item.name}}</div>
          <ul class="nameBox clearfix">
            <li class="nameLi clearfix">
              <p class="type">主任医师</p>
              <div class="name">
                <span
                  @click="detail(ele.SPECIALIST_DOCTOR_CODE)"
                  class="nameItem"
                  v-for="(ele, ind) in item.ZC01"
                  :key="ind"
                >{{ele.SPECIALIST_DOCTOR_NAME}}</span>
              </div>
            </li>

            <li class="nameLi clearfix">
              <p class="type">副主任医师</p>
              <div class="name">
                <span
                  @click="detail(ele.SPECIALIST_DOCTOR_CODE)"
                  class="nameItem"
                  v-for="(ele, ind) in item.ZC02"
                  :key="ind"
                >{{ele.SPECIALIST_DOCTOR_NAME}}</span>
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
      expertList: [],
      btnID: 'LX01'
    }
  },
  computed: {
    setbtnID() {
      return this.btnID
    }
  },
  mounted() {
    this.initData()
    this.tabClick(this.btnID)
  },
  methods: {
    query(id) {
      this.$router.push({ name: 'expertList' })
    },
    detail(id) {
      this.$router.push({ name: 'doctorDetail', params: { id } })
    },
    tabClick(id) {
      this.btnID = id
      this.$post('1013', [
        {
          LogicalOperatorsCode: '10',
          key: 'DEPT_TYPE_CODE',
          OperationalCharacterCode: '50',
          value: id
        }
      ]).then(res => {
        this.expertList = !Array.isArray(res.data) ? [] : this.toData(res.data)
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
    },
    toData(data = []) {
      let arr = this.unique(data)

      data.forEach(ele => {
        arr.forEach(b => {
          if (ele.DEPT_CODE === b.code) {
            b[ele.TITLE_CODE].push(ele)
          }
        })
      })
      return arr
    },
    unique(arr) {
      if (!Array.isArray(arr)) {
        // console.log('type error!')
        return
      }
      var hash = []
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].DEPT_CODE === arr[j].DEPT_CODE) {
            ++i
          }
        }
        hash.push({
          code: arr[i].DEPT_CODE,
          name: arr[i].DEPT_NAME,
          ZC01: [],
          ZC02: []
        })
      }
      return hash
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
      &:last-child {
        border-bottom: 0px;
      }
      .type {
        font-size: 20px;
        // border-right: 1px solid red;
        float: left;
        width: 10%;
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
          padding: 16px;
          font-size: 23px;
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
    border: 2px solid #184b8f;
    color: #184b8f;
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