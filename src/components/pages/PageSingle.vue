<template>
  <div
    class="w-full h-full flex flex-col bg-light-50 dark:(bg-zinc-800 text-light-50) rounded-md"
  >
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
    <div class="w-full h-1px bg-gray-200" v-if="divider?.header"></div>

    <!-- content -->
    <div class="w-full flex-auto"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  divider?: {
    header?: boolean;
  };
}

const props = defineProps<Props>();
const route = useRoute();
</script>

<style scoped></style>
