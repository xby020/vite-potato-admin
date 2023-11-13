<template>
  <div class="w-full h-full flex flex-col gap-2 pb-4 pr-2 bg-light-200 text-text dark:(bg-base-dark text-text-dark) rounded-md">
    <!-- Header -->
    <div class="w-full h-16 flex justify-between items-center">
      <!-- title -->
      <div class="flex items-center gap-2 mx-4">
        <n-icon size="24">
          <component :is="route.meta.icon"></component>
        </n-icon>
        <h1 class="text-xl font-bold tracking-wider">
          {{ title }}
        </h1>
      </div>

      <!-- action -->
      <div class="flex items-center h-full">
        <slot name="action"></slot>
      </div>
    </div>

    <!-- divider -->
    <div class="w-full h-1px bg-surface0/50 dark:bg-surface0-dark" v-if="divider"></div>

    <!-- content -->
    <div v-if="scroll" class="w-full flex-1 overflow-y-auto">
      <div class="w-full h-full overflow-y-auto pr-4">
        <slot name="default"></slot>
      </div>
    </div>

    <div v-else class="w-full flex-1 overflow-hidden">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  divider?: boolean;
  scroll?: boolean;
}

const props = defineProps<Props>();
const route = useRoute();

const title = computed(() => {
  return props.title || route.meta.title || '';
});
</script>

<style scoped></style>
