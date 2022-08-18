<template>
  <div class="w-full h-full bg-light-200 flex flex-col">
    <div class="w-full h-16 flex justify-between items-center px-4">
      <h1 class="text-lg">新增政策</h1>

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
        class="w-2/3"
        :model="formData"
        ref="formRef"
        :rules="formRules"
        label-placement="left"
        :inline="false"
        size="medium"
      >
        <n-grid :x-gap="120" :y-gap="5" :cols="2">
          <n-form-item-gi :span="1" label="政策名称" path="name">
            <n-input v-model:value="formData.name" />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="政策级别" path="name">
            <n-select
              v-model:value="formData.level"
              size="medium"
              :options="levelOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="政策类型" path="type">
            <n-select
              v-model:value="formData.type"
              size="medium"
              :options="typeOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="归口部门" path="relate_depart">
            <n-select
              v-model:value="formData.relate_depart"
              size="medium"
              :options="relateDepartOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="申报类型" path="declare_type">
            <n-select
              v-model:value="formData.declare_type"
              size="medium"
              :options="declareTypeOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="发布日期" path="pub_date">
            <n-date-picker
              v-model:formatted-value="formData.pub_date"
              value-format="yyyy-MM-dd"
              type="date"
              class="w-full"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi
            v-if="formData.declare_type === 2"
            :span="1"
            label="截止日期"
            path="end_date"
          >
            <n-date-picker
              v-model:formatted-value="formData.end_date"
              value-format="yyyy-MM-dd"
              type="date"
              class="w-full"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="行业标签" path="label_uuid_list">
            <n-select
              v-model:value="formData.label_uuid_list"
              size="medium"
              :options="labelOptions"
              clearable
              multiple
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="企业规模" path="entp_scale">
            <n-select
              v-model:value="formData.entp_scale"
              size="medium"
              :options="entpScaleOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="发放金额" path="payment">
            <n-input v-model:value="formData.payment" />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="政策解读" path="relate_pi_uuid">
            <n-select
              v-model:value="formData.relate_pi_uuid"
              size="medium"
              :options="explainationOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="2" label="政策概述" path="overview">
            <n-input type="textarea" v-model:value="formData.overview" />
          </n-form-item-gi>

          <n-form-item-gi :span="2" label="支持对象" path="support_target">
            <n-input v-model:value="formData.support_target" />
          </n-form-item-gi>

          <n-form-item-gi :span="2" label="支持措施" path="support_method">
            <n-input type="textarea" v-model:value="formData.support_method" />
          </n-form-item-gi>

          <n-form-item-gi :span="2" label="相关附件" path="attachment_uuid">
            <n-upload
              action="/upload"
              list-type="text"
              multiple
              :headers="{
                Authorization: cookies.get('token')
              }"
              @finish="handleUploadFinished"
              @update:file-list="handleAttachmentFileChange"
            >
              <n-button>
                上传文件
                <template #icon>
                  <n-icon size="24">
                    <i-mdi-upload></i-mdi-upload>
                  </n-icon>
                </template>
              </n-button>
            </n-upload>
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="咨询电话" path="phone">
            <n-input v-model:value="formData.phone" />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="咨询电话介绍" path="phone_desc">
            <n-input v-model:value="formData.phone_desc" />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="政策原文" path="source_uuid">
            <n-upload
              action="/upload"
              list-type="text"
              multiple
              :headers="{
                Authorization: cookies.get('token')
              }"
              @finish="handleUploadFinished"
              @update:file-list="handleSourceFileChange"
            >
              <n-button>
                上传文件
                <template #icon>
                  <n-icon size="24">
                    <i-mdi-upload></i-mdi-upload>
                  </n-icon>
                </template>
              </n-button>
            </n-upload>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInst, FormRules, UploadFileInfo } from 'naive-ui';
import cookies from '@/utils/cookies';
import { addPolicy, getLabels } from '@/api/policy/policy';
import { getExplaination } from '@/api/explaination/explaination';
import {
  levelOptions,
  relateDepartOptions,
  typeOptions,
  declareTypeOptions,
  entpScaleOptions
} from '../PolicyOptions';

const formRef = ref<FormInst>();
const formData = reactive({
  name: null,
  level: null,
  type: null,
  relate_depart: null,
  declare_type: null,
  pub_date: null,
  end_date: null,
  entp_scale: null,
  payment: null,
  relate_pi_uuid: null,
  overview: null,
  support_method: null,
  support_target: null,
  attachment_uuid: '',
  phone: null,
  phone_desc: null,
  source_uuid: '',
  label_uuid_list: [] // 标签uuid列表
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
const explainationOptions = ref<any[]>([]);
onMounted(async () => {
  const expList = await getExplaination();
  console.log(expList);
  explainationOptions.value = expList.items.map((exp: any) => {
    return {
      label: exp.name,
      value: exp.uuid
    };
  });
});

// File upload
function handleUploadFinished(options: {
  file: UploadFileInfo;
  event?: ProgressEvent;
}) {
  if (options.event) {
    const evnetTarget = options.event.currentTarget as any;
    const response = JSON.parse(evnetTarget.response);
    options.file.url = response.path;
    options.file.batchId = response.uuid;
  }
}

function handleAttachmentFileChange(list: UploadFileInfo[]) {
  console.log(list);
  formData.attachment_uuid = list.map((item) => item.batchId)[0] as string;
}
function handleSourceFileChange(list: UploadFileInfo[]) {
  console.log(list);
  formData.source_uuid = list.map((item) => item.batchId)[0] as string;
}

// Back
const router = useRouter();
function back() {
  router.push({ name: 'PolicyManage_list' });
}

// Submit
const submitLoading = ref(false);
async function submit() {
  submitLoading.value = true;
  try {
    console.log(formData);
    // const res = await addPolicy(formData);
    // console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    submitLoading.value = false;
  }
}
</script>

<style scoped></style>
