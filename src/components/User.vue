<script setup>
import {ref} from "vue";
import PageListItems from "./items/PageListItems.vue";

const id = ref("0000000");

const my = () => {
let myHeaders = new Headers();
myHeaders.append("Accept", "*/*");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("/api/user/me", requestOptions)
    .then(response => response.json())
    .then(result => id.value = result)
    .catch(error => console.log('error', error));
}
my();

</script>

<template>
  <div>
    <div class="flex flex-col justify-center items-center">
      <div>sub : {{id.sub}}</div>
    </div>
    <PageListItems path="/api/page/me" owner="true"/>
  </div>
</template>

<style scoped>

</style>