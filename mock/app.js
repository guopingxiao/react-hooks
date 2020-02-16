const Koa = require('koa')
const router = require('koa-router')();

const app = new Koa()

router.get('/', async function (ctx, next) { 
  ctx.body = 'hello world'
})

router.get('/json', async function (ctx, next) { 
  ctx.body = {
    text: 'hello world',
    type: 'json'
  }
})



app.use(router.routes())

app.listen(5000, () => console.log('mock server start at 5000~'))