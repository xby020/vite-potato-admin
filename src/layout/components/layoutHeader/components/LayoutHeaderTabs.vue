<template>
  <div class="relative h-full flex justify-center items-end gap-4">
    <!-- menu select bg -->
    <div
      class="absolute bottom-0 w-100px h-58px bg-blue-600 rounded-t-2xl transition-all transform-gpu duration-200 ease-in-out"
      :style="{ left: `${108 * currentIndex}px` }">
      <div class="absolute bottom-0 left-0 h-4 aspect-square bg-blue-600 transform -translate-x-full">
        <div class="absolute top-0 left-0 w-full h-full rounded-br-full bg-light-50"></div>
      </div>
      <div class="absolute bottom-0 right-0 h-4 aspect-square bg-blue-600 transform translate-x-full">
        <div class="absolute top-0 left-0 w-full h-full rounded-bl-full bg-light-50"></div>
      </div>
    </div>

    <!-- menu list -->
    <div v-for="(route, routeIndex) in accessRoutes" :key="routeIndex" class="h-full">
      <div class="relative z-1 px-4 h-full flex justify-center items-center gap-1 text-lg cursor-pointer"
        :class="currentFirstRoute.name === route.name ? 'text-white' : 'text-blue-600'" v-if="route"
        @click="jumpTo(route.name)">
        <component :is="route.meta?.icon"></component>
        <h1 class="transition-all duration-200 ease-out">{{ route.meta?.title }}</h1>
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

const route = useRoute();
const currentFirstRoute = computed(() => {
  return route.matched[0];
});

const currentIndex = computed(() => {
  return accessRoutes.value.findIndex(item => item.name === currentFirstRoute.value.name);
});

// route jump
const router = useRouter()
function jumpTo(route?: RouteRecordName) {
  if (route) {
    router.push({ name: route });
  }
}

</script>

<style scoped>
</style>