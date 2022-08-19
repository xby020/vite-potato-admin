import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import MdiViewDashboard from '~icons/mdi/view-dashboard';
import MdiHome from '~icons/mdi/home';
import BiFileEarmarkMedicalFill from '~icons/bi/file-earmark-medical-fill';
import MdiFileSearch from '~icons/mdi/file-search';
import FluentBookAdd24Filled from '~icons/fluent/book-add-24-filled';
import FluentMoney16Filled from '~icons/fluent/money-16-filled';
import FluentMoneyCalculator20Filled from '~icons/fluent/money-calculator-20-filled';
import FluentMoneyHand24Filled from '~icons/fluent/money-hand-24-filled';
import FluentMoneySettings20Filled from '~icons/fluent/money-settings-20-filled';

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
        redirect: 'PolicyManage/PolicyList',
        meta: {
          sort: 2,
          title: '政策管理',
          auth: true,
          notPage: true,
          icon: markRaw(BiFileEarmarkMedicalFill)
        },
        children: [
          {
            path: 'PolicyManage_list',
            name: 'PolicyManage_list',
            component: () =>
              import('@pages/dashboard/PolicyManage/PolicyManage.vue'),
            meta: {
              sort: 1,
              title: '政策列表',
              auth: true,
              icon: markRaw(BiFileEarmarkMedicalFill)
            }
          },
          {
            path: 'add',
            name: 'PolicyManage_add',
            component: () =>
              import('@pages/dashboard/PolicyManage/PolicyAdd/PolicyAdd.vue'),
            meta: {
              sort: 2,
              title: '新增政策',
              hide: false,
              auth: true,
              icon: markRaw(FluentBookAdd24Filled)
            }
          },
          {
            path: 'edit',
            name: 'PolicyManage_edit',
            component: () =>
              import('@pages/dashboard/PolicyManage/PolicyAdd/PolicyEdit.vue'),
            meta: {
              sort: 2,
              title: '修改政策',
              hide: true,
              auth: true,
              icon: markRaw(FluentBookAdd24Filled)
            }
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
        children: [
          {
            path: 'Explaination_list',
            name: 'Explaination_list',
            component: () =>
              import(
                '@pages/dashboard/ExplainationManage/ExplainationManage.vue'
              ),
            meta: {
              sort: 1,
              title: '政策解读列表',
              auth: true,
              icon: markRaw(BiFileEarmarkMedicalFill)
            }
          },
          {
            path: 'add',
            name: 'Explaination_add',
            component: () =>
              import(
                '@pages/dashboard/ExplainationManage/ExplainationAdd/ExplainationAdd.vue'
              ),
            meta: {
              sort: 2,
              title: '新增政策解读',
              hide: false,
              auth: true,
              icon: markRaw(FluentBookAdd24Filled)
            }
          },
          {
            path: 'edit',
            name: 'Explaination_edit',
            component: () =>
              import(
                '@pages/dashboard/ExplainationManage/ExplainationAdd/ExplainationEdit.vue'
              ),
            meta: {
              sort: 2,
              title: '修改政策解读',
              hide: true,
              auth: true,
              icon: markRaw(FluentBookAdd24Filled)
            }
          }
        ]
      },
      {
        path: 'PolicyFunds',
        name: 'PolicyFunds',
        meta: {
          sort: 3,
          title: '政策兑换资金管理',
          hide: false,
          auth: true,
          icon: markRaw(FluentMoney16Filled)
        },
        children: [
          {
            path: 'PolicyFunds_list',
            name: 'PolicyFunds_list',
            component: () =>
              import('@pages/dashboard/PolicyFunds/PolicyFunds.vue'),
            meta: {
              sort: 1,
              title: '政策兑换资金列表',
              hide: false,
              auth: true,
              icon: markRaw(FluentMoneyCalculator20Filled)
            }
          },
          {
            path: 'add',
            name: 'PolicyFunds_add',
            component: () =>
              import('@pages/dashboard/PolicyFunds/PolicyFundsAdd.vue'),
            meta: {
              sort: 2,
              title: '新增政策兑换资金',
              hide: false,
              auth: true,
              icon: markRaw(FluentMoneyHand24Filled)
            }
          },
          {
            path: 'edit',
            name: 'PolicyFunds_edit',
            component: () =>
              import('@pages/dashboard/PolicyFunds/PolicyFundsEdit.vue'),
            meta: {
              sort: 3,
              title: '修改政策兑换资金',
              hide: true,
              auth: true,
              icon: markRaw(FluentMoneySettings20Filled)
            }
          }
        ]
      }
    ]
  }
];

export default routes;
