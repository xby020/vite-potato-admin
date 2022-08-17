<template>
  <div class="w-full h-full flex flex-col gap-2">
    <!-- name -->
    <n-space justify="space-between">
      <h1 class="text-lg font-semibold">{{ community?.name }}</h1>
    </n-space>

    <n-divider class="!my-1" />

    <div class="w-full flex-auto" v-if="community">
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
          <n-descriptions-item label="小区/村名称">
            {{ community.name || '无' }}
          </n-descriptions-item>
          <n-descriptions-item label="物业名称/类型">
            {{ propertyInfo?.name || '无' }}
          </n-descriptions-item>
        </n-descriptions>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPropertyInfo, Property } from '@/api/grid/property';
import { VillageResult } from '@/api/grid/village';

interface Props {
  community?: VillageResult;
}

const props = defineProps<Props>();
const propertyInfo = ref<Property>();
onMounted(async () => {
  if (props.community) {
    propertyInfo.value = await getPropertyInfo(props.community.property);
  }
});
</script>

<style scoped></style>
