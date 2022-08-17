<template>
  <div class="w-full h-full flex flex-col gap-2">
    <!-- name -->
    <n-space justify="space-between">
      <h1 class="text-lg font-semibold">{{ info?.item_name }}</h1>
    </n-space>

    <n-divider class="!my-1" />

    <!-- Imaeg -->
    <div
      class="w-full aspect-video bg-gray-100 flex justify-center items-center overflow-hidden"
    >
      <!-- static -->
      <n-image
        v-if="info?.data?.img_link"
        :src="info?.data.img_link"
        object-fit="cover"
      />
      <!-- video -->
      <sugon-video
        v-else-if="info?.data?.cameraIndexCode"
        :camera-index-code="info?.data.cameraIndexCode"
      ></sugon-video>
      <!-- Nothing -->
      <n-icon v-else size="72" class="text-gray-300">
        <i-mdi-image-broken-variant></i-mdi-image-broken-variant>
      </n-icon>
    </div>

    <!-- attribute -->
    <div class="w-full flex-auto" v-if="info">
      <n-scrollbar class="w-full h-full">
        <n-descriptions
          bordered
          label-placement="left"
          title="基本信息"
          :column="1"
          :label-style="{
            width: '160px'
          }"
        >
          <n-descriptions-item label="编号">
            {{ info.no || '无' }}
          </n-descriptions-item>

          <n-descriptions-item label="部件名称">
            {{ info.item_name || '无' }}
          </n-descriptions-item>

          <n-descriptions-item label="所属网格">
            {{ info.grid || '无' }}
          </n-descriptions-item>

          <n-descriptions-item label="部件类型">
            {{ info.item_type_name || '无' }}
          </n-descriptions-item>

          <n-descriptions-item label="部件简介">
            {{ info.brief || '无' }}
          </n-descriptions-item>
        </n-descriptions>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FacilityResult } from '@/api/grid/facilify';

interface Props {
  info?: FacilityResult;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
