<template>
  <div class="w-full h-full bg-light-200 flex flex-col">
    <div class="w-full h-16 flex justify-between items-center px-4">
      <h1 class="text-lg">新增政策兑换资金项目</h1>

      <div class="flex gap-2">
        <n-button
          type="success"
          size="large"
          :loading="submitLoading"
          @click="submit"
          >上传</n-button
        >
        <n-button type="default" size="large" @click="back">返回</n-button>
      </div>
    </div>
    <div class="w-full flex-auto p-4 overflow-y-auto" v-scrollbar>
      <n-form
        class="w-1/3"
        :model="formData"
        ref="formRef"
        :rules="formRules"
        label-placement="left"
        :label-width="100"
        :inline="false"
        size="medium"
      >
        <n-grid :x-gap="120" :y-gap="5" :cols="1">
          <n-form-item-gi :span="1" label="政策">
            <n-select
              v-model:value="formData.policy_uuid"
              size="medium"
              :options="policyOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="企业规模">
            <n-select
              v-model:value="formData.entp_scale"
              size="medium"
              :options="entpScaleOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="企业类型">
            <n-select
              v-model:value="formData.label_uuid"
              size="medium"
              :options="labelOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="企业名称">
            <n-input v-model:value="formData.entp_name" />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="部门">
            <n-select
              v-model:value="formData.depart"
              size="medium"
              :options="relateDepartOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="金额">
            <n-input v-model:value="formData.amount" />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="发放时间">
            <n-date-picker
              v-model:formatted-value="formData.pay_date"
              value-format="yyyy-MM-dd"
              type="date"
              class="w-full"
              clearable
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLabels, getPolicy } from '@/api/policy/policy';
import { addPolicyFunds } from '@/api/policy/policyFunds';
import { FormInst, FormRules } from 'naive-ui';
import {
  levelOptions,
  entpScaleOptions,
  relateDepartOptions
} from '../PolicyFunds/PolicyFundsOptions';

const formRef = ref<FormInst>();
const formData = reactive({
  policy_uuid: '', // 政策uuid
  entp_scale: null, // 企业规模
  label_uuid: '', // 企业类型标签
  entp_name: '', // 企业名字
  depart: null, // 部门
  amount: '', // 金额
  pay_date: null // 发放时间
});

const formRules = ref<FormRules>();

const labelOptions = ref<any[]>([]);
onMounted(async () => {
  const labels = await getLabels();
  // set labels to group
  labels.forEach((label: any) => {
    const labelGroup = labelOptions.value.find(
      (group: any) => group.label === label.category_name
    );
    if (labelGroup) {
      labelGroup.children.push({
        label: label.name,
        value: label.uuid
      });
    } else {
      labelOptions.value.push({
        label: label.category_name,
        type: 'group',
        key: label.category_name,
        children: [
          {
            label: label.name,
            value: label.uuid
          }
        ]
      });
    }
  });
});

const policyOptions = ref<any[]>([]);
onMounted(async () => {
  const policies = await getPolicy({
    page: 1,
    page_size: 99999
  });
  policies.items.forEach((policy: any) => {
    policyOptions.value.push({
      label: policy.name,
      value: policy.uuid
    });
  });
});

// Back
const router = useRouter();
function back() {
  router.push({ name: 'PolicyFunds_list' });
}

// Submit
const submitLoading = ref(false);
async function submit() {
  submitLoading.value = true;
  try {
    console.log(formData);
    const res = await addPolicyFunds(formData);
    console.log(res);
    window.$message.success('添加成功');
    router.push({ name: 'PolicyFunds_list' });
  } catch (err) {
    console.log(err);
  } finally {
    submitLoading.value = false;
  }
}
</script>

<style scoped></style>
