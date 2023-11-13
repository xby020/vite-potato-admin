<template>
  <div class="relative h-full flex justify-center items-end gap-4">
    <!-- menu select bg -->
    <div class="absolute bottom-0 shadow-in-big w-100px h-58px bg-blue rounded-t-2xl transition-all transform-gpu duration-200 ease-in-out" :style="currentMenuBgStyle" v-show="currentIndex !== -1">
      <div class="absolute bottom-0 left-0 h-4 aspect-square bg-blue dark:bg-[#1853C7] transform -translate-x-full">
        <div class="absolute top-0 left-0 w-full h-full rounded-br-full bg-base dark:bg-base-dark"></div>
      </div>
      <div class="absolute bottom-0 right-0 h-4 aspect-square bg-blue dark:bg-[#1853C7] transform translate-x-full">
        <div class="absolute top-0 left-0 w-full h-full rounded-bl-full bg-base dark:bg-base-dark"></div>
      </div>
    </div>

    <!-- menu list -->
    <div v-for="(route, routeIndex) in routeList" :key="routeIndex" class="h-full" ref="routeListRef">
      <div class="relative z-1 px-4 h-full flex justify-center items-center gap-1 text-lg cursor-pointer" :class="currentFirstRoute.name === route.name ? 'text-white' : 'text-blue dark:text-blue-dark'" v-if="route" @click="jumpTo(route.name)">
        <component :is="route.meta?.icon"></component>
        <h1 class="transition-all duration-200 ease-out">
          {{ route.meta?.title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncRoute } from '@/store/modules/asyncRoute';
import { RouteRecordName } from 'vue-router';

// Store
const asyncRouteStore = useAsyncRoute();

// route level 1
const { accessRoutes } = shallowReactive(storeToRefs(asyncRouteStore));

const routeList = computed(() => {
  return accessRoutes.value.filter((route) => !route.meta?.hide);
});

const routeListRef = ref();
const routeListWidthList = ref<number[]>([]);

onMounted(() => {
  routeListWidthList.value =
    routeListRef.value?.map((item: HTMLElement) => {
      const width = item.offsetWidth;
      return width;
    }) || 0;
});

const route = useRoute();
const currentFirstRoute = computed(() => {
  return route.matched[0];
});

const currentIndex = computed(() => {
  return routeList.value.findIndex((item) => item.name === currentFirstRoute.value.name);
});

// current menu bg style
const currentMenuBgStyle = computed(() => {
  const paddingLeftArray = routeListWidthList.value.slice(0, currentIndex.value);
  const paddingLeft = paddingLeftArray.reduce((prev, curr) => prev + curr, 0);
  return {
    width: `${routeListWidthList.value[currentIndex.value] || 0}px`,
    left: `${paddingLeft + 16 * currentIndex.value || 0}px`,
  };
});

// route jump
const router = useRouter();
function jumpTo(route?: RouteRecordName) {
  if (route) {
    router.push({ name: route });
  }
}
</script>

<style scoped></style>
