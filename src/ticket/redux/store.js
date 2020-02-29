import { 
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

import reducer from './reducer'
import thunk from 'redux-thunk'

const initState = {
  departDate: Date.now(), // 发车日期
  arriveDate: Date.now(), // 到达日期
  departTimeStr: null,  // 发车时间
  arriveTimeStr: null, // 到达时间
  departStation: null, // 出发站台
  arriveStation: null, // 到站
  trainNumber: null, // 车次
  durationStr: null, // 时长
  tickets: [], // 车票预订列表
  isScheduleVisible: false, // 车次详情是否可以见
  searchParsed: false // url search 是否解析完毕
};

export default createStore(
  combineReducers(reducer),
  initState,
  applyMiddleware(thunk)
)