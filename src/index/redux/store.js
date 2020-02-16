import { 
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

import reducer from './reducer'
import thunk from 'redux-thunk'

const initState = {
  from: '北京',
  to: '上海',
  isCitySelectorVisible: false,
  isSelectingLeftCity: false,
  cityData: null,
  isLoadingCityData: false,
  isDateSelectorVisible: false,
  highSpeed: false,             
}
export default createStore(
  combineReducers(reducer),
  initState,
  applyMiddleware(thunk)
)