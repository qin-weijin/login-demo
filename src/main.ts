import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router';

const app = createApp(App);
async function setupApp() {
  await setupRouter(app)      // 初始化路由
  app.mount('#app');
}
setupApp();
