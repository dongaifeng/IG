<template>
  <keep-alive>
    <div class="mixin-components-container">
      <el-row :gutter="50">
        <el-col v-for="(item, index) in list" :key="index" :span="6">
          <router-link :to="{name: 'leaderDetail', params: {info: item}}">
            <el-card class="box-card" shadow="always">
              <img :src="toSrc(item.LEADER_PICTURE)" class="image" />
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

      <div class="page-box">
        <el-pagination
          background
          layout="->,slot, prev, next"
          :total="total"
          prev-text="上一页"
          next-text="下一页"
          :current-page="currentPage"
          @current-change="pageClick"
        >
          <span class="my-total">{{currentPage}} / {{Math.ceil(total / 8)}} 页</span>
        </el-pagination>
      </div>
    </div>
  </keep-alive>
</template>

<script>
export default {
  name: 'leader',
  components: {},
  data() {
    return {
      src: require('@/assets/leaderImage/1.png'),
      list: [],
      total: 0,
      currentPage: 1
    }
  },
  mounted() {
    this.list.length === 0 && this.initData()
  },
  methods: {
    initData(page) {
      this.$post(
        '1005',
        [
          {
            LogicalOperatorsCode: '10',
            key: 'DELETE_FLAG',
            OperationalCharacterCode: '50',
            value: '0'
          }
        ],
        { size: 8, current: page }
      ).then(res => {
        this.list = res.data || []
        this.total = res.Total
      })
    },
    toSrc(id) {
      return require('@/assets/leaderImage/' + id + '.png')
    },
    pageClick(page) {
      console.log(page)
      this.currentPage = page
      this.initData(page)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box {
  position: fixed;
  bottom: 10px;
  right: 10px;
  .el-pagination {
    /deep/ .btn-prev,
    /deep/ .btn-next {
      background: #4f90e6;
      color: #fff;
      padding: 10px 30px;
      height: auto;
    }
    /deep/ .my-total {
      vertical-align: bottom !important;
    }
  }
}

.el-col {
  margin-bottom: 20px;
  border-radius: 4px;
  &:last-child {
    margin-bottom: 0;
  }
}

.mixin-components-container {
  padding: 30px;
  text-align: center;
  min-height: calc(100vh - 84px);
  .box-card {
    // box-shadow: 0 0px 0px 0;
  }
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
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
