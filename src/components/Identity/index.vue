<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-form ref="form" :model="form">
          <el-form-item label="患者病案号">
            <el-input @focus="show" v-model="form.patientID"></el-input>
          </el-form-item>

          <el-form-item label="患者身份证号末6位">
            <el-input @focus="show" v-model="form.IDcard"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
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
        patientID: '10000004',
        IDcard: '085521'
      }
    }
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
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 20px;
}
</style>