<template>
  <div class="w-full h-full flex justify-center items-center">
    <n-dropdown trigger="click" :options="options" @select="handleSelect">
      <n-button type="default" circle size="medium" class="text-xl">
        <component :is="currentOptions?.icon"></component>
      </n-button>
    </n-dropdown>
  </div>
</template>

<script setup lang="ts">
import { SystemSettings, useSystemStore } from '@/store/modules/system';
import { NIcon } from 'naive-ui';

const systemStore = useSystemStore();

const { theme } = storeToRefs(systemStore);

const renderIcon = (icon: any) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

// test
const options = [
  {
    label: '浅色主题',
    key: 'light',
    icon: renderIcon(IconBxSun)
  },
  {
    label: '深色主题',
    key: 'dark',
    icon: renderIcon(IconBxMoon)
  },
  {
    label: '跟随系统',
    key: 'auto',
    icon: renderIcon(IconAkarIconsDesktopDevice)
  }
];

const currentOptions = computed(() => {
  return options.find((item) => item.key === theme.value);
});

function handleSelect(key: SystemSettings['theme']) {
  systemStore.setTheme(key);
}
</script>

<style scoped></style>
