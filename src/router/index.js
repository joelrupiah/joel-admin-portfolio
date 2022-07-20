import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: () => import('../components/pages/Dashboard.vue')
    },
    {
      path: '/categories',
      name: 'Category',
      component: () => import('../components/pages/Category.vue')
    },
  ]
})

export default router
