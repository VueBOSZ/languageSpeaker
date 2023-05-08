<script setup>
var myHeaders = new Headers();
myHeaders.append("Accept", "*/*");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("/dapi/v1/demo", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  
</script>

<template>
 tak
</template>

<style scoped>

</style>
