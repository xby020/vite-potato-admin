<template>
  <div class="w-full h-full flex flex-col gap-2">
    <!-- name -->
    <n-space justify="space-between">
      <h1 class="text-lg font-semibold">
        {{ community?.uuid ? '编辑' : '新增' }}
      </h1>
      <n-button
        type="success"
        size="medium"
        class="mr-16"
        :loading="submitLoading"
        @click="handleSubmit"
        >提交</n-button
      >
    </n-space>

    <n-divider class="!my-1" />

    <div class="w-full flex-auto">
      <n-scrollbar class="w-full h-full">
        <n-form
          :model="formModel"
          ref="formRef"
          :rules="formRules"
          label-width="80"
          :inline="false"
          size="medium"
        >
          <n-form-item label="小区/村名称" path="name">
            <n-input v-model:value="formModel.name" />
          </n-form-item>
          <n-form-item label="物业类型选择" path="property">
            <n-select
              v-model:value="formModel.property"
              filterable
              placeholder="请选择"
              :options="options"
              :loading="loading"
              clearable
              remote
              @search="handleSearch"
            />
          </n-form-item>
        </n-form>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProperty, getPropertyInfo } from '@/api/grid/property';
import { createVillage, VillageResult } from '@/api/grid/village';
import { FormInst, SelectOption } from 'naive-ui';

interface Props {
  community?: VillageResult;
}

const props = defineProps<Props>();

// Form
const formRef = ref<FormInst | null>(null);
const formModel = reactive({
  property: '',
  name: '',
  data: ''
});
const formRules = {
  property: [{ required: true, message: '请选择物业类型' }],
  name: [{ required: true, message: '请输入名称' }]
};

// Property Options
const options = ref<SelectOption[]>([]);
const loading = ref(false);
async function handleSearch(value: string) {
  loading.value = true;
  const res = await getProperty({ page: 1, size: 9999, name: value });
  options.value = res.results.map((item) => ({
    value: item.uuid,
    label: item.name
  }));
  loading.value = false;
}

// update
onMounted(async () => {
  if (props.community?.uuid) {
    formModel.property = props.community.property;
    formModel.name = props.community.name;
    formModel.data = props.community.data;
    const defaultProperty = await getPropertyInfo(props.community.property);
    console.log(defaultProperty);
    options.value = [
      {
        value: defaultProperty.uuid,
        label: defaultProperty.name
      }
    ];
  }
});

// submit
const emits = defineEmits(['finish']);
const submitLoading = ref(false);
async function handleSubmit() {
  formRef.value?.restoreValidation();
  formRef.value?.validate(async (error) => {
    if (!error) {
      submitLoading.value = true;
      try {
        await createVillage({
          property: formModel.property,
          name: formModel.name,
          data: formModel.data
        });
        window.$message.success('提交成功');
        emits('finish');
      } catch (err) {
        window.$message.error(JSON.stringify(err));
      } finally {
        submitLoading.value = false;
      }
    } else {
      window.$message.error('请填写必填项');
    }
  });
}
</script>

<style scoped></style>
