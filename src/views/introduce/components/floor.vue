<template>
  <div style="margin:30px;">
    <el-row style="margin-bottom:20px;">
      <el-button class="mybtn" @click="detail('0')">平面图</el-button>
      <el-button
        class="mybtn"
        @click="detail(item.CLASS_CODE)"
        v-for="item in list"
        :key="item.CLASS_CODE"
      >{{item.CLASS_NAME}}</el-button>
    </el-row>
    <el-row>
      <div class="box" :style="$imgSrc(src)">
        <div v-show="showLocation == '0'" class="location" :style="mystyle">
          <i class="el-icon-location"></i>
        </div>
        <!-- <img width="100%" :src="src" class="image" /> -->
      </div>
      <!-- <el-col :span="6">{{txt}}</el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'floor',
  components: {},
  data() {
    return {
      src: '/images/floor/0.jpg',
      list: [],
      txt: null,
      info: {},
      showLocation: '0'
    }
  },
  computed: {
    mystyle() {
      return {
        top: this.info.X + 'px',
        left: this.info.Y + 'px'
      }
    }
  },
  mounted() {
    this.initData()
    this.getPosition()
  },
  methods: {
    initData(page) {
      this.$post('1008', [
        {
          LogicalOperatorsCode: '10',
          key: 'DICT_CODE',
          OperationalCharacterCode: '50',
          value: 'BuildingNo'
        }
      ]).then(res => {
        this.list = res.data || []
      })
      // this.$post('1025').then(res => {
      //   this.list = res.data || []
      // })
    },
    getPosition() {
      this.$post('1028', [
        {
          LogicalOperatorsCode: '10',
          key: 'NO',
          OperationalCharacterCode: '50',
          value: localStorage.getItem('hash')
        }
      ]).then(res => {
        this.info = res.data[0] || {}
      })
    },
    detail(id) {
      this.showLocation = id
      this.src = '/images/floor/' + id + '.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.location {
  position: relative;
  width: 60px;
  font-size: 60px;
  color: #337ab7;
}
.box {
  position: relative;
  width: 800px;
  height: 800px;
}
.mybtn {
  padding: 20px;
  margin: 10px;
}
</style>