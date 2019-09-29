<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="form" :model="form">
          <el-radio-group v-show="patientV" v-model="radio" @change="radioChange">
            <el-radio-button label="1">就诊卡号</el-radio-button>
            <el-radio-button label="2">身份证号</el-radio-button>
          </el-radio-group>

          <el-form-item v-show=" patientV && radio=='1'" label="就诊卡号">
            <el-input ref="a" @focus="show" v-model="form.patientID"></el-input>
          </el-form-item>

          <el-form-item v-show="patientV&& radio=='2'" label="身份证号">
            <el-input ref="b" @focus="show" v-model="form.IDcard"></el-input>
          </el-form-item>

          <el-form-item v-show="!patientV && bed" label="病案号">
            <el-input ref="c" @focus="show" v-model="form.patientID"></el-input>
          </el-form-item>

          <el-form-item v-show="!patientV" label="身份证号末6位">
            <el-input ref="d" @focus="show" v-model="form.IDcard"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-show="keyVisiable" :span="12">
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
    <el-row style="margin-top: 10px;" v-show="!keyVisiable">
      <key
        :options="options"
        v-if="visible"
        :layout="layout2"
        :cancel="hide"
        :accept="accept"
        :input="input"
      ></key>
    </el-row>
  </div>
</template>

<script>
import key from '@/components/key'
export default {
  name: 'noKeepAlive',
  components: { key },
  data() {
    return {
      keyVisiable: true,
      visible: true,
      layout: 'numeric',
      layout2: 'compact',
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      },
      form: {
        patientID: '',
        IDcard: ''
      },
      radio: '1'
    }
  },
  props: {
    patientV: {
      type: Boolean
    },
    bed: {
      default: true
    },
    focus: {
      default: 'a'
    }
    // obj: {
    //   type: Object,
    //   default: () => ({ la: '就诊卡号', lb: '身份证号' })
    // }
  },
  mounted() {
    this.form.patientID = ''
    this.form.IDcard = ''

    switch (this.focus) {
      case 'a':
        this.$refs.a.focus()
        break
      case 'c':
        this.$refs.c.focus()
        break
      case 'b':
        this.$refs.b.focus()
        break
      case 'd':
        this.$refs.d.focus()
        break
      default:
        this.$refs.a.focus()
    }
  },
  // watch: {
  //   focus: function(val, oldVal) {
  //     switch (val) {
  //       case 'a':
  //         this.$refs.a.focus()
  //         break
  //       case 'c':
  //         alert()
  //         this.$refs.c.focus()
  //         break
  //       default:
  //         this.$refs.a.focus()
  //     }
  //   }
  // },
  methods: {
    accept(text) {
      // console.log('Input text: ' + text)
      this.hide()
    },
    radioChange(id) {
      if (id === '2') {
        this.$refs.b.focus()
      } else {
        this.$refs.a.focus()
      }
      this.form.patientID = ''
      this.form.IDcard = ''
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