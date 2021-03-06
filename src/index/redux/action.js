export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE'
export const ACTION_SET_IS_SELECTING_LEFT_CITY = 'IS_SELECTING_LEFT_CITY'
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA'
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA'
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE'
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED'

export function setFrom(from) { 
  return {
    type: ACTION_SET_FROM,
    payload:from
  }
}

export function setTo(to) { 
  return {
    type: ACTION_SET_TO,
    payload: to
  }
}

export function setIsLoadingCityData(isLoadingCityData) { 
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoadingCityData
  }
}

export function setCityData(cityData) { 
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData
  }
}

export function setDepartDate(departDate) {
  return {
      type: ACTION_SET_DEPART_DATE,
      payload: departDate,
  };
}


/** 高铁切换action, 异步action，依赖上一个state */
export function toggleHighSpeed() { 
  return (dispatch, getState) => { 
    const { highSpeed } = getState()
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed
    })
  }
}

/* 显示城市选择的面板，需要派发城市选择面板和左侧城市面板是否在选择的action*/
export function showCitySelector(isSelectingLeftCity) { 
  return (dispatch) => { 
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    })

    dispatch({
      type: ACTION_SET_IS_SELECTING_LEFT_CITY,
      payload: isSelectingLeftCity
    })
  }
}

/* 隐藏城市选择 */
export function hideCitySelector() { 
  return (dispatch) => { 
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: false
    })
  }
}

/* 设置选择城市 */
export function setSelectCity(city) { 
  return (dispatch, getState) => { 
    const { isSelectingLeftCity } = getState()

    if (isSelectingLeftCity) {
      dispatch(setFrom(city))
    } else { 
      dispatch(setTo(city))
    }

    dispatch(hideCitySelector())
  }
}

export function showDateSelector() { 
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true
  }
}

export function hideDateSelector() { 
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false
  }
}

/* 交换城市 */
export function exchangeFromTo() {
  return (dispatch, getState) => {
      const { from, to } = getState();
      dispatch(setFrom(to));
      dispatch(setTo(from));
  };
}

// 异步获取城市数据
export function fetchCityData() { 
  return async(dispatch, getState) => { 
    const { isLoadingCityData } = getState()
    if (isLoadingCityData) { 
      return
    }
    try {
      let cacheCityData = JSON.parse(localStorage.getItem('cache_cityData') || '{}')
      if (Date.now() < cacheCityData.expire) { 
        dispatch(setCityData(cacheCityData.data))
        return
      }

      dispatch(setIsLoadingCityData(true))
      let data = await (await fetch('/api/citylist')).json()
      dispatch(setIsLoadingCityData(false))
      if (data && data.code === 200 && data.cityData) {
        dispatch(setCityData(data.cityData))
        
        localStorage.setItem('cache_cityData', JSON.stringify({
          expire: Date.now() + 60 * 1000 * 60 * 24,
          data:data.cityData
        }))
      }
    } catch (error) {
      console.log(error)
      dispatch(setIsLoadingCityData(false))
    }
  }

}