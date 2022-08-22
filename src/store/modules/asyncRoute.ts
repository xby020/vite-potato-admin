import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { asyncRouteList } from '@/router';
import { useUserStore } from './user';

export interface AsyncRoute {
  accessRoutes: RouteRecordRaw[];
  isAdded: boolean;
}

export const useAsyncRoute = defineStore({
  id: 'app-async-route',
  state: (): AsyncRoute => ({
    accessRoutes: [],
    isAdded: false
  }),
  getters: {},
  actions: {
    generateAsyncRoute() {
      const userStore = useUserStore();

      const { info } = userStore;

      // 判断是否具有全局管理员权限，如果有，则不需要进行权限判断
      const isAdmin = () => true;

      const routeFilter = (route: RouteRecordRaw) => {
        const { meta } = route;
        // 路由不需要权限验证
        if (!meta || !meta.auth) {
          return true;
        }
        // 权限验证
        const hasPermission = isAdmin();
        return hasPermission;
      };

      const routeListFliter = (routeList: RouteRecordRaw[]) => {
        return routeList
          .filter((item) => {
            return routeFilter(item);
          })
          .map((item) => {
            item = Object.assign({}, item);
            if (item.children) {
              item.children = routeListFliter(item.children);
            }
            return item;
          });
      };

      this.accessRoutes = routeListFliter(asyncRouteList);
      this.isAdded = true;
      return this.accessRoutes;
    }
  }
});
