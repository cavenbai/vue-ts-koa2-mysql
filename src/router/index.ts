import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
const Login = () => import('@/views/login.vue')
const NotFound = () => import('@/views/not-found.vue')
const Home = () => import('@/views/Home.vue')
const Page1 = () => import('@/views/page1.vue')
const Page2 = () => import('@/views/page2.vue')
const Page3 = () => import('@/views/page3.vue')

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
  },
  {
    path: '/Page1',
    name: 'Page1',
    component: Page1
  },
  {
    path: '/Page2',
    name: 'Page2',
    component: Page2
  },
  {
    path: '/Page3',
    name: 'Page3',
    component: Page3
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
router.beforeResolve(({matched}, from, next) => {
  // let [{ components }] = matched
  // console.log(components.default)
  // if (components.default) {
  //   next('/404')
  // } else {
  //   next()
  // }
  next()
})

/**
 * 全局后置守卫
 */
router.afterEach((to) => {
  layoutCheck(to.matched)
})

//更新布局模式，更新store （使用to中的matched属性拿到当前进入组件的实力，解构之后取到布局字符串，更新store）
function layoutCheck(matched) {
  if (matched && matched.length > 0) {
    let [{ components }] = matched
    let component = components.default
    let targetLayout = component['$layout'] || 'default'
    if (store.state.layout !== targetLayout) {
      store.commit('updateLayout', targetLayout )
    }
  }
}

export default router
