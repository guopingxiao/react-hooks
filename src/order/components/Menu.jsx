import React, { memo } from 'react'
import PropTypes from 'prop-types'

import './Menu.css'

const MenuItem = memo(props => {
  const {
    onPress,
    title,
    value,
    active
  } = props

  return (
    <li
      className={`${active ? 'active' : ''}`}
      onClick={() => {onPress(value)}}
    >
      {title}
    </li>
  )
})

MenuItem.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  active: PropTypes.bool.isRequired,
}

function Menu(props) {
  const { show, options, onPress, hideMenu, title= '请选择' } = props
  return (
    <div>
      { show && <div className="menu-mask" onClick={() => hideMenu()}></div>}
      <div className={`menu ${ show? 'show': '' }`}>
        <div className="menu-title">{title}</div>
        <ul>
          {options &&
            options.map(option => {
              return <MenuItem key={option.value} {...option} onPress={onPress}></MenuItem>
            })}
        </ul>
      </div>
    </div>
  )
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  options: PropTypes.array,
  onPress: PropTypes.func,
  hideMenu: PropTypes.func.isRequired,
}

export default memo(Menu)
