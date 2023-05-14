<script setup>
import {
  useSpeechRecognition,
  onKeyStroke,
  useSpeechSynthesis,
} from "@vueuse/core";
import { ref, watch, computed } from "vue";
import Modal from "../modal.vue";

const lang = ref("en-US");

// const content = ref(
//   "pain condition that is characterized by progressively worsening spontaneous regional pain without dermatomal distribution. The pain experienced is out of proportion in time and"
// );

const props = defineProps({
  content:{
    type:String,
    default:false
  }
})
const sap = ref(true);
const solution = ref([]);
const prefix = computed(() => {
  return solution.value.join(" ");
});
const infix = computed(() => {
  return props.content.toLowerCase().split(" ")[solution.value.length];
});
const suffix = computed(() => {
  let tmp = props.content.toLowerCase().split(" ");
  tmp.splice(0, solution.value.length + 1);
  return tmp.join(" ");
});

const speech = useSpeechRecognition({
  lang,
  continuous: true,
});

const speak = useSpeechSynthesis(infix, {
  lang: lang,
  pitch: 1,
  rate: 1,
  volume: 1,
});

if (speech.isSupported.value) {
  watch(speech.result, (newResult, oldResult) => {
    for (const i of newResult.toLowerCase().split(" ")) {
      if (infix.value == i) {
        solution.value.push(infix.value);
      }
      console.log(prefix);
    }
  });
}

onKeyStroke("ArrowUp", (e) => {
  if (isSupported){
    speech.start();
  }else {
    sap.value = true;
  }

});
onKeyStroke("ArrowDown", (e) => {
  solution.value.push(infix.value);
});
onKeyStroke("ArrowRight", (e) => {
  speak.speak();
});
onKeyStroke("ArrowLeft", (e) => {
  speech.stop();
});

const { isListening, isSupported, stop, result } = speech
</script>

<template>
  <div>
    <div class="flex">
      <svg v-if="isListening" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5h2Z"/></svg>
      <span>
      {{ speech.result }}
      </span>
    </div>

  <hr />
  <span class="pre">
    {{ prefix+" " }}
  </span>
  <span class="in">
    {{ infix+" " }}
  </span>
  <span class="su">
    {{ suffix+" " }}
  </span>
    <modal :is-modal-open="sap" @closeModal="sap = !sap">
      <div class="flex flex-col items-center">

        <svg class="dark:text-white-color" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5h2Z"/></svg>

        <a href="https://caniuse.com/mdn-api_speechsynthesis"> Can I Use </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis"> developer.mozilla.org </a>

      </div>
    </modal>
  </div>
</template>

<style scoped>

.in{
  color: brown;
}
a{
  color: #0366d6;
}

</style>
