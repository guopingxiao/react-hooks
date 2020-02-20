import React from 'react'
import PropTypes from 'prop-types'
import { TimeUtil } from '../util/index'
import './Nav.css'

export default function Nav(props) { 
  const { 
    date,
    prevClick,
    nextClick,
    isPrevDisabled,
    isNextDisabled
  } = props

  const currentString = TimeUtil.getCurrentMonthDay(date)

  return (
    <div className="nav">
      <span
        className={`nav-prev ${isPrevDisabled ? 'nav-disabled' : ''}`}
        onClick={()=> prevClick()}
      >前一天</span>
      <span className="nav-current">{currentString}</span>
      <span
        className={`nav-next ${isNextDisabled ? 'nav-disabled' : ''}`}
        onClick={()=> nextClick()}
      >后一天</span>
    </div>
  )
}
Nav.propTypes = {
  date: PropTypes.number.isRequired,
  prevClick:PropTypes.func.isRequired,
  nextClick:PropTypes.func.isRequired,
  isPrevDisabled:PropTypes.bool.isRequired,
  isNextDisabled:PropTypes.bool.isRequired
}
