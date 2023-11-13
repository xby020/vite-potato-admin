<template>
  <div class="w-full h-full">
    <!-- Current first route -->
    <div class="w-full h-12 mb-2 bg-blue dark:bg-sky rounded-md flex justify-center items-center">
      <h1 class="text-lg font-bold text-white tracking-widest flex justify-center items-center gap-2">
        <n-icon size="24">
          <component :is="route.matched[0].meta.icon"></component>
        </n-icon>
        <h1 v-if="isExtend" class="whitespace-nowrap text-white">
          {{ route.matched[0].meta.title }}
        </h1>
      </h1>
    </div>

    <!-- Route list -->
    <div class="relative w-full h-full flex flex-col justify-start items-center gap-2">
      <transition-group tag="div" class="absolute w-full h-full flex flex-col justify-start items-center gap-2 overflow-y-auto scroll p-2" @enter="onEnter" @leave="onLeave">
        <div v-for="(record, recordIndex) in menuList" :key="`${record.path}${recordIndex}`" :class="menuBorderClass(record)" class="w-full rounded-md flex flex-col justify-center items-center" :data-index="recordIndex">
          <!-- Title -->
          <n-popover
            :disabled="isExtend"
            trigger="hover"
            placement="right"
            :content-style="{
              padding: 0,
            }"
          >
            <!-- unextend popover content -->
            <template #header>
              <div class="min-w-120px h-full flex items-center justify-center gap-4 px-2 rounded-md">
                <!-- icon -->
                <n-icon :size="24">
                  <component :is="record.meta?.icon"></component>
                </n-icon>
                <!-- title -->
                <h1 class="text-sm whitespace-nowrap">
                  {{ record.meta?.title }}
                </h1>
              </div>
            </template>

            <!-- trigger content -->
            <template #trigger>
              <div class="w-full h-12 flex items-center cursor-pointer select-none transform transition-all duration-200 rounded-md hover:(bg-surface0/40) dark:hover:bg-surface0/20" :class="menuClass(record)" @click="clickSecondRoute(record, recordIndex)">
                <div class="w-full h-full flex items-center" :class="isExtend ? 'justify-start gap-2' : 'justify-center'">
                  <!-- icon -->
                  <n-icon :size="24">
                    <component :is="record.meta?.icon"></component>
                  </n-icon>

                  <!-- title -->
                  <h1 class="text-sm whitespace-nowrap" v-if="isExtend">
                    {{ record.meta?.title }}
                  </h1>
                </div>

                <n-button text circle @click="(event) => toggleRouteList(event, recordIndex)">
                  <!-- child arrow-->
                  <n-icon :size="24" v-if="isExtend && record.children && childrenListLength(record.children) !== 0">
                    <i-mdi-keyboard-arrow-up v-if="showChildrenList[recordIndex]"></i-mdi-keyboard-arrow-up>
                    <i-mdi-keyboard-arrow-down v-else></i-mdi-keyboard-arrow-down>
                  </n-icon>
                </n-button>
              </div>
            </template>
            <!-- popover content -->
            <div class="min-w-26 flex flex-col">
              <div
                class="w-full h-10 flex items-center gap-2 cursor-pointer select-none text-dark-400 dark:(text-light-50) transform transition-all duration-200 dark:hover:(bg-dark-600/30) hover:(bg-dark-600/10)"
                :class="childMenuClass(childRecord)"
                @click="jumpTo(childRecord)"
                v-for="(childRecord, childRecordIndex) in record.children?.filter((child) => !child.meta?.hide)"
                :key="childRecordIndex"
              >
                <!-- current point -->
                <i-solar-map-arrow-right-bold-duotone class="text-blue" v-if="record.name === route.name"></i-solar-map-arrow-right-bold-duotone>

                <!-- icon -->
                <n-icon size="16">
                  <component :is="childRecord.meta?.icon"></component>
                </n-icon>

                <!-- title -->
                <h1 class="text-sm whitespace-nowrap">
                  {{ childRecord.meta?.title }}
                </h1>
              </div>
            </div>
          </n-popover>

          <!-- Children -->
          <transition @enter="onChildEnter" @leave="onChildLeave">
            <div class="w-full shadow-in" v-if="isExtend && showChildrenList[recordIndex] && record.children && childrenListLength(record.children) !== 0">
              <!-- Children Title -->
              <div
                class="w-full h-12 pl-8 flex items-center gap-2 cursor-pointer select-none transform transition-all duration-200 hover:(bg-surface0/40) dark:hover:bg-surface0/20"
                :class="childMenuClass(childRecord)"
                @click="jumpTo(childRecord)"
                v-for="(childRecord, childRecordIndex) in record.children.filter((child) => !child.meta?.hide)"
                :key="childRecordIndex"
              >
                <!-- current point -->
                <i-solar-map-arrow-right-bold-duotone class="text-text" v-if="record.name === route.name"></i-solar-map-arrow-right-bold-duotone>

                <!-- icon -->
                <n-icon size="24">
                  <component :is="childRecord.meta?.icon"></component>
                </n-icon>

                <!-- title -->
                <h1 class="text-sm whitespace-nowrap" v-show="isExtend">
                  {{ childRecord.meta?.title }}
                </h1>
              </div>
            </div>
          </transition>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncRoute } from '@/store/modules/asyncRoute';
