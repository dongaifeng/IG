<template>
  <div style="margin:20px; ">
    <div class="img">
      <img width="70%" :src="src" class="image" />
    </div>
    <p class="txt">到达浙江省肿瘤医院的公共交通路线方式有：</p>
    <p class="txt">
      一、市内可乘坐公交（75、129、196、217、304、528、831）至半山路公交站下，步行500米即达；汽车北站可乘坐公交131路至省肿瘤医院公交站，步行200米即达。
      到达浙江省肿瘤医院的公共交通路线方式有：
    </p>
    <p class="txt">二、私家车</p>
    <p class="txt">车辆需从秋石高架（南向北）半山路匝道出口下来，经过红绿灯直行进入石桥路到达浙江省肿瘤医院</p>
    <div class="img">
      <img width="50%" :src="src2" class="image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: '/images/traffic/1.jpg',
      src2: '/images/traffic/2.jpg'
    }
  }
}
</script>
<style lang="scss" scoped>
.img {
  margin: 20px auto;
  text-align: center;
}
.txt {
  font-size: 18px;
}
</style>