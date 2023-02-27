import { createRouter, createWebHashHistory ,RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router