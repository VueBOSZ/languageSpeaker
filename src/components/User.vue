<script setup>
import {ref} from "vue";

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
      <svg @click="my" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M11 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7"/><path stroke-linejoin="round" d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011m10.656 11.668C21.049 15.097 19.636 14 17.99 14c-1.758 0-3.252 1.255-3.793 3"/><path stroke-linejoin="round" d="M19.995 16.772H21.4a.6.6 0 0 0 .6-.6V14.55m-7.666 4.783C14.953 20.903 16.366 22 18.01 22c1.758 0 3.252-1.255 3.793-3"/><path stroke-linejoin="round" d="M16.005 19.228H14.6a.6.6 0 0 0-.6.6v1.622"/></g></svg>
    </div>
    <div v-for="page in id.pages" class="flex flex-col justify-center items-center">
      <router-link :to="'/page/'+page.id" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-2">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{page.title}}</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{{page.content}}</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>

</style>