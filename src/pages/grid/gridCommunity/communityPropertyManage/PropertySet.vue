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
          <n-form-item label="物业名称" path="name">
            <n-input v-model:value="formModel.name" />
          </n-form-item>

          <n-form-item label="法人姓名" path="owner_name">
            <n-input v-model:value="formModel.owner_name" />
          </n-form-item>

          <n-form-item label="法人证件号" path="owner_id">
            <n-input v-model:value="formModel.owner_id" />
          </n-form-item>

          <n-form-item label="企业证件号" path="ent_id">
            <n-input v-model:value="formModel.ent_id" />
          </n-form-item>

          <n-form-item label="办公地址" path="office_address">
            <n-input v-model:value="formModel.office_address" />
          </n-form-item>

          <n-form-item label="电话" path="phone">
            <n-input v-model:value="formModel.phone" />
          </n-form-item>

          <n-form-item label="简介" path="brief">
            <n-input type="textarea" v-model:value="formModel.brief" />
          </n-form-item>

          <n-form-item label="照片" path="phone">
            <n-upload
              :max="1"
              list-type="image-card"
              action="/upload"
              :default-file-list="defaultUploadList"
              @finish="handleUploadFinished"
              @update:file-list="handleFileChange"
            >
              <n-upload-dragger>
                <n-icon size="36" :depth="3">
                  <i-fa-cloud-upload></i-fa-cloud-upload>
                </n-icon>
              </n-upload-dragger>
            </n-upload>
          </n-form-item>
        </n-form>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createProperty, Property, updateProperty } from '@/api/grid/property';
import { property } from 'lodash';
import { FormInst, UploadFileInfo } from 'naive-ui';

interface Props {
  add?: boolean;
  property?: Property;
}

const props = defineProps<Props>();

const formRef = ref<FormInst | null>();
const formModel = reactive<Property>({
  uuid: '',
  name: '',
  owner_name: '',
  owner_id: '',
  ent_id: '',
  office_address: '',
  phone: '',
  brief: '',
  photo: ''
});
const defaultUploadList = ref<UploadFileInfo[]>([]);
// set edit mode
if (!props.add) {
  if (props.property) {
    formModel.uuid = props.property.uuid;
    formModel.name = props.property.name;
    formModel.owner_name = props.property.owner_name;
    formModel.owner_id = props.property.owner_id;
    formModel.ent_id = props.property.ent_id;
    formModel.office_address = props.property.office_address;
    formModel.phone = props.property.phone;
    formModel.brief = props.property.brief;
    formModel.photo = props.property.photo;
    defaultUploadList.value = props.property.photo
      ? [
          {
            id: props.property.photo,
            name: props.property.photo,
            url: props.property.photo,
            status: 'finished',
            thumbnailUrl: props.property.photo
          }
        ]
      : [];
  }
}
const formRules = reactive({
  name: [{ required: true, message: '请输入物业名称' }],
  owner_name: [{ required: true, message: '请输入法人姓名' }]
});

function handleUploadFinished(options: {
  file: UploadFileInfo;
  event?: ProgressEvent;
}) {
  if (options.event) {
    const evnetTarget = options.event.currentTarget as any;
    const response = JSON.parse(evnetTarget.response);
    options.file.url = response.path;
  }
}

function handleFileChange(list: UploadFileInfo[]) {
  console.log(list);
  list.forEach((file) => {
    formModel.photo = file.url || '';
  });
}

// submit
const emits = defineEmits(['finish']);
const submitLoading = ref(false);
async function submit() {
  if (props.add) {
    const res: Property = await createProperty(formModel);
    if (res.uuid) {
      window.$message.success('添加成功');
    }
  } else {
    if (props.property) {
      const res: Property = await updateProperty(
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
