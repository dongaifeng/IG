<template>
  <div>
    <Carousel @click="dialogVisible = true" />
    <Item :menu="menu"></Item>

    <el-dialog title="提示" :visible.sync="IDVisiable" width="60%">
      <Identity ref="IDForm"></Identity>
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
      toPage: 'home'
    }
  },
  components: {
    Item,
    Carousel,
    Identity
  },
  mounted() {
    this.getData()
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
      this.$post('1003').then(res => {
        this.menu = res.data
      })
    },
    submitID() {
      this.$post(
        '1015',
        [
          {
            LogicalOperatorsCode: '10',
            key: 'MED_RECORD_NO',
            OperationalCharacterCode: '50',
            value: this.$refs.IDForm.form.patientID
          },
          {
            LogicalOperatorsCode: '10',
            key: 'ID_NO_END_X_BIT',
            OperationalCharacterCode: '50',
            value: this.$refs.IDForm.form.IDcard
          }
        ],
        { size: 1, current: 1 }
      ).then(res => {
        if (res.data) {
          this.$store.dispatch('app/setUserInfo', res.data[0])
          this.IDVisiable = false
          this.$router.push({ name: this.toPage })
        } else {
          alert('没有用户信息')
        }
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'inHospital' || to.name === 'outpatientCost') {
      if (this.userInfo === null || this.userInfo === '') {
        this.toPage = to.name
        this.IDVisiable = true
        next(false)
      } else {
        next()
      }
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

