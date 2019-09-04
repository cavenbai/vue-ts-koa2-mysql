import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import bootstrap from '@/core/bootstrap'

async function startUp () {
  // 初始化vue相关功能
  await bootstrap({ store, router})

  // 生成提示信息
  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

}

startUp()



