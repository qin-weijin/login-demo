import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
import 'virtual:uno.css'
import { createPinia } from 'pinia'

import { setupProdMockServer } from './mock-prod-server';
setupProdMockServer();

const app = createApp(App)
app.config.productionTip = false
app.use(router)
app.use(createPinia())
app.mount('#app')



















