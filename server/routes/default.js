const Router = require('koa-router')
const router = new Router()
const api = require('../api')

router
  .post('/login', async (ctx) => {
    await api.login(ctx.request.body).then((data) => {
      const user_data = data[0]
      if(user_data === undefined) {
        ctx.body = { status: false, msg: '用户名不存在，请先注册！'}
      } else {
        if(user_data && (user_data.pass_word !== ctx.request.body.password)) {
          ctx.body = { status: false, msg: '密码错误，请重新输入！' }
        }else {
          ctx.body = { status: true, msg: '登陆成功！' }
        }
      }
    }).catch((err) => {ctx.body = { status: false, msg: err }})
  })
  .post('/register', async (ctx) => {
    let user = []
    await api.login(ctx.request.body).then((data) => {
      user = data
    }).catch((err) => {ctx.body = { status: false, msg: err }})

    if (user[0] !== undefined) {
      ctx.body = { status: false, msg: '用户名已经存在，请重新注册！'};
      return
    }

    await api.register(ctx.request.body).then(data => {
      ctx.body = { status: true, msg: '注册成功！'}
    }).catch((err) => {ctx.body = { status: false, msg: err }})
  })
module.exports = router
