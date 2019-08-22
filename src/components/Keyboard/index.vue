<template>
   <div class="keyboardBox">
      <key :options="options" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input" />
    </div>
</template>

<script>
import key from '@/components/key'
export default {
  components: { key },
   data () {
     return {
      visible: false,
      layout: "normal",
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      }
    }
   },

    methods: {
        accept(text) {
          console.log("Input text: " + text);
          this.hide();
        },

        show(e) {
          this.input = e.target;
          if (!this.visible)
            this.visible = true
        },

        hide() {
          this.visible = false;
        }
    }
}
</script>

<style lang="scss" scoped>
  .keyboardBox{
    position: fixed;
    bottom: 0px;
    width: calc(100% - 16px);
    margin: 8px;
    z-index: 9999999;
    background: #fff;
  }
</style>