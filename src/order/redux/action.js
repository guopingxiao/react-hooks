export const ACTION_SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER'
export const ACTION_SET_DEPART_STATION = 'SET_DEPART_STATION'
export const ACTION_SET_ARRIVE_STATION = 'SET_ARRIVE_STATION'
export const ACTION_SET_SEAT_TYPE = 'SET_SEAT_TYPE'
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'
export const ACTION_SET_ARRIVE_DATE = 'SET_ARRIVE_DATE'
export const ACTION_SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR'
export const ACTION_SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR'
export const ACTION_SET_DURATION_STR = 'SET_DURATION_STR'
export const ACTION_SET_PRICE = 'SET_PRICE'
export const ACTION_SET_PASSENGERS = 'SET_PASSENGERS'
export const ACTION_SET_MENU = 'SET_MENU'
export const ACTION_SET_IS_MENU_VISIBLE = 'SET_IS_MENU_VISIBLE'
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED'

export function setTrainNumber(trainNumber) {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber,
  }
}

export function setDepartStation(departStation) {
  return {
    type: ACTION_SET_DEPART_STATION,
    payload: departStation,
  }
}

export function setArriveStation(arriveStation) {
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload: arriveStation,
  }
}

export function setSeatType(seatType) {
  return {
    type: ACTION_SET_SEAT_TYPE,
    payload: seatType,
  }
}

export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate,
  }
}

export function setArriveDate(arriveDate) {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate,
  }
}

export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr,
  }
}

export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr,
  }
}

/**
 * 设置时长
 * @param {*} durationStr 
 */
export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr,
  }
}

/**
 * 设置价格
 * @param {*} price 
 */
export function setPrice(price) {
  return {
    type: ACTION_SET_PRICE,
    payload: price,
  }
}

/**
 * 设置乘客数据
 * @param {*} passengers 
 */
export function setPassengers(passengers) {
  return {
    type: ACTION_SET_PASSENGERS,
    payload: passengers,
  }
}

/**
 * 设置menu数据
 * @param {*} menu 
 */
export function setMenu(menu) {
  return {
    type: ACTION_SET_MENU,
    payload: menu,
  }
}

/**
 * 设置Menu是否可以见
 * @param {*} isMenuVisible 
 */
export function setIsMenuVisible(isMenuVisible) {
  return {
    type: ACTION_SET_IS_MENU_VISIBLE,
    payload: isMenuVisible,
  }
}

export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  }
}

/**
 * 初始化order, fetchOrder数据
 * @param {*} url 
 */
export function fetchInitial(url) {
  return (dispatch, getState) => {

    async function fetchOrder(url) { 
      let data = await (await fetch(url)).json()
      const { departTimeStr, arriveTimeStr, arriveDate, durationStr, price } = data

      dispatch(setDepartTimeStr(departTimeStr))
      dispatch(setArriveTimeStr(arriveTimeStr))
      dispatch(setArriveDate(arriveDate))
      dispatch(setDurationStr(durationStr))
      dispatch(setPrice(price))
    }
    fetchOrder(url)
  }
}

let passengerIdSeed = 0

/**
 * 添加成人
 */
export function createAdult() {
  return (dispatch, getState) => {
    const { passengers } = getState()
    // 判断passengers是否有空字段
    for (let passenger of passengers) {
      const keys = Object.keys(passenger)
      for (let key of keys) {
        if (!passenger[key]) {
          return
        }
      }
    }

    dispatch(
      setPassengers([
        ...passengers,
        { // 添加乘客的初始化值
          id: ++passengerIdSeed,
          name: '',
          ticketType: 'adult',
          licenceNo: '', // 成人有身份证
          seat: 'Z',
        },
      ])
    )
  }
}

/**
 * 添加儿童
 */
export function createChild() {
  return (dispatch, getState) => {
    const { passengers } = getState()

    let adultFound = null

    for (let passenger of passengers) {
      const keys = Object.keys(passenger)
      for (let key of keys) {
        if (!passenger[key]) {
          return
        }
      }

      if (passenger.ticketType === 'adult') {
        adultFound = passenger.id
      }
    }

    if (!adultFound) { // 儿童必须和成人绑定，至少有一个成人
      alert('请至少正确添加一个同行成人')
      return
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: '',
          gender: 'none', // 儿童有性别，没有身份证
          birthday: '',
          followAdult: adultFound,
          ticketType: 'child',
          seat: 'Z',
        },
      ])
    )
  }
}

