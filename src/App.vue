<script setup>
var myHeaders = new Headers();
myHeaders.append("Accept", "*/*");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:8080/api/v1/demo", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  
</script>

<template>
 <a href="http://localhost:8080/oauth2/authorization/github">tu</a>
</template>

<style scoped>

</style>
