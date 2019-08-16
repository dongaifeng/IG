import Vue from 'vue'
import Router from 'vue-router'

import app from './modules/app'

import Home from '@/views/Home.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  ...app
]

export default new Router({
  routes,
  scrollBehavior: () => ({ y: 0 }),
})
