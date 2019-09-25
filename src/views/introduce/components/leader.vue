<template>
  <keep-alive>
    <div class="mixin-components-container">
      <el-row :gutter="50">
        <el-col v-for="(item, index) in list" :key="index" :span="6">
          <router-link :to="{name: 'leaderDetail', params: {info: item}}">
            <el-card class="box-card" shadow="always">
              <img :src="item.LEADER_PICTURE" class="image" />
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

      <page @current-change="pageClick" :total="total" :currentPage="currentPage"></page>
    </div>
  </keep-alive>
</template>

<script>
import Page from '@/components/Page'
export default {
  name: 'leader',
  components: { Page },
  data() {
    return {
      // src: require('../../../../public/images/leaderImage/1.png'),
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
    // toSrc(id) {
    //   return'../../../../public/images/leaderImage/' + id + '.png')
    // },
    pageClick(page) {
      this.currentPage = page
      this.initData(page)
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
  height: 310px;
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
