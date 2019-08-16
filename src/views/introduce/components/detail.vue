<template>
  <div style="border:1px solid red;">
    <el-image
      style="width:100%; max-height:400px;"
      :src="url"
      :fit="fit">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
      </el-image>
      <span v-for="index in 25" :key="index">{{index}}少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉<br/></span>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      fit: 'fill'
    }
  }
}
</script>