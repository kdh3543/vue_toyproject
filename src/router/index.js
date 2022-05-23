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
      component: () => import('@/pages/Board/List.vue')
    },
    {
      path: '/Board/Register',
      name: 'Register',
      component: () => import('@/pages/Board/Register.vue')
    },
    {
      path: '/Board/_id',
      name: 'BoardInfor',
      component: () => import('@/pages/Board/BoardInfor.vue')
    }
  ]
})

export default router