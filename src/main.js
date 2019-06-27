import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import axios from 'axios'
import { getUser, removeUser } from '@/utils/auth'

import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.css'

Vue.use(ElementUi)

// 联网测试
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 局域网测试
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'

/*
axios请求拦截器,axios发出的请求先经过这里
config是请求相关的配置对象
*/

axios.interceptors.request.use(config => {
  const user = getUser()
  // 有user数据则往本次请求中添加token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // return config是允许发送的开关,可以在这之前做一些逻辑操作
  return config
}, error => {
  // 出错则返回错误信息
  return Promise.reject(error)
})

/*
响应拦截器
axios收到的请求会先经过这里
*/

axios.interceptors.response.use(response => {
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => {
  if (error.response.status === 401) {
    removeUser()
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
