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

fetch("/api/user/me", requestOptions)
    .then(response => response.json())
    .then(result => id.value = result)
    .catch(error => console.log('error', error));

id.value = { "id": 1, "sub": "67581329", "pages": [ { "id": 1, "title": "tolga", "content": "jhdgjkashkjkasjddkjjkds" }, { "id": 2, "title": "tolga", "content": "jhdgjkashkjkasjddkjjkds.cjxhckkj" } ] }

</script>

<template>

  <div class="flex justify-center">
    <div>sub : {{id.sub}}</div>
  </div>
  <div v-for="page in id.pages" class="flex flex-col justify-center items-center">
    <router-link :to="'/page/'+page.id" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-2">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{page.title}}</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">{{page.content}}</p>
    </router-link>

  </div>

</template>

<style scoped>

</style>