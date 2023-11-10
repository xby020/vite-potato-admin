import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/list',
    name: 'List',
    component: Layout,
    redirect: '/list/one',
    meta: {
      title: '列表',
      icon: markRaw(IconMdiViewDashboard),
      sort: 1,
      auth: true,
    },
    children: [
      {
        path: 'one',
        name: 'list_one',
        component: () => import('@pages/List/ListFirst.vue'),
        meta: {
          title: '列表1',
          icon: markRaw(IconFluentDataBarVertical20Filled),
        },
      },
      {
        path: 'two',
        name: 'list_two',
        component: () => import('@pages/List/ListSecond1.vue'),
        meta: {
          title: '列表2',
          icon: markRaw(IconFaTable),
        },
        children: [
          {
            path: 'two_one',
            name: 'list_two_one',
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
]

export default routes
