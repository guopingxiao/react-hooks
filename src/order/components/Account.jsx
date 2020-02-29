import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'

import './Account.css'

function Account(props) {
  const { price = 0, length } = props

  // 通过useState来处理内部的一些变量更改，很方便
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="account">
      <div className={`price ${expanded ? 'expanded' : ''}`} onClick={() => setExpanded(!expanded)}>
        <div className="money">{length * price}</div>
        <div className="amount">支付金额</div>
      </div>
      <div className="button">提交按钮</div>
      <div className={`layer ${ expanded ? '': 'hidden' }`} onClick={() => setExpanded(false)}></div>
      <div className={`detail ${ expanded ? '': 'hidden' }`}>
        <div className="title">金额详情</div>
        <ul>
          <li>
            <span>火车票</span>
            <span>￥{price}</span>
            <span>&#xD7;{length}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

Account.propTypes = {
  price: PropTypes.number,
  length: PropTypes.number.isRequired,
}

export default memo(Account)
