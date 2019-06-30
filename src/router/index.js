import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth'

Vue.use(Router)

const router = new Router({
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
        },
        {
          name: 'publish-edit',
          path: '/publish/:id',
          component: () => import('@/views/publish/Publish.vue')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article/Article.vue')
        },
        {
          name: 'fans',
          path: '/fans',
          component: () => import('@/views/fans/fans.vue')
        },
        {
          name: 'comment',
          path: '/comment',
          component: () => import('@/views/comment/comment.vue')
        },
        {
          name: 'account',
          path: '/account',
          component: () => import('@/views/account/account.vue')
        },
        {
          name: 'media',
          path: '/media',
          component: () => import('@/views/media/media.vue')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    }
  ]
})
/**
 * 全局前置守卫
 * 当你访问路由页面的时候，会先进入这里
 * to 要去哪里的相关数据
 * from 来自哪里的相关数据
 * next 允许通过的方法
 */
router.beforeEach((to, from, next) => {
  nprogress.start()
  const userInfo = getUser()
  if (!userInfo) {
    if (to.path !== '/login') {
      next({ name: 'login' })
    } else {
      next()
    }
    nprogress.done()
  } else {
    if (to.path !== '/login') {
      next()
    } else {
      window.location.href = '/'
    }
  }
})
router.afterEach((to, from) => {
  nprogress.done()
})
export default router
