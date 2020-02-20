import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import URI from 'urijs'
import { TimeUtil } from '../common/util/index'
import useNav from '../common/components/Nav.js'

import './App.css'
import Header from '../common/components/Header'
import Nav from '../common/components/Nav'
import List from './components/List'
import Bottom from './components/Bottom'
import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  setArriveStations,
  setDepartStations,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  prevDate,
  nextDate
} from './redux/action'

function App(props) { 
  const { 
    searchParsed,
    from,
    to,
    departDate,
    highSpeed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    dispatch
  } = props

  const onBack = useCallback(() => {
      window.history.back()
  }, [])
  
  // 解析url参数，设置到store中
  useEffect(() => {
    const query = URI.parseQuery(window.location.search)
    const { 
      fromcity: from,
      to,
      date,
      highSpeed
    } = query

    dispatch(setFrom(from))
    dispatch(setTo(to))
    dispatch(setDepartDate(TimeUtil.getFormatDayTime(date)))
    dispatch(setHighSpeed(highSpeed === 'true'))
    dispatch(setSearchParsed(true)) // 参数解析完毕
  }, [dispatch])


  // 发起异步请求，将结果设置到store中
  useEffect(() => { 
    if (!searchParsed) { 
      return
    }
    const url = new URI('/api/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', TimeUtil.getDayTime(departDate).dayTimeFormat)
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
      .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
      .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
      .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString()
    
    async function fetchQuery(url) { 
      let result = await (await fetch(url)).json()
      const { dataMap: { 
        directTrainInfo: { 
          trains,
          filter: { 
            ticketType,
            trainType,
            depStation,
            arrStation
          }
        }
      } } = result

      dispatch(setArriveStations(arrStation))
      dispatch(setDepartStations(depStation))
      dispatch(setTrainList(trains))
      dispatch(setTicketTypes(ticketType))
      dispatch(setTrainTypes(trainType))      
    }

    fetchQuery(url)
    
  }, [searchParsed, from, to, departDate, highSpeed, orderType, onlyTickets, checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriveStations, departTimeStart, departTimeEnd, arriveTimeStart, arriveTimeEnd, dispatch])

  const {
    isPrevDisabled,
    isNextDisabled,
    prevClick,
    nextClick
  } = useNav(departDate, dispatch, prevDate, nextDate)

  if (!searchParsed) { 
    return null;
  }
  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from}→${to}`} onBack={onBack} />
        <Nav
          date={departDate}
          isPrevDisabled = {isPrevDisabled}
          isNextDisabled = {isNextDisabled}
          prevClick = {prevClick}
          nextClick = {nextClick}
        />
      </div>
      <Nav />
      <List />
      <Bottom />
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