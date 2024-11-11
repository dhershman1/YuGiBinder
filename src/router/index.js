import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    }
  ]
})

export default router
