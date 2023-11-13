import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/child_list',
    name: 'child_list',
    component: Layout,
    redirect: '/child_list/one',
    meta: {
      title: '列表测试超级超级超级长',
      icon: markRaw(IconMdiViewDashboard),
      sort: 1,
      auth: true,
    },
    children: [
      {
        path: 'one',
        name: 'child_list_one',
        component: () => import('@pages/List/ListFirst.vue'),
        meta: {
          title: '列表1',
          icon: markRaw(IconFluentDataBarVertical20Filled),
        },
      },
      {
        path: 'two',
        name: 'child_list_two',
        component: () => import('@pages/List/ListSecond1.vue'),
        meta: {
          title: '列表2',
          icon: markRaw(IconFaTable),
        },
        children: [
          {
            path: 'two_one',
            name: 'child_list_two_one',
            component: () => import('@pages/List/ListSecond2.vue'),
            meta: {
              title: '列表2-1',
              icon: markRaw(IconFaTable),
            },
          },
        ],
      },
    ],
  },
];

export default routes;
