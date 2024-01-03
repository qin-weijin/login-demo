import { createRouter, createWebHistory } from 'vue-router'
import { Storage } from '@/store/user.ts';

export const routes = [
  { path: '/', redirect: '/login',},
  { path: '/dashboard/welcome', component: () => import('@/views/dashboard/welcome.vue')},
  { path: '/login', component: () => import('@/views/login.vue')},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {

  const token = Storage.get('ACCESS_TOKEN')

  if (token) {
    // 已登录，将登录页导航到首页
    if (to.name === 'Login') { 
      next({ path: '/dashboard/welcome' }) 
    } else { next({ path: '/dashboard/welcome' }) }
  } else {
    next({ name: 'Login', query: { redirect: to.fullPath }, replace: true });
  }
})

export default router
