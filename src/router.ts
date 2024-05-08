import { createRouter, createWebHistory } from 'vue-router'

import LadingPage from './pages/LandingPage/page.vue'
import Detail from './pages/Detail/page.vue'
import Favorites from './pages/Favorites/page.vue'
import Type from './pages/Type/page.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LadingPage, name: 'home' },
    { path: '/detail/:id', component: Detail, name: 'detail'},
    { path: '/favorite', component: Favorites,  name: 'favorite'},
    { path: '/type', component: Type, name: 'type'},
  ],
})

export default router
