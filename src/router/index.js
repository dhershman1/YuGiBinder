import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authGuard } from '@auth0/auth0-vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/binders',
      name: 'Binders',
      component: () => import('../views/BindersView.vue')
    },
    {
      path: '/binder/random',
      name: 'RandomBinder',
      component: () => import('../views/OpenBinder.vue'),
      props: { isRandom: true }
    },
    {
      path: '/binders/:id',
      name: 'OpenBinder',
      component: () => import('../views/OpenBinder.vue'),
      props: true
    },
    {
      path: '/card/random',
      name: 'RandomCard',
      component: () => import('../views/SingleCard.vue'),
      props: { isRandom: true }
    },
    {
      path: '/cards/:cardId',
      name: 'Card',
      component: () => import('../views/SingleCard.vue'),
      props: true
    },
    {
      path: '/card-catalog',
      name: 'CardCatalog',
      component: () => import('../views/CardCatalog.vue')
    },
    {
      path: '/binder/create',
      name: 'CreateBinder',
      component: () => import('../views/CreateBinder.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/binders/:binderId/edit',
      name: 'EditBinder',
      component: () => import('../views/CreateBinder.vue'),
      props: (route) => ({ isEditing: true, binderId: route.params.binderId }),
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
