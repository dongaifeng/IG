<template>
  <div>
    <AIheader class="header-box" :h1="'医院介绍'" :home="$route.name != 'index'"></AIheader>
    <div class="contant-box">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import AIheader from '@/components/AIheader'
export default {
  name: 'nokeepAlive',
  components: { AIheader },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>