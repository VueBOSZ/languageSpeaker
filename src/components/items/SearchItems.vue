<script setup>

import {ref,watch} from "vue";

const emit = defineEmits(["search"])
const search = ref("");
watch(search,(s)=>{

  emit("search",search.value)

})

</script>

<template>
  <div class="flex items-center w-5/6 mt-2">
    <div class="relative w-full">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="dark:text-white-color" width="24" height="24" viewBox="0 0 256 256"><g transform="translate(256 0) scale(-1 1)"><path fill="currentColor" d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm-32 96a8 8 0 0 1-8 8H99.31l10.35 10.34a8 8 0 0 1-11.32 11.32l-24-24a8 8 0 0 1 0-11.32l24-24a8 8 0 0 1 11.32 11.32L99.31 128H168v-24a8 8 0 0 1 16 0Z"/></g></svg>
      </div>
      <input type="search" v-model.lazy="search" class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
    </div>
  </div>
</template>

<style scoped>

</style>