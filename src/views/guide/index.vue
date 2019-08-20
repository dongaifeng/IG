<template>
<div>
  <span>就医指南</span>
  <ai-input :styleObj="style"></ai-input>
</div>
</template>

<script>
import aiInput from '@/components/formItem/AIinput'
export default {
  data () {
    return {
      style: {
        width: '200px',
        paddingLeft: '100px'
      }
    }
  },
  components: {
    aiInput,
  }
}
</script>