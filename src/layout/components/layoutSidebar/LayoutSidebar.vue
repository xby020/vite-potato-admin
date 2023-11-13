<template>
  <div ref="sidebar" class="h-full dark:(bg-base-dark text-text-dark) bg-base text-text p-2 flex flex-col justify-start items-center transition-all duration-400 ease-in-out" :class="isExtend ? 'w-72' : 'w-18'">
    <!-- Logo -->
    <div class="flex gap-2 items-center rounded-lg p-2 cursor-pointer select-none transition-all duration-200 ease-in-out">
      <div class="w-10 h-10 flex justify-center items-center">
        <n-image class="w-full h-full" src="/icon/logo.svg" object-fit="contain" preview-disabled />
      </div>

      <h1 class="text-lg font-bold whitespace-nowrap" v-if="isExtend">
        {{ appTitle }}
      </h1>
    </div>

    <!-- Menu -->
    <div class="w-full flex-auto">
      <div class="w-full h-full pb-20">
        <LayoutSidebarMenu />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/modules/system';
import LayoutSidebarMenu from './components/LayoutSidebarMenu.vue';

// store
const systemStore = useSystemStore();

// sidebar
const siderbar = ref<HTMLElement>();
const { isExtend } = storeToRefs(systemStore);

// App name
const appTitle = ref(import.meta.env.VITE_APP_TITLE);
</script>

<style scoped></style>
