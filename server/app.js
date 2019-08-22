const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const path = require('path')
const routes = require('./routes')

// koa有error事件，当发生错误，可以通过error事件，对错误统一处理
onerror(app)

// 设置跨域处理
app.use(cors({
  origin: function (ctx) {
    return '*' // 允许来自所有域名请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 用来解析body，比如通过post来传递表单、json或上传文件，数据不容易获取，通过koa-bodyparser解析之后，在koa中this.body就能获取到数据
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
  onerror: function (ctx) {
    ctx.throw('解析失败')
  }
}))

// 美观的输出JSON response的Koa中间件
app.use(json())

// 日志分析
app.use(logger())

// koa的静态文件指定映射路径
app.use(require('koa-static')(path.join(__dirname + './src/public')))

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

routes(app) // 初始化路由，在路由模块中处理

app.listen(3000, () => {
  console.log('服务启动成功:localhost:3000')
}) // 监听端口
