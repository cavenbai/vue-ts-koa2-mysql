import Vue from 'vue'
import createFilters from '@/extension/filter'
import createDirectives from '@/extension/directive'
import createPlugins from '@/extension/plugin'

export default async function ({ store } :any) {
  // 安装过滤器
  if (createFilters) {
    Object.entries(createFilters({ store })).forEach(([key, fun]) => {
      Vue.filter(key, fun)
    })
  }

  // 安装指令
  if (createDirectives) {
    Object.entries(createDirectives({ store })).forEach(([key, fun]) => {
      Vue.directive(key, fun)
    })
  }

  // 安装插件
  if (createPlugins) {
    Object.entries(createPlugins({ store })).forEach(([key, plugin]: [string, any]) => {
      Vue.use(plugin)
    })
  }
}
