const Koa = require('koa')
const router = require('koa-router')();
const cityData = require('./api/citylist.json')
const searchJson = require('./api/search.json')

const app = new Koa()



router.get('/api/citylist', async function (ctx, next) { 
  ctx.body = {
    code: 200,
    cityData: cityData
  }
})
router.get('/api/search', async function (ctx, next) { 
  ctx.body = searchJson
})


router.get('/', async function (ctx, next) { 
  ctx.body = 'hello world'
})



app.use(router.routes())

app.listen(5000, () => console.log('mock server start at 5000~'))