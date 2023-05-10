<script setup>

const props = defineProps({
  id:{
    type:Number,
    default:false
  }
})

</script>

<template>
  <div>
    {{props.id}}
  </div>
</template>

<style scoped>

</style>