<script setup>
import Modal from "./modal.vue";
import {ref} from "vue";

const modal = ref(false);
const title = ref("");
const context = ref("");
const add = () =>{
  let myHeaders = new Headers();
  myHeaders.append("Accept", "*/*");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("/api/page/"+ title.value +"/"+context.value, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

</script>

<template>
  <header class="sticky top-0 bg-main-color shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <router-link to="/" class="group"  key="link_user">
        <div class="flex items-center gap-3 rounded-lg hover:shadow-lg hover:shadow-analogous5-color group-[.router-link-active]:border-b-4 border-analogous5-color">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3h-3v3h-4V3H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5 5a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m4 8H8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1M13 5h-2V1h2v4m3 14H8v-1h8v1m-4 2H8v-1h4v1Z"/></svg>
          <p class="text-2xl">User</p>
        </div>
      </router-link>
      <router-link to="/page/list" class="group" key="link_page_list">
        <div class="flex items-center gap-3 rounded-lg hover:shadow-lg hover:shadow-analogous5-color group-[.router-link-active]:border-b-4 border-analogous5-color">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g transform="translate(24 0) scale(-1 1)"><path fill="currentColor" d="M16 21q-.825 0-1.413-.588T14 19v-4q0-.825.588-1.413T16 13h4q.825 0 1.413.588T22 15v4q0 .825-.588 1.413T20 21h-4ZM3 18q-.425 0-.713-.288T2 17q0-.425.288-.713T3 16h7q.425 0 .713.288T11 17q0 .425-.288.713T10 18H3Zm13-7q-.825 0-1.413-.588T14 9V5q0-.825.588-1.413T16 3h4q.825 0 1.413.588T22 5v4q0 .825-.588 1.413T20 11h-4ZM3 8q-.425 0-.713-.288T2 7q0-.425.288-.713T3 6h7q.425 0 .713.288T11 7q0 .425-.288.713T10 8H3Z"/></g></svg>
          <p class="text-2xl">Page List</p>
        </div>
      </router-link>
      <div @click="modal = true" class="flex items-center gap-3 flex-1 justify-end">
        <svg class="rounded-lg hover:shadow-lg hover:shadow-analogous5-color hover:bg-analogous5-color hover:text-black transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13v3q0 .425.288.713T12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.713T16 11h-3V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v3H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13h3Zm-6 8q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"/></svg>
      </div>
    </nav>
    <modal :isModalOpen="modal" @closeModal="modal=!modal">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Title
          </label>
          <input  type="text" placeholder="Title" v-model="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-6 w-[65vw]">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Context
          </label>
          <textarea v-model="context" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
      <div class="inline-flex">
        <button @click="modal=!modal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          cancel
        </button>
        <button @click="add" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          add
        </button>
      </div>
    </modal>
  </header>
</template>

<style scoped>

</style>
