import { defineStore } from 'pinia';

export interface SystemStore {
  isExtend: boolean;
}

export const useSystemStore = defineStore({
  id: 'app-system',
  state: (): SystemStore => ({
    isExtend: true
  }),
  getters: {},
  actions: {
    toggleExtend() {
      this.isExtend = !this.isExtend;
    }
  }
});
