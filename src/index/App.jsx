import { connect } from 'react-redux'
import React, { useCallback } from 'react'
import './App.css'

import Header from '../common/components/Header'
import Journey from './components/Journey'
import DepartDate from './components/DepartDate'
import HighSpeed from './components/HighSpeed'
import Submit from './components/Submit'

function App(props) { 

  const onBack = useCallback(() => { 
    window.history.back()
  },[])
  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票"></Header>
      </div>
      
     <Journey></Journey>
     <DepartDate></DepartDate>
     <HighSpeed></HighSpeed>
     <Submit></Submit>
    </div>
  )

}

export default connect(
  function mapStateToProps(state) { 
    return {}
  },
  function mapDispatchToProps (dispatch) { 
    return {}
  }
)(App)