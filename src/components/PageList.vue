<script setup>

import Modal from "./modal.vue";
import {ref,watch} from "vue";
import SearchItems from "./items/SearchItems.vue";
import PageListItems from "./items/PageListItems.vue";

const modal = ref(true);
// const search = ref("");
const pages = ref([]);
const path = ref("/api/page/all");

// watch(search,(newSearch)=>{
//   console.log(newSearch);
const sea = (s)=> {

  if (s === "") {
    path.value = "/api/page/all";
  } else {
    path.value = "/api/page/search/" + s;
  }
}


// })


</script>

<template>
  <div class="flex flex-col items-center">

    <SearchItems @search="sea"/>
    <PageListItems :path="path"/>

  </div>
</template>

<style scoped>

</style>