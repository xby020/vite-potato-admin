<template>
  <n-card
    id="drawer-target"
    :title="title"
    size="medium"
    :segmented="{ content: true }"
    class="w-full h-full bg-light-50"
  >
    <!-- content -->
    <div class="w-full h-full flex flex-col">
      <!-- query form -->
      <div class="w-full">
        <slot name="queryForm" :query="getTableData"></slot>
      </div>

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
      to="#drawer-target"
      :mask-closable="drawerMode === 'info'"
    >
      <n-drawer-content class="relative">
        <!-- Close btn -->
        <n-button
          text
          circle
          size="medium"
          @click="showDrawer = !showDrawer"
          class="absolute right-6 top-4"
          v-if="drawerMode === 'info'"
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
          确定要返回吗？
        </n-popconfirm>

        <!-- content -->
        <slot name="drawer"></slot>
      </n-drawer-content>
    </n-drawer>
  </n-card>
</template>

<script setup lang="ts">
import { DataTableColumn } from 'naive-ui';

interface Props {
  title: string;
  columns: DataTableColumn<any>[];
  query: (params: any) => Promise<any>;
  delete: (uuid: string) => Promise<any>;
  drawer: boolean;
  drawerMode: 'add' | 'edit' | 'info';
  queryParams: {
    [key: string]: any;
  };
}

const props = defineProps<Props>();

// Table
const data = ref();
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

// table functions

/**
 * @description 查询数据
 *
 * @param {object} params  查询字段
 */
async function getTableData(params?: object) {
  loading.value = true;
  const queryParams = {
    ...props.queryParams,
    ...params
  };
  try {
    const res = await props.query(queryParams);
    data.value = res.results;
    count.value = res.count;
    pagination.pageCount = Math.ceil(res.count / pagination.pageSize);
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}

/**
 * @description 分页改变
 * @param {number} page  当前页码
 */
async function handlePageChange(currentPage: number) {
  await getTableData({
    page: currentPage,
    size: pagination.pageSize,
    ...props.queryParams
  });
  pagination.page = currentPage;
}

/**
 * @description 查询数据
 *
 */
async function queryData() {
  await getTableData({
    page: 1,
    size: pagination.pageSize,
    ...props.queryParams
  });
}

/**
 * @description 删除数据
 * @param {string} uuid  删除字段
 *
 */
async function handleDelete(uuid: string) {
  await props.delete(uuid);
  await queryData();
}

onMounted(async () => {
  await getTableData({
    page: 1,
    size: pagination.pageSize,
    ...props.queryParams
  });
});

// Drawer
const showDrawer = computed({
  get() {
    return props.drawer;
  },
  set(val) {
    emits('drawer:switch', val);
  }
});
const emits = defineEmits<{
  (e: 'drawer:switch', open: boolean): void;
}>();
const maskCloseable = ref(true);
</script>

<style scoped></style>
