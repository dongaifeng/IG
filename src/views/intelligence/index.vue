<template>
  <div>
    <AIheader :h1="'智能导诊'"></AIheader>

    <el-row>
      <el-col :span="12">
        <div class="body-img" :style="$imgSrc(src)" @click="getPosition($event)">

          <div 
           v-for="item in arr"
           :key="item.name" 
           :style="item" 
           class="body-part" 
           @click="bodyClick(item.name)">
            <img v-show="item.name === showPart" :src="item.src" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mixin } from '@/mixin'
export default {
  name: 'nokeepAlive',
  mixins: [mixin],
  data() {
    return {
      src: '/images/body/body.png',
      showPart: '',
      arr:[
        {
          top: '0px',
          left: '125PX',
          width: '90PX',
          height: '122PX',
          name:'head',
          src: '/images/body/head.png'
        },
        {
          top: '145px',
          left: '26PX',
          width: '284PX',
          height: '241PX',
          name:'arm',
          src: '/images/body/arm.png'
        },
         {
          top: '380px',
          left: '-5PX',
          width: '344PX',
          height: '90PX',
          name:'hand',
          src: '/images/body/hand.png'
        },
        {
          top: '230px',
          left: '97PX',
          width: '144PX',
          height: '122PX',
          name:'belly',
          src: '/images/body/belly.png'
        },
         {
          top: '391px',
          left: '86PX',
          width: '161PX',
          height: '336PX',
          name:'leg',
          src: '/images/body/leg.png'
        },
        {
          top: '354px',
          left: '92PX',
          width: '153PX',
          height: '70PX',
          name:'crotch',
          src: '/images/body/crotch.png'
        },
        
         {
          top: '724px',
          left: '93PX',
          width: '148PX',
          height: '71PX',
          name:'foot',
          src: '/images/body/foot.png'
        },
         {
          top: '103px',
          left: '120PX',
          width: '100PX',
          height: '52PX',
          name:'neck',
          src: '/images/body/neck.png'
        },
        {
          top: '158px',
          left: '93PX',
          width: '152PX',
          height: '84PX',
          name:'chest',
          src: '/images/body/chest.png'
        },
       
      ]
    }
  },
  mounted() {},
  methods: {
    getPosition(event) {
      let { offsetX, offsetY } = event

      let obj = {
        header_start_x: 20,
        header_start_y: 20,
        header_end_x: 200,
        header_end_y: 200
      }
      if (
        offsetX > obj.header_start_x &&
        offsetX < obj.header_end_x &&
        offsetY > obj.header_start_y &&
        offsetY < obj.header_end_y
      ) {
        // console.log('你点击了头部')
      }
      // console.log(offsetX, offsetY)
    },
    bodyClick (id){
      console.log(id)
      this.showPart = id
      
    }
  }
}
</script>

<style lang="scss" scoped>
.body-img {
  width: 342PX;
  height: 800PX;
  border: 1px solid red;
  margin: 0px auto;
  position: relative;
  .body-part {
    border: 1px solid red;
    position: absolute;
  }
}
</style>