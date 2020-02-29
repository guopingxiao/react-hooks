import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import URI from 'urijs'
import { TimeUtil } from '../../common/util/index.js'
import leftPad from 'left-pad'

import './Schedule.css'

function ScheduleRow(props) {
  const {
    index,
    station,
    arriveTime,
    departTime,
    stay,

    isStartStation,
    isEndStation,
    isDepartStation,
    isArriveStation,
    beforeDepartStation,
    afterArriveStation,
  } = props

  return (
    <li>
      <div className={`icon ${(isDepartStation || isArriveStation) ? 'icon-red' : ''}`}>
        {isDepartStation ? '出' : isArriveStation ? '到' : leftPad(index, 2, 0)}
      </div>
      <div className={`row ${(beforeDepartStation || afterArriveStation) ? 'grey' : ''}`}>
        <span className={`station ${(isArriveStation || isDepartStation) ? 'red': ''}`}>
          {station}
        </span>
        <span className={`arr-time ${isArriveStation? 'red' : ''}`}>
          {isStartStation ? '始发站' : arriveTime}
        </span>
        <span className={`dep-time ${isDepartStation ? 'red':'' }`}>
          {isEndStation ? '终到站' : departTime}
        </span>
        <span className="stop-time">
          {isStartStation || isEndStation ? '-' : stay + '分'}
        </span>
      </div>
    </li>
  )
}

ScheduleRow.propTypes = {
  index: PropTypes.number.isRequired,
  station: PropTypes.string.isRequired,
  arriveTime: PropTypes.string,
  departTime: PropTypes.string,
  stay: PropTypes.number,

  isStartStation: PropTypes.bool.isRequired,
  isEndStation: PropTypes.bool.isRequired,
  isDepartStation: PropTypes.bool.isRequired,
  isArriveStation: PropTypes.bool.isRequired,
  beforeDepartStation: PropTypes.bool.isRequired,
  afterArriveStation: PropTypes.bool.isRequired,
}

function Schedule(props) {
  const {
    date,
    trainNumber,
    departStation,
    arriveStation
  } = props

  const [scheduleList, setScheduleList] = useState([])

  useEffect(() => {
    const url = new URI('/api/schedule')
      .setSearch('trainNumber', trainNumber)
      .setSearch('departStation', departStation)
      .setSearch('arriveStation', arriveStation)
      .setSearch('date', TimeUtil.formatDate(date))
      .toString()
    
    async function fetchSchedule() { 
      let data = await (await fetch(url)).json()
      let departRow
        let arriveRow

        for (let i = 0; i < data.length; ++i) {
          if (!departRow) {
            if (data[i].station === departStation) {
              departRow = Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: true,
                afterArriveStation: false,
                isArriveStation: false,
              })
            } else {
              Object.assign(data[i], {
                beforeDepartStation: true,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
              })
            }
          } else if (!arriveRow) {
            if (data[i].station === arriveStation) {
              arriveRow = Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: true,
              })
            } else {
              Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
              })
            }
          } else {
            Object.assign(data[i], {
              beforeDepartStation: false,
              isDepartStation: false,
              afterArriveStation: true,
              isArriveStation: false,
            })
          }

          Object.assign(data[i], {
            isStartStation: i === 0,
            isEndStation: i === data.length - 1,
          })
        }
        setScheduleList(data)
    }

    fetchSchedule()
    
  }, [date, trainNumber, departStation, arriveStation])

  

  return (
    <div className="schedule">
      <div className="dialog">
        <h1>列车时刻表</h1>
        <div className="head">
          <span className="station">车站</span>
          <span className="dep-time">到达</span>
          <span className="arr-time">发车</span>
          <span className="stop-time">停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule, index) => {
            return <ScheduleRow key={schedule.station} index={index + 1} {...schedule} />
          })}
        </ul>
      </div>
    </div>
  )
}

Schedule.propTypes = {
  date: PropTypes.number.isRequired,
  trainNumber: PropTypes.string.isRequired,
  departStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
}

export default memo(Schedule)
