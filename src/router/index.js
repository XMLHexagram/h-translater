import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/page/mainPage/apps/Home')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/page/mainPage/apps/About')
  }
]

const router = new VueRouter({
  routes
})

export default router
