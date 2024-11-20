import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authGuard } from '@auth0/auth0-vue'
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
      path: '/binder/create',
      name: 'createBinder',
      component: () => import('../views/CreateBinder.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/binder/:binderId/edit',
      name: 'editBinder',
      component: () => import('../views/CreateBinder.vue'),
      props: true,
      beforeEnter: authGuard
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  // Redirect to login if not authenticated
  // if (to.name !== 'login' && !(await useAuthStore().checkToken())) {
  //   return next({ name: 'login' })
  // }

  if (authStore.token) {
    await authStore.checkToken()
  }

  next()
})

export default router
