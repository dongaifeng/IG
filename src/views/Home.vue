<template>
  <div class="bgColor">
    <Carousel @click="dialogVisible = true" />
    <Item :menu="menu"></Item>

    <el-dialog title="请输入验证信息" :visible.sync="IDVisiable" width="60%">
      <Identity ref="IDForm" :patientV="patientV"></Identity>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitID">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Item from '@/components/MenuItem'
import Carousel from '@/components/Carousel'
import Identity from '@/components/Identity'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  data() {
    return {
      menu: [],
      dialogVisible: false,
      info: null,
      toPage: 'home',
      patientV: true,
      timer: null,
      timeArr: []
    }
  },
  components: {
    Item,
    Carousel,
    Identity
  },
  mounted() {
    this.getData()

    this.timeArr.forEach(ele => {
      window.clearInterval(ele)
    })
    this.timeArr = []
    // this.get_bodyHeight()
  },
  activated() {
    if (this.userInfo != null) this.$store.dispatch('app/setUserInfo', null)
    this.timeArr.forEach(ele => {
      window.clearInterval(ele)
    })
    this.timeArr = []
  },
  computed: {
    ...mapGetters(['userInfo']),
    IDVisiable: {
      get() {
        return this.$store.getters.IDVisiable
      },
      set(value) {
        this.$store.dispatch('app/changeIDVisiable', !this.IDVisiable)
      }
    }
  },
  methods: {
    getData() {
      this.$post('1003', this.$where('ab')).then(res => {
        this.menu = res.data
      })
    },
    // 查询前 参数判断
    submitID() {
      if (this.patientV) {
        this.queryID('CARD_NO', 'ID_NO', '20') // 使用 就诊卡号 或者 身份证号
      } else {
        this.queryID('MED_RECORD_NO', 'ID_NO_END_X_BIT', '10') // 使用 病案号 并且 身份证号6位
      }
    },
    // 查询用户信息请求
    queryID(key1, key2, dict) {
      this.$post(
        '1015',
        [
          {
            LogicalOperatorsCode: '10',
            key: key1,
            OperationalCharacterCode: '50',
            value: this.$refs.IDForm.form.patientID || '0'
          },
          {
            LogicalOperatorsCode: dict,
            key: key2,
            OperationalCharacterCode: '50',
            value: this.$refs.IDForm.form.IDcard || '0'
          }
        ],
        { size: 1, current: 1 }
      ).then(res => {
        if (res.data) {
          this.$refs.IDForm.form.patientID = ''
          this.$refs.IDForm.form.IDcard = ''
          this.$store.dispatch('app/setUserInfo', res.data[0])
          this.IDVisiable = false
          this.$router.push({ name: this.toPage })
        } else {
          this.$alert('找不到患者信息', '提示')
        }
      })
    },

    get_bodyHeight() {
      //动态获取浏览器高度
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
          let docEl = document.documentElement
          let clientWidth = docEl.clientWidth
          if (!clientWidth) return
          docEl.style.fontSize = clientWidth / 119 + 'px'
        })()
      }
    },
    sub() {
      let vue = this
      return function() {
        let timer = setInterval(function() {
          vue.$store.dispatch('app/timeHandle')
          if (vue.$store.getters.time <= 1) {
            window.clearInterval(vue.timer)
            window.location.href = ''
          }
        }, 1000)
        vue.timer = timer
        vue.timeArr.push(timer)
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'inHospital' || to.name === 'outpatientCost') {
      if (this.userInfo === null || this.userInfo === '') {
        this.patientV = to.name === 'outpatientCost'
        this.toPage = to.name
        this.IDVisiable = true
        next(false)
      } else {
        this.sub()()
        next()
      }
    } else {
      this.sub()()
      next()
    }
  },
  beforeRouteEnter(to, from, next) {
    next()
  }
}
</script>

<style lang="scss" scoped>
.bgColor {
  // overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>

