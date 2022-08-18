<template>
  <n-card
    title="政策管理"
    size="large"
    :segmented="{
      content: true
    }"
    class="w-full h-full bg-light-200"
  >
    <div class="w-full h-full flex flex-col">
      <!-- Query -->
      <n-form label-placement="left" :inline="true" size="medium">
        <n-form-item label="政策名称">
          <n-input v-model:value="queryParams.name" />
        </n-form-item>
        <n-form-item label="政策级别">
          <n-select
            v-model:value="queryParams.level"
            size="medium"
            :options="levelOptions"
            clearable
            class="w-120px"
          />
        </n-form-item>
        <n-form-item label="归口部门">
          <n-select
            v-model:value="queryParams.relate_depart"
            size="medium"
            :options="relateDepartOptions"
            clearable
            class="w-120px"
          />
        </n-form-item>
        <n-form-item label="企业类型">
          <n-select
            v-model:value="entRef"
            size="medium"
            multiple
            :options="entpScaleOptions"
            clearable
            class="w-120px"
          />
        </n-form-item>
        <n-form-item label="申报类型">
          <n-select
            v-model:value="queryParams.declare_type"
            size="medium"
            :options="declareTypeOptions"
            clearable
            class="w-120px"
          />
        </n-form-item>
        <n-form-item label="政策类型">
          <n-select
            v-model:value="queryParams.type"
            size="medium"
            :options="typeOptions"
            clearable
            class="w-120px"
          />
        </n-form-item>
        <n-form-item>
          <div class="w-full flex gap-4">
            <n-button type="info" size="medium" @click="handleQuery"
              >搜索</n-button
            >
            <n-button type="default" size="medium" @click="resetQuery"
              >重置</n-button
            >
            <n-button
              text
              type="info"
              size="medium"
              icon-placement="right"
              @click=""
              v-if="false"
            >
              <span>展开</span>
              <template #icon>
                <n-icon size="24">
                  <i-mdi-keyboard-arrow-down></i-mdi-keyboard-arrow-down>
                </n-icon>
              </template>
            </n-button>
          </div>
        </n-form-item>
      </n-form>

      <!-- Table -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-lg font-semibold">政策列表</h1>
        <n-button type="info" size="large" @click="handleCreate">
          <template #icon>
            <n-icon size="24">
              <i-mdi-plus></i-mdi-plus>
            </n-icon>
          </template>
          新增项目
        </n-button>
      </div>

      <n-data-table
        class="w-full flex-auto"
        flex-height
        remote
        ref="table"
        :data="data"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
      >
      </n-data-table>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { deletePolicy, getPolicy } from '@/api/policy/policy';
import { DataTableColumn, NButton, NPopconfirm, NSpace, NTag } from 'naive-ui';
import {
  levelOptions,
  relateDepartOptions,
  typeOptions,
  declareTypeOptions,
  entpScaleOptions
} from './PolicyOptions';

const router = useRouter();

const queryParams = reactive({
  name: null,
  level: null,
  relate_depart: null,
  entp_scale: '',
  declare_type: null,
  type: null
});
const entRef = computed({
  get() {
    if (queryParams.entp_scale) {
      return queryParams.entp_scale.split(',').map((item) => Number(item));
    } else {
      return [];
    }
  },
  set(v) {
    queryParams.entp_scale = v.join(',');
  }
});

// Table
const data = ref();
const loading = ref(false);
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
  prefix() {
    return `共${pagination.total}条`;
  }
});
const columns = ref<DataTableColumn[]>([
  {
    title: '政策名称',
    key: 'name'
  },
  {
    title: '政策级别',
    key: 'level',
    render(row: any) {
      return h('span', {}, row.level_map[row.level]);
    }
  },
  {
    title: '归口部门',
    key: 'relate_depart',
    render(row: any) {
      return h('span', {}, row.relate_depart_map[row.relate_depart]);
    }
  },
  {
    title: '企业类型',
    key: 'entp_scale',
    render(row: any) {
      const tagsIndex = row.entp_scale.split('');
      const tags = tagsIndex.map((item: any) => {
        return (
          entpScaleOptions.value.find((tag: any) => tag.value === Number(item))
            ?.label || '无该选项'
        );
      });
      console.log(tags);
      const tagsHtml = tags.map((item: any) => {
        return h(
          NTag,
          {
            type: 'primary',
            size: 'small'
          },
          {
            default: () => item
          }
        );
      });
      return h(NSpace, {}, { default: () => tagsHtml });
    }
  },
  {
    title: '申报类型',
    key: 'declare_type',
    render(row: any) {
      return h('span', {}, row.declare_type_map[row.declare_type]);
    }
  },
  {
    title: '发布时间',
    key: 'pub_date',
    render(row: any) {
      return h('span', {}, row.pub_date || '无');
    }
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: '200',
    render(row) {
      return h(
        NSpace,
        {
          justify: 'center',
          align: 'center'
        },
        {
          default: () => {
            return [
              h(
                NButton,
                {
                  type: 'primary',
                  size: 'small',
                  onClick: () => {
                    editPolicy(row.uuid as string);
                  }
                },
                { default: () => '编辑' }
              ),
              h(
                NPopconfirm,
                {
                  placement: 'bottom',
                  onPositiveClick: () => {
                    deletePolicy(row.uuid as string);
                    handleQuery();
                  }
                },
                {
                  trigger: () => {
                    return h(
                      NButton,
                      {
                        type: 'warning',
                        size: 'small'
                      },
                      { default: () => '删除' }
                    );
                  },
                  default: () => {
                    return '确定要删除吗？';
                  }
                }
              )
            ];
          }
        }
      );
    }
  }
]);

// Table Data
async function queryData(params: any) {
  loading.value = true;
  try {
    const res: any = await getPolicy(params);
    console.log(res);
    data.value = res.items;
    pagination.total = res.count;
  } catch (err) {
    window.$message.error(JSON.stringify(err));
  } finally {
    loading.value = false;
  }
}

async function handlePageChange(page: number) {
  await queryData(queryParams);
  pagination.page = page;
}

onMounted(async () => {
  await queryData(queryParams);
});

// Query
async function handleQuery() {
  await queryData(queryParams);
}
async function resetQuery() {
  queryParams.name = null;
  queryParams.level = null;
  queryParams.relate_depart = null;
  queryParams.entp_scale = '';
  queryParams.declare_type = null;
  queryParams.type = null;
  await queryData(queryParams);
}

// Edit
async function editPolicy(uuid: string) {
  router.push({ name: 'PolicyManage_edit', params: { uuid } });
}

// create
function handleCreate() {
  router.push({ name: 'PolicyManage_add' });
}
</script>

<style scoped></style>
