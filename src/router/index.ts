import { createRouter, createWebHistory } from 'vue-router'
import { Storage } from '@/utils/Storage.ts';

export const routes = [
  { path: '/', name: 'Layout', redirect: '/login',},
  { path: '/dashboard/welcome', component: () => import('@/views/dashboard/welcome.vue')},
  { path: '/login', name: 'Login', component: () => import('@/views/login.vue')},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const token = Storage.get('ACCESS_TOKEN')
  if (token){
    if (to.path !== '/dashboard/welcome'){ 
      return {path: '/dashboard/welcome'} 
    } else {
      return true
    }
  } else { 

    if ('Login' === to.name) { 
      return true
    } else {
      // 非 Login 重定向，以参数形式携带
      return { name: 'Login', query: { redirect: to.fullPath }, replace: true } 
    }
  }
})

export default router



