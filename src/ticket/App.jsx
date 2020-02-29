import { connect } from 'react-redux'
import React, {
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense
} from 'react'
import { bindActionCreators } from 'redux'
import { TrainContext } from './redux/context'
import URI from 'urijs'
import './App.css'

import useNav from '../common/components/useNav'
import Header from '../common/components/Header'
import Nav from '../common/components/Nav'
import Detail from '../common/components/Detail'
import Candidate from './components/Candidate'


import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate,
  setSearchParsed,
  prevDate,
  nextDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr,
  setTickets,
  toggleIsScheduleVisible,
} from './redux/action'
import { TimeUtil } from '../common/util'

const Schedule = lazy(() => import('./components/Schedule'))

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  useEffect(() => {
    const query = URI.parseQuery(window.location.search)
    const { aStation, dStation, date, trainNumber } = query

    dispatch(setDepartStation(dStation))
    dispatch(setArriveStation(aStation))
    dispatch(setTrainNumber(trainNumber))
    dispatch(setDepartDate(TimeUtil.getFormatDayTime(date)))
    dispatch(setSearchParsed(true))
  }, [dispatch])

  useEffect(() => {
    document.title = trainNumber
  }, [trainNumber])

  useEffect(() => {
    if (!searchParsed) {
      return
    }

    const url = new URI('/api/ticket')
      .setSearch('date', TimeUtil.getDayTime(departDate, 'YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString()
    
    async function fetchTicket () { 
      let result = await (await fetch(url)).json()
      const {detail,  candidates} = result 
      const {
        departTimeStr,
        arriveTimeStr,
        arriveDate,
        durationStr } = detail

        dispatch(setDepartTimeStr(departTimeStr))
        dispatch(setArriveTimeStr(arriveTimeStr))
        dispatch(setArriveDate(arriveDate))
        dispatch(setDurationStr(durationStr))
        dispatch(setTickets(candidates))
    }

    fetchTicket()
  }, [searchParsed, departDate, trainNumber, dispatch])

  const { isPrevDisabled, isNextDisabled, prevClick, nextClick } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  )

  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible,
      },
      dispatch
    )
  }, [dispatch])

  if (!searchParsed) {
    return null
  }

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack} />
      </div>

      <div className="nav-wrapper">
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prevClick={prevClick}
          nextClick={nextClick}
        />
      </div>

      <div className="detail-wrapper">
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
        >
            <span className="left"></span>
            <span className="schedule" onClick={() => detailCbs.toggleIsScheduleVisible()}>
              时刻表
            </span>
            <span className="right"></span>
        </Detail>
      </div>

      <TrainContext.Provider
        value={{
          trainNumber,
          departStation,
          arriveStation,
          departDate,
        }}
      >
        <Candidate tickets={tickets} />
      </TrainContext.Provider>

      {isScheduleVisible && (
        <div className="mask" onClick={() => dispatch(toggleIsScheduleVisible())}>
          <Suspense fallback={<div>loading</div>}>
            <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
            />
          </Suspense>
        </div>
      )}

    </div>
  )
}

export default connect(
  function mapStateToProps(state) { 
    return {...state}
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch }
   }
)(App)