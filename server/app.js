const Koa = require('koa')
const router = require('koa-router')();
const cityData = require('./api/citylist.json')
const searchJson = require('./api/search.json')
const queryJson = require('./api/query.json')
const queryChangeJson = require('./api/query-change.json')
const ticketJson = require('./api/ticket.json')
const scheduleJson = require('./api/schedule.json')
const orderJson = require('./api/order.json')

const app = new Koa()

let queryCount = 0


router.get('/api/citylist', async function (ctx, next) { 
  ctx.body = {
    code: 200,
    cityData: cityData
  }
})

router.get('/api/search', async function (ctx, next) { 
  ctx.body = searchJson
})

router.get('/api/query', async function (ctx, next) {
  let result
  if (++queryCount % 2) {
    result = queryJson
  } else { 
    result = queryChangeJson
  }
  let trains = result.dataMap.directTrainInfo.trains
  result.dataMap.directTrainInfo.trains = trains.map(item => {
    item.date = ctx.query.date
    return item
  })
  ctx.body = result
})

router.get('/api/ticket', async function (ctx, next) {
  ctx.body = ticketJson
})

router.get('/api/schedule', async function (ctx, next) {
  ctx.body = scheduleJson
})

router.get('/api/order', async function (ctx, next) {
  ctx.body = orderJson
})


router.get('/', async function (ctx, next) { 
  ctx.body = 'hello world'
})



app.use(router.routes())

app.listen(5000, () => console.log('mock server start at 5000~'))