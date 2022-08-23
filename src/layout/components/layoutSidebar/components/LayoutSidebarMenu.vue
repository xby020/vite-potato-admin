<template>
  <div class="w-full h-full">
    <!-- Route -->
    <div
      class="w-full h-12 mb-2 bg-blue-600 rounded-md flex justify-center items-center"
    >
      <h1
        class="text-lg font-bold text-white tracking-widest flex justify-center items-center gap-2"
      >
        <n-icon size="24">
          <component :is="route.matched[0].meta.icon"></component>
        </n-icon>
        <h1 v-if="isExtend" class="whitespace-nowrap">
          {{ route.matched[0].meta.title }}
        </h1>
      </h1>
    </div>
    <div
      class="relative w-full h-full flex flex-col justify-start items-center gap-2"
    >
      <transition-group
        tag="div"
        class="absolute w-full h-full flex flex-col justify-start items-center gap-2 overflow-y-auto"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div
          v-for="(record, recordIndex) in menuList"
          :key="`${record.path}${recordIndex}`"
          class="w-full rounded-md flex flex-col justify-center items-center"
          :data-index="recordIndex"
        >
          <!-- Title -->
          <div
            class="w-full h-12 rounded-t-sm flex justify-between items-center cursor-pointer select-none text-light-600 transform transition-all duration-200 hover:(bg-zinc-800/50)"
            :class="menuClass(record)"
            @click="clickSecondRoute(record, recordIndex)"
          >
            <div
              class="w-full h-full flex items-center"
              :class="isExtend ? 'justify-start gap-2' : 'justify-center'"
            >
              <!-- icon -->
              <n-icon :size="24">
                <component :is="record.meta?.icon"></component>
              </n-icon>

              <!-- title -->
              <h1 class="text-sm whitespace-nowrap" v-if="isExtend">
                {{ record.meta?.title }}
              </h1>
            </div>

            <!-- child arrow-->
            <n-icon
              :size="24"
              class="text-zinc-400"
              v-if="
                isExtend &&
                record.children &&
                childrenListLength(record.children) !== 0
              "
            >
              <i-mdi-keyboard-arrow-up
                v-if="showChildrenList[recordIndex]"
              ></i-mdi-keyboard-arrow-up>
              <i-mdi-keyboard-arrow-down v-else></i-mdi-keyboard-arrow-down>
            </n-icon>
          </div>

          <!-- Children -->
          <transition @enter="onChildEnter" @leave="onChildLeave">
            <div
              class="w-full bg-zinc-600 shadow-in shadow-slate-800"
              v-if="
                isExtend &&
                showChildrenList[recordIndex] &&
                record.children &&
                childrenListLength(record.children) !== 0
              "
            >
              <!-- Children Title -->
              <div
                class="w-full h-12 pl-8 rounded-t-sm flex items-center gap-2 cursor-pointer select-none text-zinc-200 transform transition-all duration-200 hover:(bg-dark-600/50)"
                :class="childMenuClass(childRecord)"
                @click="jumpTo(childRecord)"
                v-for="(
                  childRecord, childRecordIndex
                ) in record.children.filter((child) => !child.meta?.hide)"
                :key="childRecordIndex"
              >
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
import { useSystemStore } from '@/store/modules/system';
import gsap from 'gsap';
import { RouteRecordName, RouteRecordRaw } from 'vue-router';
// Store
const asyncRouteStore = useAsyncRoute();
const systemStore = useSystemStore();

// route anime
function onEnter(el: HTMLElement, done: () => void) {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      x: '-100%'
    },
    {
      opacity: 1,
      x: '0%',
      duration: 0.4,
      delay: Number(el.dataset.index) * 0.05,
      onComplete: done
    }
  );
}

function onLeave(el: HTMLElement, done: () => void) {
  el.style.position = 'absolute';
  gsap.fromTo(
    el,
    {
      opacity: 1,
      x: '0%',
      y: Number(el.dataset.index) * 56 + 'px'
    },
    {
      opacity: 0,
      x: '100%',
      y: Number(el.dataset.index) * 56 + 'px',
      duration: 0.4,
      delay: Number(el.dataset.index) * 0.02,
      onComplete: done
    }
  );
}

// sidebar scale
const { isExtend } = storeToRefs(systemStore);
const menuClass = computed((record: RouteRecordRaw) => {
  return (record: RouteRecordRaw) => {
    const isCurrentMenu =
      record.name === currentMenu.value.name
        ? '!text-cyan-400 bg-blue-300/10 shadow-sm shadow-dark-800/60'
        : '';
    const isExtendClass = isExtend.value
      ? 'justify-start px-4'
      : 'justify-center';
    return `${isCurrentMenu} ${isExtendClass}`;
  };
});
const childMenuClass = computed((record: RouteRecordRaw) => {
  return (record: RouteRecordRaw) => {
    const isCurrentMenu =
      record.name === route.name
        ? '!text-blue-400 bg-blue-400 bg-opacity-20'
        : '';
    const isExtendClass = isExtend.value
      ? 'justify-start px-4'
      : 'justify-center';
    return `${isCurrentMenu} ${isExtendClass}`;
  };
});

// second route list
const route = useRoute();
const { accessRoutes } = storeToRefs(asyncRouteStore);

const currentRouteTree = computed(() => {
  return accessRoutes.value.find((item) => item.name === route.matched[0].name);
});
const menuList = computed(() => {
  return currentRouteTree.value?.children || [];
});

const currentMenu = computed(() => {
  return route.matched[1];
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
  })
);
function clickSecondRoute(record: RouteRecordRaw, recordIndex: number) {
  // jump to route
  if (record.component) {
    router.push({ name: record.name });
  }
  // toggle children list
  if (record.children && record.children.length > 0) {
    showChildrenList.value[recordIndex] = !showChildrenList.value[recordIndex];
  }
}

// second children Anime
function onChildEnter(el: HTMLElement, done: () => void) {
  gsap.fromTo(
    el,
    {
      height: 0,
      opacity: 0
    },
    {
      height: 'auto',
      opacity: 1,
      duration: 0.3,
      ease: 'back.out(1.7)',
      onComplete: done
    }
  );
}

function onChildLeave(el: HTMLElement, done: () => void) {
  gsap.to(el, {
    height: 0,
    opacity: 0,
    duration: 0.3,
    ease: 'back.in(1.7)',
    onComplete: done
  });
}
// children list length
const childrenListLength = (children: RouteRecordRaw[]) => {
  return children.filter((item) => !item.meta?.hide).length;
};
</script>

<style scoped></style>
