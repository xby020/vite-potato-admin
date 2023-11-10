<template>
  <div class="w-full h-full flex justify-between items-center bg-base dark:bg-base-dark px-4 shadow-sm shadow-zinc-500/20">
    <!-- left -->
    <div class="h-full flex items-center">
      <!-- siderbar control -->
      <n-button text size="medium" @click="toggleExtend">
        <n-icon size="24">
          <i-mdi-menu-close v-if="isExtend"></i-mdi-menu-close>
          <i-mdi-menu v-else></i-mdi-menu>
        </n-icon>
      </n-button>

      <!-- breadcrumb -->
      <n-breadcrumb class="mx-4">
        <n-breadcrumb-item v-for="(routeRaw, index) in breadcrumb" :key="index" :clickable="routeRaw.components ? true : false" @click="routeRaw.components ? breadcrumbJump(routeRaw.name) : null">
          <n-icon :component="(routeRaw.meta.icon as Component)" />
          <span class="ml-1">{{ routeRaw.meta.title }}</span>
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>

    <!-- right -->
    <div class="h-full flex items-center">
      <!-- Tab -->
      <div class="h-full mx-12">
        <LayoutHeaderTabs v-if="topRouteMenu" />
      </div>

      <!-- Control -->
      <div class="h-full mx-2">
        <LayoutHeaderControl />
      </div>

      <!-- header -->
      <div class="h-full ml-8">
        <LayoutHeaderUser />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHeaderTabs from './components/LayoutHeaderTabs.vue';
import LayoutHeaderUser from './components/LayoutHeaderUser.vue';
import LayoutHeaderControl from './components/LayoutHeaderControl.vue';
import { useSystemStore } from '@/store/modules/system';
import type { Component } from 'vue';
import { RouteRecordName } from 'vue-router';
import { useConfigStore } from '@/store/modules/config';

// Store
const systemStore = useSystemStore();
const configStore = useConfigStore();

// top menu
const { topRouteMenu } = storeToRefs(configStore);

// sidebar control
const { isExtend } = storeToRefs(systemStore);
const { toggleExtend } = systemStore;

// breadcrumb
const route = useRoute();
const breadcrumb = computed(() => {
  return route.matched;
});

const router = useRouter();
function breadcrumbJump(route?: RouteRecordName) {
  route && route && router.push({ name: route });
}
</script>

<style scoped></style>
