<template>
  <div class="relative w-full h-full flex flex-col bg-light-50 rounded-md p-4">
    <div
      class="absolute top-0 left-0 w-full h-16 flex justify-between items-center p-4"
    >
      <!-- title -->
      <h1 class="text-lg">
        {{ route.meta.title }}
      </h1>
    </div>

    <!-- Query -->
    <div class="w-full mt-18 px-4">
      <n-form label-placement="left" :inline="true" size="medium">
        <n-form-item label="政策名称">
          <n-input v-model:value="queryParams.policy_name" />
        </n-form-item>
        <n-form-item label="部门">
          <n-select
            v-model:value="queryParams.depart"
            size="medium"
            :options="relateDepartOptions"
            clearable
            class="w-120px"
          />
        </n-form-item>
        <n-form-item label="企业规模">
          <n-select
            v-model:value="queryParams.entp_scale"
            size="medium"
            :options="entpScaleOptions"
            clearable
            class="w-120px"
          />
        </n-form-item>
        <n-form-item label="行业类型">
          <n-select
            v-model:value="queryParams.label_uuid"
            size="medium"
            :options="labelOptions"
            clearable
            class="w-120px"
          />
        </n-form-item>
        <n-form-item label="企业名称">
          <n-input v-model:value="queryParams.entp_name" />
        </n-form-item>
        <n-form-item label="政策级别">
          <!-- action -->
          <div class="flex gap-2">
            <n-button type="info" size="medium" @click="handleQuery"
              >查询</n-button
            >
            <n-button type="default" size="medium" @click="resetQuery"
              >重置</n-button
            >
          </div>
        </n-form-item>
      </n-form>
    </div>

    <!-- Table -->
    <div class="w-full flex justify-between items-center my-2 px-4">
      <h1 class="text-lg font-semibold">政策兑换列表</h1>
      <n-button type="info" size="large" @click="handleAddPolicyFunds">
        <n-icon size="24">
          <i-mdi-plus></i-mdi-plus>
        </n-icon>
        新增
      </n-button>
    </div>
    <div class="w-full flex-auto">
      <n-data-table
        class="w-full h-full"
        flex-height
        remote
        ref="table"
        :data="data"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLabels } from '@/api/policy/policy';
import {
  PolicyFunds,
  PolicyFundsItem,
  PolicyFundsQueryParams,
  getPolicyFunds,
  deletePolicyFunds
} from '@/api/policy/policyFunds';
import { DataTableColumn, NButton, NPopconfirm, NSpace, NTag } from 'naive-ui';
import { relateDepartOptions, entpScaleOptions } from './PolicyFundsOptions';
const route = useRoute();
const router = useRouter();

const queryParams = reactive({
  policy_name: '',
  depart: null as number | null,
  label_uuid: '',
  entp_scale: null as number | null,
  entp_name: ''
});
const labels = ref<any[]>([]);
const labelOptions = ref<any[]>([]);
onMounted(async () => {
  labels.value = await getLabels();
  labels.value.forEach((label: any) => {
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

// Table
const data = ref<PolicyFundsItem[]>([]);
const loading = ref(false);
const pagination = reactive({
  current: 1,
  pageSize: 10,
  pageCount: 1,
  total: 0,
  prefix() {
    return `共 ${pagination.total}`;
  }
});
const columns = ref<DataTableColumn<PolicyFundsItem>[]>([
  {
    title: '政策信息',
    key: 'policy_name'
  },
  {
    title: '企业规模',
    key: 'entp_scale',
    render(row) {
      return h(
        NTag,
        { type: 'success', size: 'small' },
        {
          default: () => row.entp_scale_map[row.entp_scale]
        }
      );
    }
  },
  {
    title: '行业类型',
    key: 'label',
    render(row) {
      return h(
        NTag,
        { type: 'success', size: 'small' },
        {
          default: () => {
            if (labels.value.length !== 0) {
              const label = labels.value.find(
                (item) => item.uuid === row.label_uuid
              );
              return label.name;
            } else {
              return '';
            }
          }
        }
      );
    }
  },
  {
    title: '企业名称',
    key: 'entp_name'
  },
  {
    title: '部门',
    key: 'depart',
    render(row) {
      return h('span', {}, row.depart_map[row.depart]);
    }
  },
  {
    title: '发放金额(万元)',
    key: 'amount'
  },
  {
    title: '发放时间',
    key: 'pay_date'
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
                    handleEditPolicyFunds(row.uuid);
                  }
                },
                { default: () => '编辑' }
              ),
              h(
                NPopconfirm,
                {
                  placement: 'bottom',
                  onPositiveClick: () => {
                    handleDeletePolidyFund(row.uuid);
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

async function queryPolicyFunds(params: any) {
  loading.value = true;
  try {
    const res = await getPolicyFunds(params);
    console.log(res);
    data.value = res.items;
    pagination.total = res.count;
    pagination.pageCount = Math.ceil(res.count / pagination.pageSize);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function handleQuery() {
  queryPolicyFunds(queryParams);
}
async function resetQuery() {
  queryParams.policy_name = '';
  queryParams.depart = null;
  queryParams.label_uuid = '';
  queryParams.entp_scale = null;
  queryParams.entp_name = '';
  queryPolicyFunds(queryParams);
}

async function handlePageChange(page: number) {
  pagination.current = page;
  queryPolicyFunds(queryParams);
}

onMounted(async () => {
  await handleQuery();
});

// Delete
async function handleDeletePolidyFund(uuid: string) {
  await deletePolicyFunds(uuid);
  await handleQuery();
}

// Edit
async function handleEditPolicyFunds(uuid: string) {
  router.push({
    name: 'PolicyFunds_edit',
    params: {
      uuid
    }
  });
}

// Add
async function handleAddPolicyFunds() {
  router.push({
    name: 'PolicyFunds_add'
  });
}
</script>

<style scoped></style>
