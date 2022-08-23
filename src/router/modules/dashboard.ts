import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/data',
    meta: {
      title: '主页',
      icon: markRaw(IconMdiViewDashboard),
      sort: 1,
      auth: true
    },
    children: [
      {
        path: 'data',
        name: 'Dashboard_data',
        component: () => import('@pages/dashboard/Dashboard.vue'),
        meta: {
          title: '数据看板',
          icon: markRaw(IconFluentDataBarVertical20Filled)
        }
      },
      {
        path: 'table',
        name: 'Dashboard_table',
        component: () => import('@pages/dashboard/DashboardTable.vue'),
        meta: {
          title: '数据表格',
          icon: markRaw(IconFaTable)
        },
        children: [
          {
            path: 'table-1',
            name: 'Dashboard_table_1',
            component: () => import('@pages/dashboard/DashboardTable1.vue'),
            meta: {
              title: '表格1',
              icon: markRaw(IconFaTable)
            }
          },
          {
            path: 'table-2',
            name: 'Dashboard_table_2',
            component: () => import('@pages/dashboard/DashboardTable2.vue'),
            meta: {
              title: '表格1',
              icon: markRaw(IconFaTable)
            }
          }
        ]
      }
    ]
  }
];

export default routes;
