<script setup>

import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-main-color2 dark:bg-main-color">
    <site-navigation/>
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>

html.dark{
  color-scheme: dark;
}




.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.25s ease-out;
}

</style>
