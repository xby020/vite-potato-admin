<template>
  <div class="w-full h-full flex flex-col gap-2">
    <!-- name -->
    <h1 class="text-lg font-semibold">{{ property.name }}</h1>
    <n-divider class="!my-1" />

    <!-- image -->
    <div class="w-full h-220px">
      <n-image
        :src="property.photo"
        object-fit="scale-down"
        class="w-full h-full"
      >
        <template #placeholder>
          <div
            class="w-full h-full bg-stone-200 flex justify-center items-center"
          >
            <n-icon size="48" class="opacity-20">
              <i-mdi-signature-image></i-mdi-signature-image>
            </n-icon>
          </div>
        </template>
      </n-image>
    </div>

    <!-- info -->
    <n-scrollbar class="w-full flex-auto">
      <n-descriptions
        bordered
        label-placement="left"
        title="基本信息"
        :column="1"
        :label-style="{
          width: '160px'
        }"
      >
        <n-descriptions-item label="物业名称">
          {{ property.name || '无' }}
        </n-descriptions-item>
        <n-descriptions-item label="物业负责人">
          {{ property.owner_name || '无' }}
        </n-descriptions-item>
        <n-descriptions-item label="负责人身份证号">
          {{ property.owner_id || '无' }}
        </n-descriptions-item>
        <n-descriptions-item label="物业公司证件号">
          {{ property.ent_id || '无' }}
        </n-descriptions-item>
        <n-descriptions-item label="办公地址">
          {{ property.office_address || '无' }}
        </n-descriptions-item>
        <n-descriptions-item label="电话">
          {{ property.phone || '无' }}
        </n-descriptions-item>
        <n-descriptions-item label="简介">
          {{ property.brief || '无' }}
        </n-descriptions-item>
      </n-descriptions>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { Property } from '@/api/grid/property';

interface Props {
  property: Property;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
