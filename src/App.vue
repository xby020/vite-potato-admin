<template>
  <div class="w-screen h-screen">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
      <app-provider>
        <router-view></router-view>
      </app-provider>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { zhCN, dateZhCN } from 'naive-ui';

// set Icon
const iconPath = ref('/icon/logo.svg');
useFavicon(iconPath);

const route = useRoute();
const title = import.meta.env.VITE_APP_TITLE;
useHead({
  title: computed(() => {
    return `${route.meta.title || ''} - ${title}`;
  })
});
</script>

<style scoped>
@font-face {
  font-family: Emoji;
  src: local('Apple Color Emojiji'), local('Segoe UI Emoji'),
    local('Segoe UI Symbol'), local('Noto Color Emoji');
  unicode-range: U+1F000-1F644, U+203C-3299;
}

body {
  font-family: system-ui, —apple-system, Segoe UI, Rototo, Emoji, Helvetica,
    Arial, sans-serif;
}
</style>
