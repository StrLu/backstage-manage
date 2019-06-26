import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import axios from 'axios'

import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.css'

Vue.use(ElementUi)

axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
