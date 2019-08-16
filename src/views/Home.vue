<template>
  <div>
    <Carousel/>
    <Item :menu="menu"></Item>
  </div>
</template>

<script>
import Item from '@/components/MenuItem'
import Carousel from '@/components/Carousel'
import { getmenu } from '@/api/index'
export default {
  name: 'home',
   data () {
     return {
      menu: [],
    }
   },
  components: {
    Item,
    Carousel
  },
  mounted () {
   getmenu().then(res => {
      this.menu = res.data
   })
  },
   methods: {
    }
}
</script>

<style lang="scss" scoped>
  .home {
    .box{
      width: 100%;
      height: 300px;
      background: yellow;
    }
  }
</style>

