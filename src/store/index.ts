import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

// 引入模块modules子模块
// import workspace from './modules/workspace.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 子模块
  modules: {
    // "workspace": workspace,
  },
  state,
  getters,
  mutations,
  actions,
  plugins: [
    // 持久化存储插件，解决刷新浏览器store重置
    createPersistedState({
      key: 'vuex',
      reducer: (state, paths) => {
        return Object.assign({}, state, { ready: false, layout: 'default' })
      },
      storage: localStorage
      // filter: ({ type, payload }) => {
      //   return !filterList.includes(type)
      // }
    })
  ]
})

export default store
