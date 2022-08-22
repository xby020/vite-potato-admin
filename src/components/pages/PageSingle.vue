<template>
  <div class="w-full h-full flex flex-col bg-light-50 dark:bg-dark-50">
    <!-- Header -->
    <div class="w-full h-16 flex justify-between items-center">
      <!-- title -->
      <div class="flex items-center gap-2">
        <n-icon size="24"> </n-icon>
        <h1 class="text-xl font-bold tracking-wider text-dark-400">
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
