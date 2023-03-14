import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import EditPage from '../views/EditPage/EditPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
      alias: '/login'
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditPage
    },
  ]
})

export default router
