<script setup>

import {ref, watch} from "vue";

const props = defineProps({
  path:{
    type:String,
    default:""
  },
  owner:{
    type:Boolean,
    default:false
  }
})

const pages = ref([]);

let myHeaders = new Headers();
myHeaders.append("Accept", "*/*");



const re = (pathre) => {
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(pathre, requestOptions)
      .then(response => response.json())
      .then(result => pages.value = result)
      .catch(error => console.log('error', error));
}

const de = (id) => {
  let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("/api/page/id/"+id, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

watch(props,(p)=>{

    re(p.path)

})
re(props.path);


</script>

<template>
<div class="flex flex-col justify-center items-center">

    <svg @click="re(props.path)" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M11 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7"/><path stroke-linejoin="round" d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011m10.656 11.668C21.049 15.097 19.636 14 17.99 14c-1.758 0-3.252 1.255-3.793 3"/><path stroke-linejoin="round" d="M19.995 16.772H21.4a.6.6 0 0 0 .6-.6V14.55m-7.666 4.783C14.953 20.903 16.366 22 18.01 22c1.758 0 3.252-1.255 3.793-3"/><path stroke-linejoin="round" d="M16.005 19.228H14.6a.6.6 0 0 0-.6.6v1.622"/></g></svg>

    <div v-for="page in pages" class="flex flex-col justify-center items-center">
      <router-link :to="'/page/'+page.id" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-2">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{page.title}}</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{{page.content}}</p>

      </router-link>
      <div v-if="props.owner" @click="de(page.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        delete
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z"/></svg>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>