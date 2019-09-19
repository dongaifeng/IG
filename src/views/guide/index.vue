<template>
  <div>
    <AIheader :h1="'就医指南'" :home="$route.name != 'guideIndex'"></AIheader>

    <router-view></router-view>
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