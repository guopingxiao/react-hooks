import React from 'react'
import PropTypes from 'prop-types'
import './Bottom.css'
import { ORDER_DEPART } from '../redux/constant'

export default function Bottom(props) { 
  const { 
    toggleHighSpeed,
    toggleIsFiltersVisible,
    toggleOnlyTickets,
    toggleOrderType,
    highSpeed,
    orderType,
    onlyTickets,
    isFiltersVisible
  } = props
  
  return (
    <div className="bottom">
        <div className="bottom-filters">
            <span className="item item-on" onClick={toggleOrderType}>
                <i className="icon">&#xf065;</i>
                { orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长' }
            </span>
            <span
                className={`item ${highSpeed ? 'item-on':'' }`}
                onClick={toggleHighSpeed}
            >
                <i className="icon">{ highSpeed ? '\uf43f' : '\uf43e' }</i>
                只看高铁动车
            </span>
            <span
                className={`item ${onlyTickets ? 'item-on':'' }`}
                onClick={toggleOnlyTickets}
            >
                <i className="icon">{ onlyTickets ? '\uf43d' : '\uf43c' }</i>
                只看有票
            </span>
            <span
                className={`item ${isFiltersVisible ? 'item-on' : ''}`}
                onClick={toggleIsFiltersVisible}
            >
                <i className="icon">{ '\uf0f7' }</i>
                综合筛选
            </span>
        </div>
    </div>
);
}
Bottom.propTypes = {
  toggleOrderType: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  orderType: PropTypes.number.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  isFiltersVisible: PropTypes.bool.isRequired
}
