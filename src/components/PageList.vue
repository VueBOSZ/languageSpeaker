<script setup>

import Modal from "./modal.vue";
import {ref} from "vue";

const modal = ref(true);

</script>

<template>
  <modal :isModalOpen="modal" @closeModal="modal=!modal">
      nie wiem co tu dać
  </modal>
</template>

<style scoped>

</style>