import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Main.vue')
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('@/components/Modal/Member/SignUpModal.vue')
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: () => import('@/components/Modal/Member/SignInModal.vue')
    },
    {
      path: '/Board',
      name: 'Board',
      component: () => import('@/components/Board/List.vue')
    },
    {
      path: '/Board/Register',
      name: 'Register',
      component: () => import('@/components/Board/Register.vue')
    },
    {
      path: '/Board/_id',
      name: 'BoardInfor',
      component: () => import('@/components/Board/BoardInfor.vue')
    },
  ]
})

export default router