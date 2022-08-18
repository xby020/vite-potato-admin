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
      const { role } = info;

      console.log(role);
      const isAdmin = role === 1 || 2;

      const routeFilter = (route: RouteRecordRaw) => {
        const { meta } = route;
        if (!meta || !meta.auth) {
          return true;
        }
        const hasPermission = isAdmin;
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
