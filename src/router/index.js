import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ColorDetailView from '../views/ColorDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/color/:id',
    name: 'color-detail',
    component: ColorDetailView,
    props: (route) => ({ id: Number(route.params.id) }),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
