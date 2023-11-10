<template>
  <div class="w-screen h-screen overflow-hidden bg-crust dark:bg-crust-dark">
    <div class="w-full h-full flex flex-row justify-start items-center overflow-hidden">
      <!-- Siderbar -->
      <div class="h-full">
        <layout-sidebar></layout-sidebar>
      </div>

      <!-- Main content -->
      <div class="flex-auto h-full flex flex-col gap-1">
        <!-- header -->
        <div class="w-full h-16">
          <layout-header></layout-header>
        </div>

        <!-- tabsView -->
        <div class="w-full h-12">
          <layout-tab-view></layout-tab-view>
        </div>

        <!-- content -->
        <div class="w-full flex-auto px-2 pb-2 overflow-hidden">
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
