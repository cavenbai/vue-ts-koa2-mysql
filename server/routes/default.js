const Router = require('koa-router')
const router = new Router()
const api = require('../api')

router
  .get('/1', async (ctx) => {
    await api.userLogin().then((data) => {
      ctx.body = { status: true, data: data }
    }).catch(() => {
      ctx.body = { status: false }
    })
  })
module.exports = router
