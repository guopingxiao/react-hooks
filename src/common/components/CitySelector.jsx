/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, memo} from 'react'
import './CitySelector.css'
import PropTypes from 'prop-types'

const CityItem = memo(function CityItem(props) { 
  const { 
    name,
    onSelect
  } = props
  return (
      <li className="city-li" onClick={() => onSelect(name)}>{name}</li>
  )
})
// CityItem.propTypes = {
//   name:PropTypes.string.isRequired,
//   onSelect:PropTypes.func.isRequired
// }

const CitySection = memo(function CitySection(props) { 
  const {
    title,
    cities = [],
    onSelect
  } = props 

  return (
    <ul className="city-ul">
      <li className="city-li">{title}</li>
      {
        cities.map(city => { 
          return (
            <CityItem
              key={city.name}
              name={city.name}
              onSelect={onSelect}
            />)
        })
      }
    </ul>
  )
})

CitySection.propTypes = {
  title:PropTypes.string.isRequired,
  cities:PropTypes.array,
  onSelect:PropTypes.func.isRequired
}
const CityList = memo(function CityList(props) { 
  const {
    sections,
    onSelect
  } = props
  
  return (
    <div className="city-list">
      <div className="city-cate">
        {
          sections.map(section => {
            return (
              <CitySection
                key={section.title}
                title={section.title}
                cities={section.citys}
                onSelect={onSelect}
              />
            )
           })
        }
      </div>
    </div>
  )
})

CityList.propTypes = {
  sections:PropTypes.array,
  onSelect:PropTypes.func.isRequired
}


const CitySelector = memo(function CitySelector(props) {
  const {
    show,
    cityData,
    isLoading,
    onBack,
    fetchCityData,
    onSelect
  } = props

  let [keyword, setKeyword] = useState()
  let word = keyword ? `${keyword}`.trim() : ''

  // 异步获取cityData的副作用，通过useEffect实现，因为是异步数据的获取，涉及到较多状态的改变，放在redux中去做比较合理，所以从外部传入
  useEffect(() => {
    if (!show || cityData || isLoading) { 
      return 
    }
    fetchCityData()
  }, [cityData, show]) // 这里加上isLoading 为啥会是是循环？？？

  const renderCityList = ()=>{ 
    if (isLoading) { 
      return <div>loading</div>
    }
    if (cityData) { 
      return <CityList sections={cityData.cityList} onSelect={onSelect} />
    }
    return <div>error</div>
  }
  
  return (
    <div className={`city-selector ${show ? '' : 'hidden'}`}>
      <div className="city-search">
        <div className="search-back" onClick={()=>onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16, 21 25, 29"
              stroke="#FFF"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={keyword}
            className="search-input"
            onChange={e => setKeyword(e.target.value)}
            placeholder="城市、车站的中文名或拼音"
          />
        </div>
        <i
          className={`search-clean ${word.length === 0 ? 'hidden' : ''}`}
          onClick={()=>setKeyword('')}
        >&#xf063;</i>
      </div>
      {renderCityList()}
    </div>
  )
})
 
CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData:PropTypes.object,
  isLoading:PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired
}

export default CitySelector