<template>
  <div class="w-screen h-screen text-text dark:text-text-dark">
    <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="systemTheme" :theme-overrides="isDark ? darkThemeOverrides : lightThemeOverrides">
      <app-provider>
        <router-view></router-view>
      </app-provider>
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { zhCN, dateZhCN, GlobalThemeOverrides, darkTheme, useOsTheme } from 'naive-ui';
import { useSystemStore } from '@/store/modules/system';
import config from '../package.json';
import { colorPanel } from '@root/config/color';

// logout app version
console.log(`%c🥔app version: ${config.version}`, 'color: #35f0ec; font-size: 18px;background:#3f3f3f;border-radius:3px;text-align:center;padding:5px;');

// set Icon
const iconPath = ref('/icon/logo.svg');
useFavicon(iconPath);

// set title
const route = useRoute();
const title = import.meta.env.VITE_APP_TITLE;
useHead({
  title: computed(() => {
    return `${route.meta.title || ''} - ${title}`;
  }),
});

// Naive ui config
const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: colorPanel.teal,
    primaryColorHover: colorPanel.sky,
    primaryColorPressed: colorPanel.sapphire,
    primaryColorSuppl: colorPanel.lavender,
  },
};

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: colorPanel['teal-dark'],
    primaryColorHover: colorPanel['sky-dark'],
    primaryColorPressed: colorPanel['sapphire-dark'],
    primaryColorSuppl: colorPanel['lavender-dark'],
  },
};

// System Settings
const systemTheme = ref();
const systemStore = useSystemStore();
const { theme, isDark } = storeToRefs(systemStore);
const setDarkTheme = (dark: boolean) => {
  if (dark) {
    isDark.value = true;
    document.body.classList.add('dark');
  } else {
    isDark.value = false;
    document.body.classList.remove('dark');
  }
};
watch(
  theme,
  () => {
    switch (theme.value) {
      case 'auto':
        const osTheme = useOsTheme();
        if (osTheme.value === 'dark') {
          systemTheme.value = darkTheme;
          setDarkTheme(true);
        } else {
          systemTheme.value = null;
          setDarkTheme(false);
        }
        break;
      case 'dark':
        systemTheme.value = darkTheme;
        setDarkTheme(true);
        break;
      case 'light':
        systemTheme.value = null;
        setDarkTheme(false);
        break;
      default:
        systemTheme.value = null;
        setDarkTheme(false);
        break;
    }
  },
  {
    immediate: true,
  },
);
</script>

<style lang="pcss">
@font-face {
  font-family: Emoji;
  src: local('Apple Color Emojiji'), local('Segoe UI Emoji'), local('Segoe UI Symbol'), local('Noto Color Emoji');
  unicode-range: U+1F000-1F644, U+203C-3299;
}

body {
  font-family: system-ui, —apple-system, Segoe UI, Rototo, Emoji, Helvetica, Arial, sans-serif;
}

::-webkit-scrollbar {
  @apply rounded-full w-2 flex justify-center items-center
}

::-webkit-scrollbar-track {
  @apply rounded-full bg-surface0/30 dark:bg-surface0-dark/30
}


::-webkit-scrollbar-thumb {
  @apply  rounded-full bg-lavender dark:bg-lavender-dark
}
</style>
