<template>
  <div>
    <AIheader class="header-box" :h1="title" home></AIheader>
    <div ref="scrollBox" class="contant-box">
      <p v-if="type==='HTML'" class="text" v-html="text"></p>

      <iframe
        v-if="type==='LINK'"
        name="child"
        id="child"
        :src="text"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
        style="position:absolute;top:80px;left: 0px;"
      ></iframe>
    </div>
    <ScrollBtn></ScrollBtn>
  </div>
</template>
<script>
import AIheader from '@/components/AIheader'
import ScrollBtn from '@/components/ScrollBtn'

export default {
  name: 'guaidDetial',
  components: { AIheader, ScrollBtn },
  data() {
    return {}
  },
  props: {
    title: {
      default: ''
    },
    text: {
      default: ''
    },
    type: {
      default: ''
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.text {
  margin: 20px;
  font-size: 20px;
}
</style>