<script setup>
import {ref} from "vue";

const id = ref("0000000");

let myHeaders = new Headers();
myHeaders.append("Accept", "*/*");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

// fetch("/api/", requestOptions)
//     .then(response => response.text())
//     .then(result => id.value = result)
//     .catch(error => console.log('error', error));



</script>

<template>
  <div class="flex justify-center">
    {{id}}
  </div>
</template>

<style scoped>

</style>