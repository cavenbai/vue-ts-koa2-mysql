import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

/**
 * 该方法用于注册所有的第三方插件
 * @param store
 */
export default async function ({ store }:any) {

  Vue.use(ElementUI)
}
