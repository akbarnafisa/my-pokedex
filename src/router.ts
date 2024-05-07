import { createRouter, createWebHistory } from 'vue-router'

import LadingPage from './pages/LandingPage/page.vue'
import Detail from './pages/Detail/page.vue'
import Favorites from './pages/Favorites/page.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LadingPage },
    { path: '/detail/:id', component: Detail },
    { path: '/favorite', component: Favorites },
  ],
})

export default router
