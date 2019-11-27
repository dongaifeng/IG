<template>
  <div>
    <div>
      <h1 class="part-title">症状列表</h1>
      <div class="part" v-for="item in symptomList " :key="item.ID" @click="getQuestion(item.DIRECT_RECOMMEND_FLAG, item.KNOWLEDGE_BASE_ID)">{{item.DESC}}</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>