import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect: '/login',
      component: () => import('@/layout/index.vue'),
      meta: {title: '首页'},
      children: [],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( '@/views/login/index.vue'),
    }
  ]
})
export default router
