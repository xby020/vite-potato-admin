import { defineStore } from 'pinia';

export interface ConfigState {
  topRouteMenu: boolean;
}

export const useConfigStore = defineStore({
  id: 'config',
  state: () => ({
    topRouteMenu: false,
  }),
  getters: {},
  actions: {},
});
