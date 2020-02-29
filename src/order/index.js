import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from '../serviceWorker'

import store from './redux/store'

import App from './App'

import 'normalize.css/normalize.css'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

if ('production' === process.env.NODE_ENV) {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
