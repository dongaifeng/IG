<template>
  <div>
    <AIheader :h1="'医院介绍'" :home="$route.name != 'index'"></AIheader>

    <keep-alive>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import AIheader from '@/components/AIheader'

export default {
  components: { AIheader },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>