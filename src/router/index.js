import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/binders',
      name: 'binders',
      component: () => import('../views/BindersView.vue')
    },
    {
      path: '/binder/random',
      name: 'randomBinder',
      component: () => import('../views/OpenBinder.vue'),
      props: { isRandom: true }
    },
    {
      path: '/binders/:id',
      name: 'openBinder',
      component: () => import('../views/OpenBinder.vue'),
      props: true
    },
    {
      path: '/card/random',
      name: 'randomCard',
      component: () => import('../views/SingleCard.vue'),
      props: { isRandom: true }
    },
    {
      path: '/cards/:cardId',
      name: 'card',
      component: () => import('../views/SingleCard.vue'),
      props: true
    },
    {
      path: '/card-catalog',
      name: 'cardCatalog',
      component: () => import('../views/CardCatalog.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterUser.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginUser.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  // Redirect to login if not authenticated
  // if (to.name !== 'login' && !useAuthStore().checkToken()) {
  //   return next({ name: 'login' })
  // }

  await authStore.checkToken()

  next()
})

export default router