/**
 * 删除乘客
 * @param {*} id 
 */
export function removePassenger(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()

    const newPassengers = passengers.filter(passenger => {
      return passenger.id !== id && passenger.followAdult !== id // 过滤掉该成人和成人的儿童
    })

    dispatch(setPassengers(newPassengers))
  }
}

/**
 * 更新乘客
 * @param {*} id 
 * @param {*} data 
 * @param {*} keysToBeRemoved ， 在更新儿童票、成人票的时候，有些字段被删除
 */
export function updatePassenger(id, data, keysToBeRemoved = []) {
  return (dispatch, getState) => {
    const { passengers } = getState()

    for (let i = 0; i < passengers.length; ++i) {
      if (passengers[i].id === id) {// 找到乘客 更新信息 并 break
        const newPassengers = [...passengers]
        newPassengers[i] = Object.assign({}, passengers[i], data)

        for (let key of keysToBeRemoved) {
          delete newPassengers[i][key]
        }

        dispatch(setPassengers(newPassengers))

        break
      }
    }
  }
}

/**
 * 展示底部menu
 * @param {*} menu 
 */
export function showMenu(menu) {
  return dispatch => {
    dispatch(setMenu(menu))
    dispatch(setIsMenuVisible(true))
  }
}
/**
 * 隐藏底部menu
 */
export function hideMenu() {
  return setIsMenuVisible(false)
}

/**
 * 展示性别Menu
 * @param {*} id 
 */
export function showGenderMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()

    const passenger = passengers.find(passenger => passenger.id === id)

    if (!passenger) {
      return
    }

    dispatch(
      showMenu({
        // menu点击事件
        onPress(gender) {
          dispatch(updatePassenger(id, { gender }))
          dispatch(hideMenu())
        },
        title:'性别',
        // menu数据
        options: [
          {
            title: '男',
            value: 'male',
            active: 'male' === passenger.gender,
          },
          {
            title: '女',
            value: 'female',
            active: 'female' === passenger.gender,
          },
        ],
      })
    )
  }
}

/**
 * 选择同行成人Menu
 * @param {*} id 
 */
export function showFollowAdultMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()

    const passenger = passengers.find(passenger => passenger.id === id)

    if (!passenger) {
      return
    }

    dispatch(
      showMenu({
        onPress(followAdult) { // 更新儿童的followAdult 为对应adult.id
          dispatch(updatePassenger(id, { followAdult }))
          dispatch(hideMenu())
        },
        title: '同行成人',
        options: passengers
          .filter(passenger => passenger.ticketType === 'adult')
          .map(adult => { // 显示所有成人列表
            return {
              title: adult.name,
              value: adult.id,
              active: adult.id === passenger.followAdult,
            }
          }),
      })
    )
  }
}

/**
 * 展示成人票、儿童票Menu
 * @param {*} id 
 */
export function showTicketTypeMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()

    const passenger = passengers.find(passenger => passenger.id === id)

    if (!passenger) {
      return
    }

    dispatch(
      showMenu({
        onPress(ticketType) {
          if ('adult' === ticketType) { // 儿童切成人，删除gender', 'followAdult', 'birthday，增加身份证号licenceNo
            dispatch(
              updatePassenger(
                id,
                {
                  ticketType,
                  licenceNo: '',
                },
                ['gender', 'followAdult', 'birthday']
              )
            )
          } else {
            const adult = passengers.find(
              passenger => passenger.id !== id && passenger.ticketType === 'adult'
            )

            if (adult) {// 成人切儿童
              dispatch(
                updatePassenger(
                  id,
                  {
                    ticketType,
                    gender: '',
                    followAdult: adult.id,
                    birthday: '',
                  },
                  ['licenceNo']
                )
              )
            } else {
              alert('没有其他成人乘客')
            }
          }

          dispatch(hideMenu())
        },
        title:'车票类型',
        options: [
          {
            title: '成人票',
            value: 'adult',
            active: 'adult' === passenger.ticketType,
          },
          {
            title: '儿童票',
            value: 'child',
            active: 'child' === passenger.ticketType,
          },
        ],
      })
    )
  }
}
