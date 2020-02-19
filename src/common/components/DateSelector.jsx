import React from 'react'
import PropTypes from 'prop-types'
import './DateSelector.css'
import Header from './Header'
import { TimeUtil } from '../util/index'

function Day(props) { 
  const { 
    day,
    onSelect
  } = props

  if (!day) { 
    return <td className="null"></td>
  }

  const { dayTimestamp: now } = TimeUtil.getDayTime()
  
  let dayClass = ''
  if (day < now) { 
    dayClass += ' disabled'
  }
  if ([0,6].includes(new Date(day).getDay)) { 
    dayClass += ' weekend'
  }

  const dayString = now === day ? '今天' : new Date(day).getDate()
   
  return (
    <td className={dayClass} onClick={()=>onSelect(day)}>{dayString}</td>
  )
}
Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
}

function Week(props) {
  const {
    days,
    onSelect
  } = props

  return (
    <tr className="date-table-days">
      {
        days.map((day, idx) => { 
          return (<Day key={idx} day={day} onSelect={onSelect} />)
        })
      }
    </tr>
  )
}
Week.propTypes = {
  days: PropTypes.array,
  onSelect: PropTypes.func.isRequired
}


function Month(props) {
  const { 
    monthStartTime,
    onSelect
  } = props

  const {
    weeks,
    month,
    year
  } = TimeUtil.getTimesFromStartMonth(monthStartTime)


  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>{year}年{month + 1}月</h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="date-table-weeeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {
          weeks.map((days, index) => { 
            return (
              <Week
                key={index}
                days={days}
                onSelect={onSelect}
              />
            )
          })
        }
      </tbody>
    </table>
  )
}
Month.propTypes = {
  monthStartTime: PropTypes.number,
  onSelect: PropTypes.func.isRequired
}


export default function DateSelector(props) { 
  const {
    show,
    onSelect,
    onBack,
  } = props

  const monthTimeStamps = TimeUtil.getMonthTimeStamps()

  return (
    <div className={`date-selector ${show ? '' : 'hidden'}`}>
      <Header title="日期选择" onBack={onBack}/>
      <div className="date-selector-tables">
        {
          monthTimeStamps.map(month => { 
            return (
              <Month
                key={month}
                monthStartTime={month}
                onSelect={onSelect}
              />
            )
          })
        }
      </div>
    </div>
  )
}
DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
    onSelect:PropTypes.func.isRequired,
    onBack:PropTypes.func.isRequired,
}