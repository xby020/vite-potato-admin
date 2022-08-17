<template>
  <page-data-table
    ref="dataTable"
    title="设施管理"
    :columns="columns"
    :query="getFacility"
    :delete="deleteFacility"
    :drawer="drawer"
    :drawerMode="drawerMode"
    :queryParams="queryParams"
    @drawer:switch="toggleDrawer"
  >
    <!-- Query -->
    <template #queryForm="{ query }">
      <n-form inline size="medium" label-placement="left">
        <n-form-item label="部件名称">
          <n-input v-model:value="queryParams.name" />
        </n-form-item>
        <n-form-item label="部件类型">
          <n-select
            v-model:value="queryParams.item_type"
            filterable
            placeholder="请选择"
            :options="options"
          />
        </n-form-item>
        <n-form-item>
          <div class="flex gap-2">
            <n-button
              type="default"
              size="medium"
              @click="handleSetDefault(query)"
            >
              <n-icon size="24">
                <i-mdi-delete></i-mdi-delete>
              </n-icon>
            </n-button>

            <n-button type="info" size="medium" @click="query">查询</n-button>
            <n-button type="success" size="medium" @click="handleAddFacility"
              >新增</n-button
            >
          </div>
        </n-form-item>
      </n-form>
    </template>

    <!-- Drawer -->
    <template #drawer>
      <FacilityInfo v-if="drawerMode === 'info'" :info="infoFacility" />

      <FacilitySet v-else :info="editFacility" />
    </template>
  </page-data-table>
</template>

<script setup lang="ts">
import {
  getFacility,
  deleteFacility,
  FacilityQueryParams,
  FacilityResult,
  getFacilityType
} from '@/api/grid/facilify';
import {
  AutoCompleteOption,
  DataTableColumn,
  NButton,
  NPopconfirm,
  NSpace
} from 'naive-ui';
import FacilitySet from './components/FacilitySet.vue';
import FacilityInfo from './components/FacilityInfo.vue';

// Query
const queryParams = reactive<FacilityQueryParams>({
  name: '',
  item_type: ''
});
const options = ref<AutoCompleteOption[]>([]);
const queryLoading = ref(false);
async function getOptions() {
  queryLoading.value = true;
  const res = await getFacilityType();
  options.value = res.results.map((item) => ({
    value: item.uuid,
    label: item.name
  }));
  queryLoading.value = false;
}
onMounted(() => {
  getOptions();
});
// set query default
function handleSetDefault(query: () => void) {
  queryParams.name = '';
  queryParams.item_type = '';
  query();
}

// Table
const dataTable = ref();
const columns = ref<DataTableColumn<FacilityResult>[]>([
  {
    title: '编号',
    key: 'no',
    align: 'center',
    width: '100px',
    render(row) {
      return h('span', row.no || '-');
    }
  },
  {
    title: '所属网格',
    key: 'grid_name'
  },
  {
    title: '部件名称',
    key: 'item_name'
  },
  {
    title: '部件类型',
    key: 'item_type_name'
  },
  {
    title: '是否标记',
    key: 'longitude'
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
                    handleEditFacility(row);
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
                    handleShowInfo(row);
                  }
                },
                { default: () => '详情' }
              ),
              h(
                NPopconfirm,
                {
                  placement: 'bottom',
                  onPositiveClick: () => {
                    handleDeleteFacility(row);
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

// Drawer
const drawer = ref(false);
const drawerMode = ref<'add' | 'edit' | 'info'>('add');
function toggleDrawer(open: boolean) {
  drawer.value = open;
}

// Add
async function handleAddFacility() {
  drawerMode.value = 'add';
  drawer.value = true;
}

// edit
const editFacility = ref<FacilityResult>();
async function handleEditFacility(row: FacilityResult) {
  editFacility.value = row;
  drawerMode.value = 'edit';
  drawer.value = true;
}

// delete
async function handleDeleteFacility(row: FacilityResult) {
  await deleteFacility(row.uuid);
  dataTable.value.query();
}

// info
const infoFacility = ref<FacilityResult>();
async function handleShowInfo(row: FacilityResult) {
  infoFacility.value = row;
  drawerMode.value = 'info';
  drawer.value = true;
}
</script>

<style scoped></style>
