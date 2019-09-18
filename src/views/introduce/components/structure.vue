<template>
  <div>
    <img width="100%" :src="src" class="image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: require('@/assets/structure.png'),
      list: [],
      txt: null
    }
  }
}
</script>