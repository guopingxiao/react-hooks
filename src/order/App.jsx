import React, { useCallback, useEffect, useMemo } from 'react'
import URI from 'urijs'
import dayjs from 'dayjs'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../common/components/Header'
import Detail from '../common/components/Detail'

import Account from './components/Account'
import Choose from './components/Choose'
import Passengers from './components/Passengers'
import Ticket from './components/Ticket'
import Menu from './components/Menu'

import './App.css'

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setSeatType,
  setDepartDate,
  setSearchParsed,
  fetchInitial,
  createAdult,
  createChild,
  removePassenger,
  updatePassenger,
  hideMenu,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu,
} from './redux/action'

function App(props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,

    dispatch,
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)

    const { trainNumber, dStation, aStation, type, date } = queries

    dispatch(setDepartStation(dStation))
    dispatch(setArriveStation(aStation))
    dispatch(setTrainNumber(trainNumber))
    dispatch(setSeatType(type))
    dispatch(setDepartDate(dayjs(date).valueOf()))
    dispatch(setSearchParsed(true))
  }, [dispatch])

  useEffect(() => {
    if (!searchParsed) {
      return
    }

    const url = new URI('/api/order')
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString()
    
    // 通过dispatch action来发送请求，直接在actioCreator里处理数据；
    dispatch(fetchInitial(url))
  }, [searchParsed, departStation, arriveStation, seatType, departDate, dispatch])

  const passengersCbs = useMemo(() => {
    return bindActionCreators(
      {
        createAdult, // 创建成人
        createChild,// 创建儿童
        removePassenger, // 删除成人，如果是绑定了儿童，对应儿童也要删除
        updatePassenger, // 更新乘客
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu,
      },
      dispatch
    )
  }, [dispatch])

  const menuCbs = useMemo(() => {
    return bindActionCreators(
      {
        hideMenu,
      },
      dispatch
    )
  }, [dispatch])

  const chooseCbs = useMemo(() => {
    return bindActionCreators(
      {
        updatePassenger,
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
        <Header title="订单填写" onBack={onBack} />
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
          <span style={{ display: 'block' }} className="train-icon"></span>
        </Detail>
      </div>
      <Ticket price={price} type={seatType} />

      <Passengers passengers={passengers} {...passengersCbs} />
      {passengers.length > 0 && <Choose passengers={passengers} {...chooseCbs} />}
      <Account length={passengers.length} price={price} />
      <Menu show={isMenuVisible} {...menu} {...menuCbs} />
    </div>
  )
}

function mapStateToProps(state) {
  return {...state}
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
