import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue'),
    },
    {
      path: '/',
      redirect: '/login', // 預設導向 login
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: () => import('../views/TodoList.vue'),
    },
  ],
})

export default router
