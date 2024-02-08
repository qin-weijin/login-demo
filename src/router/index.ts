import { createRouter, createWebHistory } from 'vue-router'
import { Storage } from '@/utils/Storage.ts';

export const routes = [
  // { path: '/', name: 'Layout', redirect: '/login',},
  { path: '/', name: 'Login', component: () => import('@/views/login.vue')},
  { path: '/dashboard/welcome', name: 'Welcome', component: () => import('@/views/dashboard/welcome.vue')},
  // { path: '/login', name: 'Login', component: () => import('@/views/login.vue')},
]

export const router = createRouter({
  history: createWebHistory('/login-demo/'),
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
      return { name: 'Login', query: { redirect: to.fullPath }, replace: true } 
    }
  }
})

export default router



