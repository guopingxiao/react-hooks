import dayjs from 'dayjs'

export const MS_OF_DAY = 24*60*60*1000

/**
 * 将时间戳格式化为标准格式
 * @param {*} date 
 * @param {*} rule 
 */
export function formatDate(date, rule = 'YYYY-MM-DD') { 
  return dayjs(date).format(rule)
}
/**
 * 返回去除时分秒毫秒的时间戳，2020-02-02 周四
 * @param {*} timestamp 
 * @param {*} format 
 */
export function getDayTime(timestamp = Date.now(), format='YYYY-MM-DD') { 
  
  const date = new Date(timestamp)
  // 去除时间的小时 分 秒
  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(0)
  date.setHours(0)

  timestamp = date.getTime()

  let dayTimeFormat = dayjs(timestamp).format(format)
  let formatTime = new Date(timestamp)
  let formatDay = formatTime.getDay()

  let weekDay = '周' + ['日', '一', '二', '三', '四', '五', '六'][formatDay]

  return {
    dayTimeFormat,
    weekDay,
    dayTimestamp: timestamp,
  }
}

export function getCurrentMonthDay(date) { 
  const d = dayjs(date)
  return d.format('M月D日') + d.locale('zh-ch').format('ddd')
}

/**
 * 返回格式化日期的时间戳 如2020-02-02
 * @param {*} formatDate 
 */
export function getFormatDayTime(formatDate) { 
  return getDayTime(dayjs(formatDate).valueOf()).dayTimestamp
}

/**
 * 获取当前月后三个月的时间
 */
export function getMonthTimeStamps(timestamp = Date.now(), months = 3) { 
  
  const date = new Date(timestamp)
  // 去除时间的小时 分 秒
  date.setMilliseconds(0)
  date.setSeconds(0)
  date.setMinutes(0)
  date.setHours(0)
  date.setDate(1) // 设置天为当月第一天

  let monthTimeStamps = [date.getTime()]
  while (months > 1) { 
    date.setMonth(date.getMonth() + 1)
    monthTimeStamps.push(date.getTime())
    months --
  }

  return monthTimeStamps
}

/**
 * 获取一个月里的天，月，年，周的数据
 * @param {*} startTime 
 */
export function getTimesFromStartMonth(startTime) { 
  let startDay = new Date(startTime)
  let days = []
  let weeks = []
  let year = startDay.getFullYear()
  let month = startDay.getMonth()

  let currentDay = new Date(startTime)

  while (currentDay.getMonth() === startDay.getMonth()) { 
    days.push(currentDay.getTime())
    currentDay.setDate(currentDay.getDate() + 1) // 天数加一
  }

  // 每个月前面的补零操作，如果是周日就补6， 其他补周几 -1; 后面周日不补，其他补 7- 周几
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null).concat(days)
  
  const lastDay = new Date(days[days.length - 1])
  days = days.concat(new Array(lastDay.getDay()? 7- lastDay.getDay(): 0).fill(null))
  
  for (let row = 0; row < days.length/ 7; row++) {
    let week = days.slice(row * 7, (row + 1) * 7)
    weeks.push(week)
  }
  
  return {
    days,
    weeks,
    year,
    month
  }
}