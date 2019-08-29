<template>
  <div>
    <AIheader :h1="'医院领导'" home></AIheader>
   <div class="box">
     <div class="img">
        <img :src="toSrc(info.ID)" class="image">
        <p class="name">{{info.LEADER_NAME}}</p>
        <p class="job">{{ info.LEADER_DUTY }}</p>
     </div>
      
     <p class="text">{{info.LEADER_INTRODUCTION}}</p>
    </div>


  </div>
</template>

<script>
 import AIheader from '@/components/AIheader'
export default {
  components: { AIheader },
  data () {
    return {
    }
  },
  props: {
    info: {
      type: Object
    }
  },
  methods: {
    toSrc (id) {
       return require('@/assets/leaderImage/'+ id +'.png')
     }
  }
}
</script>

<style lang="scss" scoped>
.box{
  margin: 30px;
  .img{
    width: 15%;
    float: left;
    text-align: center;
    padding-right: 20px;
    .image{
      width: 100%;
    }
    .job {
    font-size: 13px;
  }
  .name {
    font-size: 18px;
  }
  }
  .text{
    font-size: 18px;
    text-indent: 2em;
  }
}



 

</style>