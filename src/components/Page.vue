<script setup>

import {ref, watch} from "vue";
import Speech from "./items/Speech.vue";

const props = defineProps({
  id:{
    type:Number,
    default:false
  }
})

const page = ref(null);

const get = (i) => {
  let myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("/api/page/id/"+i, requestOptions)
      .then(response => response.json())
      .then(result => page.value = result)
      .catch(error => console.log('error', error));
  console.log(page)
}
get(props.id);

watch(props, (p)=>{
 get(p.id);


})

</script>

<template>
  <div>
    <Speech />
<!--    :content="page.content"-->
  </div>
</template>

<style scoped>

</style>