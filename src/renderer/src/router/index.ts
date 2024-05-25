// 引入createRouter
import { createRouter, createWebHashHistory } from 'vue-router'

// 创建
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@renderer/pages/Home.vue')
    },
    {
      path: '/peizhi',
      component: () => import('@renderer/pages/Para.vue')
    },

    {
      path: '/',
      redirect: '/home'
    }
  ]
})

// 暴露出去
export default router
