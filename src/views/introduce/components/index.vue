<template>
  <div>
    <el-row class="menu-box">
      <el-col :span="8" align="center" v-for="item in subMenu" :key="item.SUB_MEMU_CODE">
        <!-- <router-link to="/hospitalIntroduction/detail"> -->
        <router-link :to="{name: item.JUMP_PATH}">
          <div class="menu-item" :style="$imgSrc(item.ICON)">
            <div class="bottom clearfix">{{item.SUB_MEMU_NAME}}</div>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subMenu: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // imgSrc(icon) {
    //   return {
    //     backgroundImage: 'url(' + require(`../../../../public/images/subIcon/${icon}.png`) + ')',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'contain'
    //   }
    // },
    initData() {
      this.$post('1001', [
        {
          LogicalOperatorsCode: '10',
          key: 'FIRST_PAGE_MEMU_CODE',
          OperationalCharacterCode: '50',
          value: 'PFM_01'
        },
        {
          LogicalOperatorsCode: '10',
          key: 'DELETE_FLAG',
          OperationalCharacterCode: '50',
          value: '0'
        },
        {
          LogicalOperatorsCode: '10',
          key: 'IS_ENABLED',
          OperationalCharacterCode: '50',
          value: '1'
        }
      ]).then(res => {
        this.subMenu = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-box {
  padding-top: 30px;
  .el-col {
    margin-bottom: 30px;

    .menu-item {
      width: 300px;
      height: 300px;
    }
    .bottom {
      padding-top: 70%;
      font-size: 34px;
      color: #fff;
    }
  }
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