import { useConfigStore } from '@/store/modules/config';
import { useSystemStore } from '@/store/modules/system';
import gsap from 'gsap';
import { RouteRecordName, RouteRecordRaw } from 'vue-router';
// Store
const asyncRouteStore = useAsyncRoute();
const systemStore = useSystemStore();
const configStore = useConfigStore();

// route anime
function onEnter(el: HTMLElement, done: () => void) {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      x: '-100%',
    },
    {
      opacity: 1,
      x: '0%',
      duration: 0.4,
      delay: Number(el.dataset.index) * 0.05,
      onComplete: done,
    },
  );
}

function onLeave(el: HTMLElement, done: () => void) {
  el.style.position = 'absolute';
  gsap.fromTo(
    el,
    {
      opacity: 1,
      x: '0%',
      y: Number(el.dataset.index) * 56 + 'px',
    },
    {
      opacity: 0,
      x: '100%',
      y: Number(el.dataset.index) * 56 + 'px',
      duration: 0.4,
      delay: Number(el.dataset.index) * 0.02,
      onComplete: done,
    },
  );
}

// sidebar scale
const { isExtend } = storeToRefs(systemStore);

const menuBorderClass = (record: RouteRecordRaw) => {
  return record.name === currentMenu.value.name ? 'ring-2  ring-lavender-dark/20' : '';
};

const menuClass = (record: RouteRecordRaw) => {
  const isCurrentMenu = record.name === currentMenu.value.name ? 'font-semibold text-primary' : '';
  const isExtendClass = isExtend.value ? 'justify-start px-4' : 'justify-center';
  return `${isCurrentMenu} ${isExtendClass}`;
};

const childMenuClass = (record: RouteRecordRaw) => {
  const isCurrentMenu = record.name === route.name ? 'font-semibold text-primary' : '';
  const isExtendClass = isExtend.value ? 'justify-start px-4' : 'justify-center';
  return `${isCurrentMenu} ${isExtendClass}`;
};

// second route list
const route = useRoute();
const { accessRoutes } = storeToRefs(asyncRouteStore);

// current route root tree
const currentRouteTree = computed((): RouteRecordRaw | RouteRecordRaw[] | undefined => {
  if (topRouteMenu.value) {
    return accessRoutes.value.find((item) => item.name === route.matched[0].name);
  } else {
    return accessRoutes.value;
  }
});
const menuList = computed(() => {
  if (topRouteMenu.value) {
    const currentRouteRootTree = currentRouteTree.value as RouteRecordRaw;
    return currentRouteRootTree?.children || [];
  } else {
    return (currentRouteTree.value as RouteRecordRaw[]) || [];
  }
});

// current top route
const { topRouteMenu } = storeToRefs(configStore);
const currentMenu = computed(() => {
  return topRouteMenu.value ? route.matched[1] : route.matched[0];
});

// second route jump
const router = useRouter();
function jumpTo(record?: RouteRecordRaw) {
  // console.log(record);
  if (record?.name) {
    router.push({ name: record.name });
  }
}

// second route click
const showChildrenList = ref<boolean[]>(
  menuList.value.map((menu) => {
    if (menu.name === currentMenu.value.name) {
      return true;
    } else {
      return false;
    }
  }),
);
function clickSecondRoute(record: RouteRecordRaw, recordIndex: number) {
  // jump to route
  if (record.component) {
    router.push({ name: record.name });
  }
}

function toggleRouteList(event: Event, recordIndex: number) {
  event.stopPropagation();
  showChildrenList.value[recordIndex] = !showChildrenList.value[recordIndex];
}

// second children Anime
function onChildEnter(el: HTMLElement, done: () => void) {
  gsap.fromTo(
    el,
    {
      height: 0,
      opacity: 0,
    },
    {
      height: 'auto',
      opacity: 1,
      duration: 0.3,
      ease: 'back.out(1.7)',
      onComplete: done,
    },
  );
}

function onChildLeave(el: HTMLElement, done: () => void) {
  gsap.to(el, {
    height: 0,
    opacity: 0,
    duration: 0.3,
    ease: 'back.in(1.7)',
    onComplete: done,
  });
}
// children list length
const childrenListLength = (children: RouteRecordRaw[]) => {
  return children.filter((item) => !item.meta?.hide).length;
};

// can popover
const hasPop = (record: RouteRecordRaw) => {
  return record.children !== undefined && childrenListLength(record.children) !== 0;
};
</script>

<style scoped></style>
