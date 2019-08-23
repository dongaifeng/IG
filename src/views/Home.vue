<template>
  <div>
      <Carousel/>
      <Item :menu="menu"></Item>
  </div>
</template>

<script>
import Item from '@/components/MenuItem'
import Carousel from '@/components/Carousel'
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
    this.getData()
  },
   methods: {
     getData () {
       this.$post('1003').then(res => {
            this.menu = res.data
        })
     }
    }
}
</script>

<style lang="scss" scoped>
</style>

