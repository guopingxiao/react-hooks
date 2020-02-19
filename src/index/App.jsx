/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import React, { useCallback, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import './App.css'

import Header from '../common/components/Header'
import Journey from './components/Journey'
import DepartDate from './components/DepartDate'
import HighSpeed from './components/HighSpeed'
import Submit from './components/Submit'
import CitySelector from '../common/components/CitySelector'
import DateSelector from '../common/components/DateSelector'

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate
} from './redux/action'
import { TimeUtil } from '../common/util'

function App(props) { 
  const {
    from,
    to,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectorVisible,
    dispatch
  } = props
  
  const onBack = useCallback(() => { 
    window.history.back()
  }, [])

  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo())
  // },[dispatch])
  // const doShowCitySelector = useCallback((isLeft) => { 
  //   dispatch(showCitySelector(isLeft))
  // }, [dispatch])

  const cbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, [dispatch])

  const citySelectorCbs = useMemo(() => { 
    return bindActionCreators({
      onBack: hideCitySelector,
      fetchCityData,
      onSelect: setSelectCity
    }, dispatch)
  }, [dispatch])
  
  const departDateCbs = useMemo(() => { 
    return bindActionCreators({
      onClick: showDateSelector
    }, dispatch)
  }, [])

  const dateSelectorCbs = useMemo(() => { 
    return bindActionCreators({
      onBack: hideDateSelector
    }, dispatch)
  }, [dispatch])

  const onSelectDate = useCallback((day) => { 
    if (!day || day < TimeUtil.getDayTime().dayTimestamp) { 
      return
    }
    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())

  })
  
  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票"></Header>
      </div>
      <form className="form">
        <Journey
          from={from}
            to={to}
            {...cbs}
        />
          <DepartDate
            time={departDate}
            {...departDateCbs}
          />
          <HighSpeed></HighSpeed>
          <Submit></Submit>
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
        show={isDateSelectorVisible}
        {...dateSelectorCbs}
        onSelect={onSelectDate}
      />
    </div>
  )

}

export default connect(
  function mapStateToProps(state) {
      return state
  },
  function mapDispatchToProps(dispatch) {
      return { dispatch }
  }
)(App)