<template>
<div>
  <key :options="options" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input"></key>
</div>
</template>

<script>
import key from '@/components/key'
export default {
  components: { key },
   data () {
     return {
      visible: true,
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