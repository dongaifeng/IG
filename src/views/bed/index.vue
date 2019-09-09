<template>
  <div>
    <AIheader :h1="'病区浏览'"></AIheader>
    <el-row>
      <el-col :span="6" v-for="(item, ind) in list" :key="ind" align="center" class="colClass">
        <div class="wardBox" @click="toBadList(item.WARD_CODE)">
          <p class="ward">{{item.WARD_NAME}}</p>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-pagination
          background
          layout="->, total, prev, next"
          :total="total"
          :current-page="currentPage"
          @current-change="pageClick"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mixin, bad } from '@/mixin'
export default {
  mixins: [mixin, bad],
  data() {
    return {
      queryId: '1022'
    }
  },
  methods: {
    toBadList(id) {
      this.$router.push({ name: 'badList', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.colClass {
  margin-top: 25px;
  .wardBox {
    cursor: pointer;
    width: 45%;
    height: 60px;
    background: #4f8fe6;
    padding: 10px 10px;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    line-height: 60px;
    .ward {
      font-weight: 600;
      font-size: 20px;
    }
  }
}
</style>>
