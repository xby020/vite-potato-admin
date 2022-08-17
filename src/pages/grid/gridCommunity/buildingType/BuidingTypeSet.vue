<template>
  <div class="w-full h-full flex flex-col gap-2">
    <!-- name -->
    <n-space justify="space-between">
      <h1 class="text-lg font-semibold">{{ add ? '新增' : '编辑' }}</h1>
      <n-button
        type="success"
        size="medium"
        class="mr-16"
        :loading="submitLoading"
        @click="hanleSubmit"
        >提交</n-button
      >
    </n-space>

    <n-divider class="!my-1" />

    <div class="w-full flex-auto">
      <n-scrollbar class="w-full h-full">
        <n-form
          :model="formModel"
          :rules="formRules"
          ref="formRef"
          label-width="80"
          :inline="false"
          size="medium"
        >
          <n-form-item label="编号" path="no">
            <n-input-number v-model:value="formModel.no" />
          </n-form-item>

          <n-form-item label="建筑类型" path="type_name">
            <n-input v-model:value="formModel.type_name" />
          </n-form-item>
        </n-form>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BuildingType,
  BuildingTypeResult,
  createBuildingType,
  updateBuildingType
} from '@/api/grid/buildingType';
import { FormInst } from 'naive-ui';

interface Props {
  add?: boolean;
  property?: BuildingTypeResult;
  suggestNo?: number;
}

const props = defineProps<Props>();

const formRef = ref<FormInst | null>();
const formModel = reactive<BuildingType>({
  no: 0,
  type_name: '',
  memo: ''
});
// set edit mode
if (!props.add) {
  if (props.property) {
    formModel.no = props.property.no;
    formModel.type_name = props.property.type_name;
    formModel.memo = props.property.memo;
  }
}
const formRules = reactive({
  no: [{ required: true, message: '请输入编号' }],
  type_name: [{ required: true, message: '请输入建筑类型名称' }]
});

// submit
const emits = defineEmits(['finish']);
const submitLoading = ref(false);
async function submit() {
  if (props.add) {
    const res: BuildingTypeResult = await createBuildingType(formModel);
    if (res.uuid) {
      window.$message.success('添加成功');
    }
  } else {
    if (props.property) {
      const res: BuildingTypeResult = await updateBuildingType(
        props.property.uuid,
        formModel
      );
      if (res.uuid) {
        window.$message.success('修改成功');
      }
    }
  }
}
async function hanleSubmit() {
  formRef.value?.restoreValidation();
  formRef.value?.validate(async (error) => {
    if (!error) {
      submitLoading.value = true;
      try {
        await submit();
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
