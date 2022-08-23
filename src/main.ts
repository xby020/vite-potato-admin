import { createApp } from 'vue';
import 'virtual:windi.css';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from './store';
import { setupHead } from './utils/head';
import { setupDerictives } from './directives';

const app = createApp(App);

async function setupAPP() {
  // 挂载 vueuse/head
  setupHead(app);

  // 挂载 store
  setupStore(app);

  // 挂载路由
  setupRouter(app);

  // 挂载 directives
  setupDerictives(app);

  await router.isReady();

  app.mount('#app');
}

setupAPP();
