<template>
  <page-card>
    <n-space>
      <n-button>
        <template #icon>
          <i-svg-spinners-blocks-scale></i-svg-spinners-blocks-scale>
        </template>
        Default</n-button
      >
      <n-button type="tertiary"> Tertiary </n-button>
      <n-button type="primary"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error"> Error </n-button>
    </n-space>
  </page-card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
