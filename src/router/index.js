import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout')
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    }
  ]
})
