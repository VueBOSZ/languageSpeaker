<script setup>

import {ref, watch} from "vue";
import Modal from "../modal.vue";
import {languages_list} from "../../assets/languageList.js";

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

const de = async (id) => {
  let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  await fetch("/api/page/id/"+id, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  re(props.path);

}

watch(props,(p)=>{

    re(p.path)

})
re(props.path);

const modal = ref(false);
const modalId = ref(null);
const title = ref("");
const content = ref("");
const lang = ref("")

const ed = (index) => {
  modalId.value = pages.value[index].id;
  title.value = pages.value[index].title;
  content.value = pages.value[index].content;
  lang.value = pages.value[index].lang;

  modal.value = true;
}

const update = async ()=>{

  let myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");

  let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow',
    body: content.value
  };

  await fetch("/api/page/"+ modalId.value +"/"+ title.value +"/"+lang.value, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  re(props.path);
  modal.value = false;
}

</script>

<template>
<div class="flex flex-col justify-center items-center">

    <svg @click="re(props.path)" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M11 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7"/><path stroke-linejoin="round" d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011m10.656 11.668C21.049 15.097 19.636 14 17.99 14c-1.758 0-3.252 1.255-3.793 3"/><path stroke-linejoin="round" d="M19.995 16.772H21.4a.6.6 0 0 0 .6-.6V14.55m-7.666 4.783C14.953 20.903 16.366 22 18.01 22c1.758 0 3.252-1.255 3.793-3"/><path stroke-linejoin="round" d="M16.005 19.228H14.6a.6.6 0 0 0-.6.6v1.622"/></g></svg>

    <div v-for="(page,i) in pages" class="flex flex-col justify-center items-center">
      <router-link :to="'/page/'+page.id" class="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-2">
        <p class="absolute top-0 right-1 font-normal text-gray-700 dark:text-gray-400">{{page.lang}}</p>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{page.title}}</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{{page.content}}</p>
      </router-link>
      <span class="mb-2">
        <div v-if="props.owner" @click="de(page.id)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mr-2">
          Delete
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z"/></svg>
        </div>
        <div v-if="props.owner" @click="ed(i)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Edit
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V11.1l-8 7.975V22H6Zm8.5 0q-.2 0-.35-.15T14 21.5v-1.2q0-.2.088-.4t.212-.325l4.85-4.875l2.15 2.1l-4.875 4.9q-.125.15-.325.225t-.4.075h-1.2Zm7.525-5.9L19.9 13.975l.7-.7q.3-.3.725-.3t.7.3l.7.725q.275.3.275.713t-.275.687l-.7.7ZM14 9h4l-5-5v4q0 .425.288.713T14 9Z"/></svg>
        </div>
      </span>
    </div>
    <modal :isModalOpen="modal" @closeModal="modal=!modal">
      <div class="mb-4">
        <label class="block text-main-color dark:text-main-color2 text-sm font-bold mb-2" for="username">
          Title
        </label>
        <input  type="text" placeholder="Title" v-model="title" class="shadow appearance-none border rounded w-full py-2 px-3 dark:text-white-color leading-tight dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6 w-[65vw]">
        <label class="block text-main-color dark:text-main-color2 text-sm font-bold mb-2" for="password">
          Content
        </label>
        <textarea v-model="content" id="message" rows="4" class="block shadow p-2.5 w-full text-sm rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white-color focus:outline-none focus:shadow-outline" placeholder="Write your thoughts here..."></textarea>
      </div>
      <div class="mb-6 w-[65vw]">
        <label class="block text-main-color dark:text-main-color2 text-sm font-bold mb-2" for="password">
          Language
        </label>
        <select v-model="lang" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose a country</option>
          <option v-for="l in languages_list" :key="l.code" :value="l.code">{{l.name}}</option>
        </select>
      </div>

      <div class="inline-flex">
        <button @click="modal=!modal" class="bg-shades4-color hover:bg-shades5-color text-main-color2 dark:bg-shades4-color2 dark:hover:bg-shades5-color2 dark:text-main-color font-bold py-2 px-4 rounded-l">
          cancel
        </button>
        <button @click="update" class="bg-shades4-color hover:bg-shades5-color text-main-color2 dark:bg-shades4-color2 dark:hover:bg-shades5-color2 dark:text-main-color font-bold py-2 px-4 rounded-r">
          update
        </button>
      </div>

    </modal>
  </div>
</template>

<style scoped>

</style>