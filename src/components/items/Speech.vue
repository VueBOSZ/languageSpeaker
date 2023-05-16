<script setup>
import {
  useSpeechRecognition,
  onKeyStroke,
  useSpeechSynthesis,
} from "@vueuse/core";
import {ref, watch, computed, onMounted} from "vue";
import Modal from "../modal.vue";
import {languages_list} from "../../assets/languageList.js";



// const content = ref(
//   "pain condition that is characterized by progressively worsening spontaneous regional pain without dermatomal distribution. The pain experienced is out of proportion in time and"
// );

const props = defineProps({
  content:{
    type:String,
    default:"",
  },
  startLang:{
    type:String,
    default:"en",
  }
})
const lang = ref(props.startLang);
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



const { isListening, isSupported, stop, result } = speech


if (isSupported) {
  watch(result, (newResult, oldResult) => {
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


</script>

<template>
  <div>
    <div class="flex border-b-4 border-indigo-500">
      <svg v-if="isListening" class="dark:text-white-color" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m7 9c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07c-3.39-.49-6-3.4-6-6.93h2a5 5 0 0 0 5 5a5 5 0 0 0 5-5h2Z"/></svg>
      <select v-model="lang" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a country</option>
        <option v-for="l in languages_list" :key="l.code" :value="l.code">{{l.name}}</option>
      </select>
      <span class="dark:text-white-color">
      {{ speech.result }}
      </span>
    </div>


  <span class="pre dark:text-white-color">
    {{ prefix+" " }}
  </span>
  <span class="in dark:text-main-color2 text-[#EB3B98] shadow-lg dark:shadow-main-color2 shadow-[#EB3B98] text-2xl">
    {{ infix+" " }}
  </span>
  <span class="su dark:text-white-color">
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

a{
  color: #0366d6;
}

</style>
