import { PageEnum } from '@/enums/pageEnum';
import { defineStore } from 'pinia';
import { RouteMeta, RouteRecordRaw } from 'vue-router';

export type RouteRecord = {
  path: RouteRecordRaw['path'];
  name: RouteRecordRaw['name'];
  meta: RouteMeta;
};

export interface TabsStore {
  tabs: RouteRecord[];
  currentTab?: RouteRecord | null;
}

export const useTabsStore = defineStore({
  id: 'app-tabs',
  state: (): TabsStore => ({
    tabs: [],
    currentTab: null
  }),
  getters: {},
  actions: {
    addTab(tab: RouteRecord) {
      if (tab.path !== PageEnum.BASE_HOME) {
        const hasTab =
          this.tabs.findIndex((curTab) => {
            return curTab.name === tab.name;
          }) !== -1;
        if (!hasTab) {
          if (!tab.meta.hide) {
            this.tabs.push(tab);
          }
        }
      }
    },
    removeTab(tabName: RouteRecord['name']) {
      this.tabs = this.tabs.filter((item) => item.name !== tabName);
    }
  }
});
