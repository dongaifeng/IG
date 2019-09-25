<template>
  <div>
    <el-row class="menu-box">
      <el-col :span="6" align="center" v-for="item in subMenu" :key="item.SUB_MEMU_CODE">
        <router-link
          :to="{name: 'guaidList', params: {title: item.SUB_MEMU_NAME, id: item.SUB_MEMU_CODE}}"
        >
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
          value: 'PFM_02'
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
      width: 210px;
      height: 215px;
    }
    .bottom {
      padding-top: 55%;
      font-size: 28px;
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