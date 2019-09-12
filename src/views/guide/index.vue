<template>
  <div>
    <AIheader :h1="'就医指南'" :home="$route.name != 'guideIndex'"></AIheader>

    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import AIheader from '@/components/AIheader'
export default {
  components: { AIheader },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>