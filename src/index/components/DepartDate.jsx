import React from 'react'
import './DepartDate.css'
import PropTypes from 'prop-types'

import { TimeUtil } from '../../common/util/index'

export default function DepartDate(props) {
  const { 
    time,
    onClick
  } = props

  let {
    dayTimestamp,
    dayTimeFormat,
    weekDay
  } = TimeUtil.getDayTime(time)

  const isToday = (dayTimestamp === TimeUtil.getDayTime().dayTimestamp)
   weekDay = weekDay + (isToday ? '(今天)': '')

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={dayTimeFormat} />
      {dayTimeFormat}
      <span className="depart-week">{weekDay}</span>
    </div>
  )
}
 
DepartDate.propTypes = {
  time: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}