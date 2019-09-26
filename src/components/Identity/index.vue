<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="form" :model="form">
          <el-radio-group v-show="patientV" v-model="radio">
            <el-radio-button label="1">就诊卡号</el-radio-button>
            <el-radio-button label="2">身份证号</el-radio-button>
          </el-radio-group>

          <el-form-item v-show=" patientV && radio=='1'" label="就诊卡号">
            <el-input @focus="show" v-model="form.patientID"></el-input>
          </el-form-item>

          <el-form-item v-show="patientV&& radio=='2'" label="身份证号">
            <el-input @focus="show" v-model="form.IDcard"></el-input>
          </el-form-item>

          <el-form-item v-show="!patientV" label="病案号">
            <el-input @focus="show" v-model="form.patientID"></el-input>
          </el-form-item>

          <el-form-item v-show="!patientV" label="身份证号末6位">
            <el-input @focus="show" v-model="form.IDcard"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <key
          :options="options"
          v-if="visible"
          :layout="layout"
          :cancel="hide"
          :accept="accept"
          :input="input"
        ></key>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import key from '@/components/key'
export default {
  components: { key },
  data() {
    return {
      visible: true,
      layout: 'numeric',
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      },
      form: {
        patientID: '9876543210',
        IDcard: '1101211989121085521'
      },
      radio: '1'
    }
  },
  props: {
    patientV: {
      type: Boolean
    }
    // obj: {
    //   type: Object,
    //   default: () => ({ la: '就诊卡号', lb: '身份证号' })
    // }
  },

  methods: {
    accept(text) {
      // console.log('Input text: ' + text)
      this.hide()
    },

    show(e) {
      this.input = e.target
      if (!this.visible) this.visible = true
    },

    hide() {
      this.visible = false
    }
    // redioV(id) {
    //   if (!this.patientV) {
    //     return true
    //   } else {
    //     return id === this.radio
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 20px;
  .el-form {
    /deep/ .el-form-item__label {
      font-size: 25px;
      margin: 7px 0;
    }
    /deep/ .el-input {
      font-size: 25px;
      height: 50px !important;
      .el-input__inner {
        height: 50px !important;
      }
    }
  }
}
.el-radio-button /deep/ .el-radio-button__inner {
  font-size: 25px;
}
</style>