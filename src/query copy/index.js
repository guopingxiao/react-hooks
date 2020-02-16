import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './node_modules/normalize.css/normalize.css'

import store from './redux/store'
import App from './App'
import './index.css'

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root'))


