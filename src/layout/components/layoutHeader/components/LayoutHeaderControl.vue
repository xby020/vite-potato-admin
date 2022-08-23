<template>
  <div class="w-full h-full flex justify-center items-center">
    <n-dropdown trigger="click" :options="options" @select="handleSelect">
      <n-button type="default" circle size="medium">
        <n-icon size="18">
          <i-mdi-view-dashboard></i-mdi-view-dashboard>
        </n-icon>
      </n-button>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { SystemSettings, useSystemStore } from '@/store/modules/system';

const systemStore = useSystemStore();

const options = [
  {
    label: '浅色主题',
    key: 'light'
  },
  {
    label: '深色主题',
    key: 'dark'
  },
  {
    label: '跟随系统',
    key: 'auto'
  }
];

function handleSelect(key: SystemSettings['theme']) {
  systemStore.setTheme(key);
}
</script>

<style scoped></style>
