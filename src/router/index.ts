import { createRouter, createWebHistory } from 'vue-router'
import TestPage from '../views/TestPage.vue'
import MusicBandListPage from '@/views/MusicBandListPage.vue'
import MusicBandEditPage from '@/views/MusicBandEditPage.vue'
import MusicBandCreatePage from '@/views/MusicBandCreatePage.vue'

// const PATH_PREFIX = '/~s327630'
const PATH_PREFIX = ''

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `${PATH_PREFIX}/`,
      name: 'home',
      component: TestPage
    },
    {
      path: `${PATH_PREFIX}/music-bands`,
      name: 'music-bands',
      component: MusicBandListPage
    },
    {
      path: `${PATH_PREFIX}/music-bands/create`,
      name: 'music-bands-create',
      component: MusicBandCreatePage
    },
    {
      path: `${PATH_PREFIX}/music-bands/:id`,
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
