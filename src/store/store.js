import Vue from 'vue'
import VueX from 'vuex'
import { getUser, saveUser } from '@/utils/auth.js'

Vue.use(VueX)

const store = new VueX.Store({
  state: {
    user: getUser() || {} // user的初始数据来自于本地存储
  },
  mutations: {
    changeUser (state, user) {
      Object.assign(state.user, user) // 将参数user合并到state.user中
      saveUser(state.user)
    }
  }
})
export default store
