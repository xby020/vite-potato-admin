<template>
  <div class="w-full max-h-full bg-light-50">
    {{ uuid }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { uuid } = route.params;
</script>

<style scoped></style>
