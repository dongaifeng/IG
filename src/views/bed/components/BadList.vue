<template>
  <div>
    <AIheader :h1="'床位浏览'" home></AIheader>
    <el-row>
      <el-col :span="4" v-for="(item, ind) in list" :key="ind" align="center" class="colClass">
        <div class="bedBox" @click="toBadList(item.MED_RECORD_NO)">
          <div class="bedTop">
            <p class="num">{{item.BED_NO}}</p>
            <div class="img">
              <img :src="item.GENDER_CODE==2 ? woman : man" alt />
            </div>
          </div>

          <div class="bedBody">
            <p class="name">{{item.PATIENT_NAME}}</p>
            <p class="type">{{item.PATIENT_TYPE_NAME}}</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <page
          style="float: right"
          @current-change="pageClick"
          :total="total"
          :currentPage="currentPage"
        ></page>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="IDVisiable" width="60%">
      <Identity ref="IDForm"></Identity>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitID">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mixin, bad } from '@/mixin'
import { mapGetters } from 'vuex'
import Identity from '@/components/Identity'
export default {
  mixins: [mixin, bad],
  name: 'keepAlive',
  components: {
    Identity
  },
  data() {
    return {
      man: require('@/assets/man.png'),
      woman: require('@/assets/woman.png'),
      queryId: '1023',
      size: 18,
      recordId: '',
      IDVisiable: false
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  watch: {
    id(newVal, oldval) {
      // console.log(newVal, oldval)
      if (newVal && newVal != oldval) {
        this.init(this.currentPage)
      }
    }
  },
  activated() {
    this.$store.dispatch('app/setUserInfo', null)
  },
  computed: {
    ...mapGetters(['userInfo'])
    // IDVisiable: {
    //   get() {
    //     return this.$store.getters.IDVisiable
    //   },
    //   set(value) {
    //     this.$store.dispatch('app/changeIDVisiable', !this.IDVisiable)
    //   }
    // }
  },
  methods: {
    init(page) {
      this.$post(
        this.queryId,
        [
          {
            LogicalOperatorsCode: '10',
            key: 'WARD_ID',
            OperationalCharacterCode: '50',
            value: this.id
          }
        ],
        {
          size: 30,
          current: page
        }
      ).then(res => {
        // console.log(res)
        this.list = res.data || []
        this.total = res.Total
      })
    },
    toBadList(id) {
      // console.log(id)
      this.recordId = id
      if (this.userInfo === null || this.userInfo === '') {
        // this.$store.dispatch('app/changeIDVisiable', true)
        this.IDVisiable = true
      }
    },
    submitID() {
      this.$post(
        '1015',
        [
          {
            LogicalOperatorsCode: '10',
            key: 'MED_RECORD_NO',
            OperationalCharacterCode: '50',
            value: this.recordId
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
          this.$router.push({ name: 'inHospital' })
        } else {
          this.$alert('找不到用户信息', '提示')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.colClass {
  margin-top: 20px;
  .bedBox {
    cursor: pointer;
    width: 60%;
    height: 160px;
    background: blueviolet;
    padding: 15px 10px;
    color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .bedTop {
      .num {
        font-size: 22px;
        float: left;
      }
      .img {
        float: right;
      }
    }

    .bedBody {
      margin-top: 70%;
      .name {
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 8px;
      }
    }
  }
}
</style>>
