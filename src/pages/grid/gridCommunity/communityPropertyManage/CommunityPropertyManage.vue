<template>
  <n-card
    id="property-drawer-target"
    title="物业管理"
    size="medium"
    :segmented="{ content: true }"
    class="w-full h-full bg-light-50"
  >
    <!-- content -->
    <div class="w-full h-full flex flex-col">
      <!-- query form -->
      <n-form inline label-width="auto" label-placement="left">
        <n-form-item label="物业名称">
          <n-input v-model:value="queryParams.name" />
        </n-form-item>
        <n-form-item label="负责人">
          <n-input v-model:value="queryParams.owner_name" />
        </n-form-item>
        <n-form-item>
          <div class="flex gap-2">
            <n-button type="default" size="medium" @click="handleSetDefault">
              <n-icon size="24">
                <i-mdi-delete></i-mdi-delete>
              </n-icon>
            </n-button>

            <n-button type="info" size="medium" @click="queryData"
              >查询</n-button
            >
            <n-button type="success" size="medium" @click="handleAddProperty"
              >新增</n-button
            >
          </div>
        </n-form-item>
      </n-form>

      <!-- table -->
      <n-data-table
        class="w-full flex-auto"
        flex-height
        remote
        ref="table"
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
      ></n-data-table>
    </div>

    <!-- drawer -->
    <n-drawer
      v-model:show="showDrawer"
      :width="600"
      placement="right"
      :trap-focus="false"
      :block-scroll="false"
      :mask-closable="!showAddDrawer"
      to="#property-drawer-target"
    >
      <n-drawer-content class="relative">
        <!-- Close btn -->
        <n-button
          text
          circle
          size="medium"
          @click="showDrawer = !showDrawer"
          class="absolute right-6 top-4"
          v-if="!showAddDrawer"
        >
          <n-icon size="32">
            <i-mdi-close></i-mdi-close>
          </n-icon>
        </n-button>
        <!-- add close warning btn -->
        <n-popconfirm
          placement="bottom"
          @positive-click="showDrawer = !showDrawer"
          v-else
        >
          <template #trigger>
            <n-button
              type="warning"
              size="medium"
              class="absolute right-6 top-4"
            >
              返回
            </n-button>
          </template>
          所有填写的内容都会丢失，确定要返回吗？
        </n-popconfirm>

        <!-- content -->
        <!-- Set -->
        <PropertySet
          v-if="showAddDrawer"
          :add="addInfo ? false : true"
          :property="addInfo"
          @finish="refresh"
        />
        <!-- Info -->
        <PropertyInfo
          v-if="!showAddDrawer && selectProperty"
          :property="selectProperty"
        />
      </n-drawer-content>
    </n-drawer>
  </n-card>
</template>

<script setup lang="ts">
import {
  deleteProperty,
  getProperty,
  Property,
  QueryPropertyParams
} from '@/api/grid/property';
import { DataTableColumns, NButton, NPopconfirm, NSpace } from 'naive-ui';
import PropertySet from './PropertySet.vue';
import PropertyInfo from './PropertyInfo.vue';
import { sleep } from '@antfu/utils';

// query
const queryParams = reactive({
  name: '',
  owner_name: ''
});

// table
const columns = ref<DataTableColumns<Property>>([
  {
    title: '名称',
    key: 'name',
    align: 'left'
  },
  {
    title: '物业负责人',
    key: 'owner_name',
    align: 'center'
  },
  {
    title: '联系电话',
    key: 'phone',
    align: 'center'
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
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
                    editProperty(row);
                  }
                },
                { default: () => '编辑' }
              ),
              h(
                NButton,
                {
                  type: 'info',
                  size: 'small',
                  onClick: () => {
                    selectPropertyChange(row);
                  }
                },
                { default: () => '详情' }
              ),
              h(
                NPopconfirm,
                {
                  placement: 'bottom',
                  onPositiveClick: () => {
                    handleDeleteProperty(row);
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
                    return '确定要删除该物业吗？';
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

const data = ref<Property[]>([]);

const loading = ref(true);

const count = ref(0);

const pagination = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix() {
    return `共${count.value}条`;
  }
});

// data
async function getPropertyData(params: QueryPropertyParams) {
  loading.value = true;
  const res = await getProperty(params);
  data.value = res.results;
  count.value = res.count;
  pagination.pageCount = Math.ceil(res.count / pagination.pageSize);
  loading.value = false;
}

async function handlePageChange(currentPage: number) {
  await getPropertyData({
    page: currentPage,
    size: pagination.pageSize,
    ...queryParams
  });
  pagination.page = currentPage;
}

async function queryData() {
  await getPropertyData({
    page: 1,
    size: pagination.pageSize,
    ...queryParams
  });
}

async function handleDeleteProperty(row: Property) {
  await deleteProperty(row.uuid);
  await queryData();
}

async function handleSetDefault() {
  queryParams.name = '';
  queryParams.owner_name = '';
  await queryData();
}

onMounted(async () => {
  await getPropertyData({ page: 1, size: pagination.pageSize, ...queryParams });
});

// drawer
const showDrawer = ref(false);
function refresh() {
  showDrawer.value = false;
  queryData();
}
// info drawer
const selectProperty = ref<Property>();
function selectPropertyChange(property: Property) {
  selectProperty.value = property;
  showDrawer.value = true;
  showAddDrawer.value = false;
}

// add drawer
const showAddDrawer = ref(false);
const addInfo = ref<Property>();
function editProperty(property: Property) {
  addInfo.value = property;
  showAddDrawer.value = true;
  showDrawer.value = true;
}
function handleAddProperty() {
  addInfo.value = {} as Property;
  showAddDrawer.value = true;
  showDrawer.value = true;
}
</script>

<style scoped></style>
