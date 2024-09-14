import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectView from '../views/ProjectView.vue'
import ServicesView from '../views/ServicesView.vue'
import PhotoView from '@/views/PhotoView.vue'
import DOPView from '@/views/DOPView.vue'

import { useStore } from '@/stores/fetchStore.js';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        ScrollTrigger.killAll();
        const store = useStore() // Usa tu tienda
        store.setIsInInfoRoute(false)
        next()
      }
    },
    {
      path: '/:title',
      name: 'project',
      component: ProjectView,
      beforeEnter: (to, from, next) => {
        const store = useStore() // Usa tu tienda
        store.setIsInInfoRoute(true)
        next()
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      beforeEnter: (to, from, next) => {
        const store = useStore() // Usa tu tienda
        ScrollTrigger.killAll();
        store.setIsInInfoRoute(false)
        next()
      }
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
      beforeEnter: (to, from, next) => {
        const store = useStore() // Usa tu tienda
        ScrollTrigger.killAll();
        store.setIsInInfoRoute(false)
        next()
      }
    },
    {
      path: '/photography',
      name: 'photography',
      component: PhotoView,
      beforeEnter: (to, from, next) => {
        const store = useStore() // Usa tu tienda
        ScrollTrigger.killAll();
        store.setIsInInfoRoute(false)
        next()
      }
    },
    {
      path: '/dop',
      name: 'dop',
      component: DOPView,
      beforeEnter: (to, from, next) => {
        const store = useStore() // Usa tu tienda
        ScrollTrigger.killAll();
        store.setIsInInfoRoute(false)
        next()
      }
    }
  ]
})

export default router
