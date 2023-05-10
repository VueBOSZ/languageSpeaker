<script setup>

import {ref} from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["close-modal"])
defineProps({
  isModalOpen:{
    type:Boolean,
    default:false
  }
})

const modal = ref(null)

onClickOutside(modal,()=>emit("close-modal"))
</script>

<template>
  <Teleport to="#modal">
    <Transition name="modal">
    <div v-if="isModalOpen" class="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div ref="modal" class="relative bg-white px-[100px] py-[50px] rounded-lg border-lg shadow-lg">
        <button @click="$emit('close-modal')" class="absolute top-[5px] right-[10px] bg-none border-none cursor-pointer">x</button>
        tha
      </div>
    </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-from,
.modal-leave-to{
  opacity: 0;
  transform: scale(1.1);
}

.modal-enter-active,
.modal-leave-active{
  transition: all 0.25s ease;
}
</style>