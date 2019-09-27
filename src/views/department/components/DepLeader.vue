
<template>
  <keep-alive>
    <div class="mixin-components-container">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in list" :key="index" :span="4">
          <router-link :to="{name: 'doctorDetail', params: {id: item.DOCTOR_CODE}}">
            <el-card class="box-card" shadow="always">
              <img :src="item.PICTURE" class="image" />
              <div>
                <span class="name">{{item.DOCTOR_NAME}}</span>
                <div class="bottom clearfix">
                  <span class="job">{{ item.LEADER_DUTY }}</span>
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
  data() {
    return {}
  },
  props: {
    list: {
      default: () => []
    }
  },
  methods: {}
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
  text-align: center;
  .box-card {
    box-shadow: 0 0px 0px 0;
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
