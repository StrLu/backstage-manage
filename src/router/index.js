import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '', // 父路由的默认内容
          component: () => import('@/views/home/Home.vue')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish/Publish.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    }
  ]
})
