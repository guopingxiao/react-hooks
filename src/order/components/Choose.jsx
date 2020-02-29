import React, { memo } from 'react'
import PropTypes from 'prop-types'

import './Choose.css'

function Choose(props) {
  const { passengers, updatePassenger } = props

  // 构造一个统一的函数来渲染每一个座位
  function createSeat(seatType) {
    return (
      <div>
        {passengers.map(passenger => {
          return (
            <p
              key={passenger.id}
              className={`seat ${passenger.seat === seatType ? 'active' : ''}`}
              data-text={seatType}
              onClick={() =>
                updatePassenger(passenger.id, {
                  seat: seatType, // update 座位类型
                })
              }
            >
              &#xe02d;
            </p>
          )
        })}
      </div>
    )
  }

  return (
    <div className="choose">
      <p className="tip">在线选座</p>
      <div className="container">
        <div className="seats">
          <div>窗</div>
          {createSeat('A')}
          {createSeat('B')}
          {createSeat('C')}
          <div>过道</div>
          {createSeat('D')}
          {createSeat('F')}
          <div>窗</div>
        </div>
      </div>
    </div>
  )
}

Choose.propTypes = {
  passengers: PropTypes.array.isRequired,
  updatePassenger: PropTypes.func.isRequired,
}

export default memo(Choose)
