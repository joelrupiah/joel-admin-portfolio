import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register-me',
      name: 'Register',
      component: () => import('../components/pages/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/pages/Login.vue')
    },
    {
      path: '/',
      name: 'DashBoard',
      component: () => import('../components/pages/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/categories',
      name: 'Category',
      component: () => import('../components/pages/Category.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

export default router
