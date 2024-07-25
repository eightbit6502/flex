import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Reset from '../views/Reset.vue'
import Forgot from '../views/Forgot.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/reset/:token',
      name: 'reset',
      component: Reset
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: Forgot
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   path: '/contact',
    //   name: 'contact',
    //   component: () => import('../views/ContactView.vue')
    // }
  ]
})

export default router