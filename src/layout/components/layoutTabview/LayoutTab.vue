<template>
  <div class="relative h-full flex justify-center items-center" @mouseenter="isHover = true" @mouseleave="isHover = false" @click.middle="handleTabClose">
    <!-- Close zone -->
    <div class="absolute z-1 right-0 h-34px w-4 overflow-hidden cursor-pointer">
      <div
        v-if="!static"
        class="w-full h-full flex justify-center items-center text-text-dark bg-dark-900/60 transition-all transform duration-200 ease-in-out hover:(bg-dark-900/40) active:( bg-dark-900/10)"
        :class="isHover ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
        @click="handleTabClose"
      >
        <n-icon size="12" class="transition-all transform duration-200 ease-in-out">
          <i-mdi-close></i-mdi-close>
        </n-icon>
      </div>
    </div>

    <!-- Main Tab -->
    <n-button :color="btnColor" :class="textColor" size="medium" strong @click="handleTabClick" :focusable="false">
      <template #icon>
        <n-icon size="18">
          <component :is="icon"></component>
        </n-icon>
      </template>

      <span class="pr-2">{{ title }}</span>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { PageEnum } from '@/enums/pageEnum';
import { useSystemStore } from '@/store/modules/system';
import { RouteRecord, useTabsStore } from '@/store/modules/tabs';
import { FunctionalComponent, SVGAttributes } from 'vue';
import { colorPanel } from '@root/config/color';

interface Props {
  icon: FunctionalComponent<SVGAttributes, {}>;
  title: string;
  name: RouteRecord['name'];
  current?: boolean;
  static?: boolean;
}

const props = defineProps<Props>();

// tab hover
const isHover = ref(false);

// system theme
const systemStore = useSystemStore();
const { isDark } = storeToRefs(systemStore);

// tab apperance
const btnColor = computed(() => {
  if (props.current) {
    return colorPanel.blue;
  } else {
    return isDark.value ? '#4A4A4C' : '#F9FAFB';
  }
});
const textColor = computed(() => {
  if (props.current) {
    return '!text-white';
  } else {
    return isDark.value ? '!text-text-dark' : '!text-text';
  }
});

// handle tab click
const router = useRouter();
const tabsStore = useTabsStore();
const { tabs } = storeToRefs(tabsStore);

function handleTabClick() {
  router.push({ name: props.name });
}
function handleTabClose() {
  // 获取上个tab
  const currentTabIndex = tabs.value.findIndex((tab) => tab.name === props.name);
  const prevTabIndex = currentTabIndex - 1;
  const prevTab = tabs.value[prevTabIndex];

  // 删掉当前tab
  tabsStore.removeTab(props.name);

  // 跳转到tab
  if (prevTab) {
    router.push({ name: prevTab.name });
  } else {
    if (tabs.value.length > 0) {
      router.push({ name: tabs.value[0].name });
    } else {
      router.push({ path: PageEnum.BASE_HOME });
    }
  }
}
</script>

<style scoped></style>
