<template>
   <div class="keyboardBox">
      <vue-touch-keyboard :options="options" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input" />
    </div>
</template>

<script>
export default {
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
          alert("Input text: " + text);
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
    width: 100%;
    padding: 10px;
  }
</style>