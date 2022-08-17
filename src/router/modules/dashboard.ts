import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import MdiViewDashboard from '~icons/mdi/view-dashboard';
import MdiHome from '~icons/mdi/home';
import BiFileEarmarkMedicalFill from '~icons/bi/file-earmark-medical-fill';
import MdiFileSearch from '~icons/mdi/file-search';
import FluentBookAdd24Filled from '~icons/fluent/book-add-24-filled';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: {
      sort: 1,
      title: '主页',
      isRoot: true,
      activeMenu: 'dashboard',
      icon: markRaw(MdiViewDashboard),
      auth: true
    },
    children: [
      {
        path: 'index',
        name: 'Dashboard_index',
        meta: {
          sort: 1,
          title: '工作台',
          auth: true,
          icon: markRaw(MdiHome)
        },
        component: () => import('@pages/dashboard/Dashboard.vue')
      },
      {
        path: 'PolicyManage',
        name: 'PolicyManage',
        meta: {
          sort: 2,
          title: '政策管理',
          auth: true,
          icon: markRaw(BiFileEarmarkMedicalFill)
        },
        children: [
          {
            path: 'add',
            name: 'PolicyManage_add',
            meta: {
              sort: 1,
              title: '新增政策',
              auth: true,
              icon: markRaw(FluentBookAdd24Filled)
            },
            component: () =>
              import('@pages/dashboard/PolicyManage/PolicyManage.vue')
          }
        ]
      },
      {
        path: 'ExplainationManage',
        name: 'ExplainationManage',
        meta: {
          sort: 2,
          title: '政策解读管理',
          auth: true,
          icon: markRaw(MdiFileSearch)
        },
        component: () =>
          import('@pages/dashboard/ExplainationManage/ExplainationManage.vue')
      }
    ]
  }
];

export default routes;
