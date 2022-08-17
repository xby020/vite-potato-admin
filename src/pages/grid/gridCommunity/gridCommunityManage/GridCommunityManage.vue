<template>
  <div class="w-full h-full">
    <page-data-table
      title="小区/村管理"
      :columns="columns"
      :query-params="queryParams"
      :query="getTableData"
      :delete="deleteVillage"
      :drawer="showDrawer"
      :drawer-mode="drawerMode"
      @drawer:switch="toggleDrawer"
    >
      <template #queryForm="{ query }">
        <!-- query form -->
        <n-form inline label-width="auto" label-placement="left">
          <n-form-item label="物业类型">
            <n-auto-complete
              v-model:value="queryInput"
              :options="asyncOptions"
              @update:value="debounceGetOptions"
            />
          </n-form-item>
          <n-form-item label="小区/村名称">
            <n-input v-model:value="queryParams.name" />
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
              <n-button type="success" size="medium" @click="AddVillage"
                >新增</n-button
              >
            </div>
          </n-form-item>
        </n-form>
      </template>

      <template #drawer>
        <CommunitySet
          v-if="drawerMode !== 'info'"
          :community="community"
          @finish="showDrawer = !showDrawer"
        />
        <CommunityInfo v-else :community="community" />
      </template>
    </page-data-table>
  </div>
</template>

<script setup lang="ts">
import {
  AutoCompleteOption,
  DataTableColumn,
  NButton,
  NPopconfirm,
  NSpace
} from 'naive-ui';
import { getVillages, deleteVillage, VillageResult } from '@/api/grid/village';
import { getProperty, getPropertyInfo } from '@/api/grid/property';
import { debounce } from 'lodash';
import CommunitySet from './components/CommunitySet.vue';
import CommunityInfo from './components/CommunityInfo.vue';

interface VillageRow extends VillageResult {
  [key: string]: any;
}

// Query
const queryInput = ref('');
const asyncOptions = ref<AutoCompleteOption[]>([]);
async function getOptions() {
  const { results } = await getProperty({
    page: 1,
    size: 9999,
    name: queryInput.value
  });
  console.log(results);
  asyncOptions.value = results.map(({ name, uuid }) => ({
    value: uuid,
    label: name,
    uuid
  }));
}
watch(asyncOptions, (v) => {
  queryParams.property = v[0]?.value || '';
});

// Set default
function handleSetDefault(refresh: () => void) {
  queryParams.property = '';
  queryInput.value = '';
  queryParams.name = '';
  refresh();
}

const debounceGetOptions = debounce(getOptions, 500);

// Table
const queryParams = reactive({
  name: '',
  property: ''
});
const columns = ref<DataTableColumn<VillageResult>[]>([
  {
    title: '小区/村名称',
    key: 'name'
  },
  {
    title: '物业名称/类型',
    key: 'property_name'
  },
  {
    title: '物业负责人',
    key: 'property_manager'
  },
  {
    title: '物业联系电话',
    key: 'property_phone'
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
                    editCommunity(row);
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
                    showInfo(row);
                  }
                },
                { default: () => '详情' }
              ),
              h(
                NPopconfirm,
                {
                  placement: 'bottom',
                  onPositiveClick: () => {
                    deleteVillage(row.uuid);
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

// Data
async function getTableData() {
  const villageRes = await getVillages(queryParams);
  const { results } = villageRes;
  const row = results.map(async (village) => {
    const row: VillageRow = { ...village };
    const propertyRes = await getPropertyInfo(village.property);
    row.property_name = propertyRes.name;
    row.property_manager = propertyRes.owner_name;
    row.property_phone = propertyRes.phone;
    return row;
  });
  const rows = await Promise.all(row);
  const data = { ...villageRes };
  data.results = rows;
  return data;
}

// Drawer
const showDrawer = ref(false);
const drawerMode = ref<'add' | 'edit' | 'info'>('add');
const toggleDrawer = (open: boolean) => {
  showDrawer.value = open;
};
// add
function AddVillage() {
  community.value = {} as VillageRow;
  drawerMode.value = 'add';
  showDrawer.value = true;
}
// update
const community = ref<VillageResult>();
function editCommunity(row: VillageResult) {
  community.value = row;
  drawerMode.value = 'edit';
  showDrawer.value = true;
}
// info
function showInfo(row: VillageResult) {
  community.value = row;
  drawerMode.value = 'info';
  showDrawer.value = true;
}
</script>

<style scoped></style>
