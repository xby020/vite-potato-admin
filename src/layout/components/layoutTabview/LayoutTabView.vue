<template>
  <div class="w-full h-full mx-2 flex justify-start items-center gap-2">
    <!-- Deafult Index Tab -->
    <layout-tab
      :title="indexTab?.meta.title || '未知组件'"
      :icon="indexTab?.meta.icon"
      :name="indexTab?.name"
      :current="currentTab?.name === indexTab?.name"
      static
    ></layout-tab>

    <!-- Tabs -->
    <transition-group
      class="flex-auto h-full flex justify-start items-center gap-2"
      tag="div"
    >
      <layout-tab
        v-for="tab in tabs"
        :key="tab.name"
        :title="tab.meta.title"
        :icon="tab.meta.icon"
        :name="tab.name"
        :current="currentTab?.name === tab.name"
      ></layout-tab>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { PageEnum } from '@/enums/pageEnum';
import { useTabsStore } from '@/store/modules/tabs';
import LayoutTab from './LayoutTab.vue';

const router = useRouter();
const tabsStore = useTabsStore();

// tabs
const { tabs, currentTab } = storeToRefs(tabsStore);

// plain route record
const routeList = computed(() => {
  return router.getRoutes();
});

// system route default index
const indexTab = computed(() => {
  return routeList.value.find((item) => item.path === PageEnum.BASE_HOME);
});
</script>

<style scoped></style>
