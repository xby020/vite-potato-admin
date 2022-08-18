<template>
  <div class="w-full h-full bg-light-200 px-4">
    <div class="h-16 flex justify-between items-center px-4">
      <h1 class="text-lg">政策解读内容</h1>
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
    <div class="w-full h-full overflow-y-auto p-4 pb-24" v-scrollbar>
      <n-form
        v-if="formData"
        class="w-2/3 h-full"
        :model="formData"
        ref="formRef"
        :rules="formRules"
        label-placement="top"
        :label-width="100"
        :inline="false"
        size="medium"
      >
        <n-grid :x-gap="120" :y-gap="5" :cols="2">
          <n-form-item-gi :span="1" label="政策解读名称" path="name">
            <n-input v-model:value="formData.name" />
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="解读级别" path="name">
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

          <n-form-item-gi :span="1" label="发布日期" path="pub_date">
            <n-date-picker
              v-model:formatted-value="formData.pub_date"
              value-format="yyyy-MM-dd"
              type="date"
              class="w-full"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi :span="2" label="封面图" path="cover_image_uuid">
            <n-upload
              action="/upload"
              list-type="image-card"
              :max="1"
              :headers="{
                Authorization: cookies.get('token')
              }"
              :default-file-list="defaultList"
              @finish="handleUploadFinished"
              @update:file-list="handleFileChange"
            >
              <!-- <n-button>
                上传图片
                <template #icon>
                  <n-icon size="24">
                    <i-mdi-upload></i-mdi-upload>
                  </n-icon>
                </template>
              </n-button> -->
            </n-upload>
          </n-form-item-gi>

          <n-form-item-gi :span="1" label="关联政策" path="relate_policy_uuid">
            <n-select
              v-model:value="formData.relate_policy_uuid"
              size="medium"
              :options="relatePolicyOptions"
              clearable
            />
          </n-form-item-gi>

          <n-form-item-gi
            :span="2"
            label="解读内容"
            path="info"
            class="w-full h-full"
          >
            <div class="w-full h-full border-1">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
              />
              <Editor
                :style="{
                  width: '100%',
                  height: '400px',
                  overflow: 'auto'
                }"
                v-scrollbar
                v-model="formData.info"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
              />
            </div>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInst, FormRules, UploadFileInfo } from 'naive-ui';
import cookies from '@/utils/cookies';
import { getPolicy } from '@/api/policy/policy';
import {
  addExplaination,
  getExplaination,
  getExplainationDetail,
  updateExplaination
} from '@/api/explaination/explaination';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import {
  levelOptions,
  relateDepartOptions,
  typeOptions
} from '../ExplainationOptions';

const route = useRoute();

const formRef = ref<FormInst>();
const formData = ref();
const formRules = ref<FormRules>();
const defaultList = ref<any[]>([]);
onMounted(async () => {
  const uuid = route.params.uuid as string;
  const res = await getExplainationDetail(uuid);
  console.log(res);
  formData.value = res;
  defaultList.value = [
    {
      id: res.cover_image_uuid,
      name: res.cover_img_name,
      url: res.cover_img_path,
      status: 'finished',
      thumbnailUrl: res.cover_img_path
    }
  ];
});

const relatePolicyOptions = ref<any[]>([]);
onMounted(async () => {
  const labels = await getPolicy({ page: 1, page_size: 99999 });
  console.log(labels);
  // set labels to group
  const choosable = labels.items.filter((item: any) => {
    return !item.relate_pi_uuid;
  });
  relatePolicyOptions.value = choosable.map((label: any) => ({
    label: label.name,
    value: label.uuid
  }));
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

function handleFileChange(list: UploadFileInfo[]) {
  console.log(list);
  formData.value.cover_img_uuid = list.map((item) => item.batchId)[0];
}

// Editor
const editorRef = shallowRef();
const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };
const handleCreated = (editor: any) => {
  editorRef.value = editor;
};
const mode = ref('default');
onUnmounted(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// Back
const router = useRouter();
function back() {
  router.push({ name: 'Explaination_list' });
}

// Submit
const submitLoading = ref(false);
async function submit() {
  submitLoading.value = true;
  try {
    console.log(formData.value);
    const res = await updateExplaination(
      route.params.uuid as string,
      formData.value
    );
    console.log(res);
    window.$message.success('更新成功');
    router.push({ name: 'Explaination_list' });
  } catch (err) {
    console.log(err);
  } finally {
    submitLoading.value = false;
  }
}
</script>

<style scoped></style>
