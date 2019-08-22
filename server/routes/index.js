const Router = require('koa-router')
const router = new Router()
const moRen = require('./default')

module.exports = function (app) {
  app.use(router.routes(), router.allowedMethods()) // 注册路由
  // 主应用中加载子路由模块 (allowedMethods设置之后会在执行完毕之后根据status设置响应头)
  router.use('/default', moRen.routes(), moRen.allowedMethods())
}
