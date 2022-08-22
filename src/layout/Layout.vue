<template>
  <div class="w-screen h-screen overflow-hidden bg-zinc-200">
    <div
      class="w-full h-full flex flex-row justify-start items-center overflow-hidden"
    >
      <!-- Siderbar -->
      <div class="h-full">
        <layout-sidebar></layout-sidebar>
      </div>

      <!-- Main content -->
      <div class="flex-auto h-full flex flex-col gap-2">
        <!-- header -->
        <div class="w-full h-16">
          <layout-header></layout-header>
        </div>

        <!-- tabsView -->
        <div class="w-full h-12 bg-red-200"></div>

        <!-- content -->
        <div class="w-full flex-auto p-2 overflow-hidden">
          <layout-main> </layout-main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHeader from './components/layoutHeader/LayoutHeader.vue';
import LayoutSidebar from './components/layoutSidebar/LayoutSidebar.vue';
import LayoutMain from './components/layoutMain/LayoutMain.vue';
import LayoutTabView from './components/layoutTabview/LayoutTabView.vue';
</script>

<style scoped></style>
