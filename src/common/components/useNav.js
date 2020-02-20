import { useCallback } from 'react'
import { TimeUtil } from '../util/index'

// 这里的dispacth 和action都从引用的页面传入进来，这样更具有通用性，这个是一个common组件
export default function useNav(departDate, dispatch, prevDate, nextDate) { 
  const dateStamp = TimeUtil.getDayTime(departDate).dayTimestamp
  const nowStamp = TimeUtil.getDayTime().dayTimestamp
  const isPrevDisabled = (dateStamp <= nowStamp)
  const isNextDisabled = (dateStamp - nowStamp) > 20 * 24 * 60 * 60 * 1000
  
  const prevClick = useCallback(() => { 
    if (isPrevDisabled) { 
      return
    }
    dispatch(prevDate())
  },[dispatch, isPrevDisabled, prevDate])

  const nextClick = useCallback(() => { 
    if (isNextDisabled) { 
      return 
    }
    dispatch(nextDate())
  }, [dispatch, isNextDisabled, nextDate])
  
  return {
    isPrevDisabled,
    isNextDisabled,
    prevClick,
    nextClick
  }
}