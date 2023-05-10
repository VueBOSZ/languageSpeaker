<script setup>

import Modal from "./modal.vue";
import {ref} from "vue";

const modal = ref(true);

</script>

<template>
  <modal :isModalOpen="modal" @closeModal="modal=!modal">

  </modal>
</template>

<style scoped>

</style>