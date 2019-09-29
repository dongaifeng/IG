<template>
  <div>
    <AIheader :h1="'床位浏览'" home></AIheader>
    <el-row>
      <el-col :span="4" v-for="(item, ind) in list" :key="ind" align="center" class="colClass">
        <div class="bedBox" @click="toBadList(item, item.ENCOUNTER_ID)">
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
          :size="18"
        ></page>
      </el-col>
    </el-row>

    <el-dialog v-if="IDVisiable" title="提示" :visible.sync="IDVisiable" width="60%">
      <Identity :bed="false" ref="IDForm"></Identity>
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
      man: '/images/man.png',
      woman: '/images/woman.png',
      queryId: '1023',
      size: 18,
      recordId: '',
      IDVisiable: false,
      encounterID: null,
      row: {}
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
          size: 18,
          current: page
        }
      ).then(res => {
        // console.log(res)
        this.list = res.data || []
        this.total = res.Total
      })
    },
    toBadList(row, encounterID) {
      this.row = row
      this.recordId = row.ID_NO_END_X_BIT
      this.encounterID = encounterID
      this.IDVisiable = true
    },
    submitID() {
      if (this.recordId !== this.$refs.IDForm.form.IDcard) {
        this.$alert('输入有误', '提示')
      } else {
        this.$router.push({
          name: 'cost',
          params: { encounterID: this.encounterID, row: this.row }
        })
        this.IDVisiable = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.colClass {
  margin-top: 18px;
  .bedBox {
    cursor: pointer;
    width: 80%;
    height: 210px;

    background: -webkit-linear-gradient(#4f90e6, #2b69bc);
    background: -o-linear-gradient(#4f90e6, #2b69bc);
    background: -moz-linear-gradient(#4f90e6, #2b69bc);
    background: linear-gradient(#4f90e6, #2b69bc);

    padding: 20px 10px;
    color: #fff;
    border-radius: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .bedTop {
      .num {
        font-size: 25px;
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
        font-size: 25px;
        margin-bottom: 15px;
      }
      .type {
        font-size: 20px;
      }
    }
  }
}
</style>
