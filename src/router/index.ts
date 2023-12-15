import { createRouter, createWebHashHistory } from 'vue-router';

import { createRouterGuards } from './router-guards';
import { LOGIN_NAME } from '@/router/constant';
import { whiteNameList } from './constant';

import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';


/**
 * 定义路由对象
 * '/dashboard/welcome' - 首页 - '@/layout/index.vue'
 * '/login' - 登录 - '@/views/login/index.vue'
*/
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard/welcome',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    meta: { title: '首页' },
    children: [],
  },
  {
    path: '/login',
    name: LOGIN_NAME,
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { title: '登录', },
  }
];
/**
 * 创建路由
*/
export const router = createRouter({
  history: createWebHashHistory(''),
  routes,
})
/**
 * 在 main.ts 中调用，初始化路由
 * 创建导航守卫
 * 挂载路由
*/
export async function setupRouter(app: App) {
  createRouterGuards(router, whiteNameList);
  app.use(router);
  await router.isReady();
}
export default router;