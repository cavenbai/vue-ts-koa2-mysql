import Vue from 'vue'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css'

/**
 * 该方法用于注册所有的第三方插件
 * @param store
 */
export default async function ({ store }:any) {

  Vue.use(ElementUI)
  Vue.use(VueAwesomeSwiper)
}
