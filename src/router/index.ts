import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('@/views/login.vue')
const NotFound = () => import('@/views/not-found.vue')
const Home = () => import('@/views/Home.vue')

Vue.use(Router)

//设置路由配置
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL, // 如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
  routes
})

/**
 * 全局前置守卫
 */
router.beforeEach((to, from, next) => {
  next() // 确保要调用 next 方法，否则钩子就不会被 resolved。next('/')也可指定地址

})

/**
 * 全局解析守卫
 */
router.beforeResolve((to, from, next) => {
  next()
})

/**
 * 全局后置守卫
 */
// router.beforeEach((to, from) => {
//
// })


export default router
