<script setup>
import {
  useSpeechRecognition,
  onKeyStroke,
  useSpeechSynthesis,
} from "@vueuse/core";
import { ref, watch, computed } from "vue";

const lang = ref("en-US");

const content = ref(
  "pain condition that is characterized by progressively worsening spontaneous regional pain without dermatomal distribution. The pain experienced is out of proportion in time and"
);
const solution = ref([]);
const prefix = computed(() => {
  return solution.value.join(" ");
});
const infix = computed(() => {
  return content.value.toLowerCase().split(" ")[solution.value.length];
});
const suffix = computed(() => {
  let tmp = content.value.toLowerCase().split(" ");
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
    }
  });
}

onKeyStroke("ArrowUp", (e) => {
  speech.start();
});
onKeyStroke("ArrowDown", (e) => {
  solution.value.push(infix.value);
});
onKeyStroke("ArrowRight", (e) => {
  speak.speak();
});
</script>

<template>
  {{ speech.result }}
  <hr />
  <span class="pre">
    {{ prefix=" " }}
  </span>
  <span class="in">
    {{ infix+" " }}
  </span>
  <span class="su">
    {{ suffix+" " }}
  </span>
</template>

<style scoped>

.in{
  color: brown;
}




</style>
