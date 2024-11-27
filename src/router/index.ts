import { createRouter, createWebHistory } from 'vue-router'
import TestPage from '../views/TestPage.vue'
import MusicBandListPage from '@/views/MusicBandListPage.vue'
import MusicBandEditPage from '@/views/MusicBandEditPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TestPage
    },
    {
      path: '/music-bands',
      name: 'music-bands',
      component: MusicBandListPage
    },
    {
      path: '/music-bands/:id',
      name: 'music-bands-edit',
      component: MusicBandEditPage
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
