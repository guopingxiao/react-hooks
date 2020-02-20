import { 
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

import reducer from './reducer'
import thunk from 'redux-thunk'
import { ORDER_DEPART } from './constant'
import { TimeUtil } from '../../common/util/index'

const initState = {
  from: null, // 始发站
  to: null, // 终点站
  departDate: TimeUtil.getDayTime().dayTimestamp, // 出发时间
  highSpeed: false, // 是否高铁动车
  trainList: [],    // 火车列表
  orderType: ORDER_DEPART, // 订单顺序（出发早晚、时长）
  onlyTickets: false, // 有票
  ticketTypes: [],    // 票类型
  checkedTicketTypes: {},// 票类型筛选项
  trainTypes: [],       // 车次类型
  checkedTrainTypes: {},    // 车次类型筛选
  departStations: [],     // 出发站台选项
  checkedDepartStations: {},// 出发站台选项筛选
  arriveStations: [],       // 到达站台选项
  checkedArriveStations: {}, // 到达站台选项筛选
  departTimeStart: 0, // 出发起始时间
  departTimeEnd: 24,  // 出发终止时间
  arriveTimeStart: 0,  // 到达起始时间
  arriveTimeEnd: 24,  // 到达终止时间
  isFiltersVisible: false, // 筛选面板是否可见
  searchParsed: false, // 搜索条件是否解析完毕
}

export default createStore(
  combineReducers(reducer),
  initState,
  applyMiddleware(thunk)
)