<template>
  <div>
      <Carousel @click="dialogVisible = true" />
      <Item :menu="menu"></Item>

      <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="60%"
      >
      <Identity></Identity>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Item from '@/components/MenuItem'
import Carousel from '@/components/Carousel'
import Identity from '@/components/Identity'
export default {
  name: 'home',
   data () {
     return {
      menu: [],
      dialogVisible: true
    }
   },
  components: {
    Item,
    Carousel,
    Identity
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

