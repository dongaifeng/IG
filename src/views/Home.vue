<template>
  <div>
    <Carousel/>
    <Item :menu="menu"></Item>
  </div>
</template>

<script>
import Item from '@/components/MenuItem'
import Carousel from '@/components/Carousel'
import { GetData } from '@/api/index'
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
   GetData({
    IsPaging: false,
    // CurrentPage: 1,
    // PageSize: 10,
    DataSourceCode: 'getList',
    // QueryInfoArray: [
    //   {
    //     "LogicalOperatorsCode": "10",
    //     "OperationalCharacterCode": "10",
    //     "key": "[DEPT_NAME]",
    //     "value": "部"
    //   }
    // ]
   }).then(res => {
     console.log( eval(JSON.parse(JSON.stringify(res.data))))
      this.menu = eval(JSON.parse(JSON.stringify(res.data)))
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

