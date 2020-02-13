import React, { useState, useMemo, useCallback, memo } from 'react';
import './App.css';

const Counter = memo(function Counter(props) {
  console.log('Counter click')
  return (
    <h1 onClick={props.onClick}>useContext:{props.count}</h1>
  )
})

function App() {
  
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  // 只有在count===3前后两次变化的时候依赖项才会变化，double才会重新计算
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const double = useMemo(() => count * 2, [count === 3])
  
  const half = useMemo(() => { return double / 4 }, [double])
  
  // const onClick = useMemo(() => { 
  //   return () => { 
  //     console.log('click')
  //   }
  // },[]) 

    const onClick = useCallback(() => { 
      console.log('click')
      // 一般事件都会改变状态的
      setClickCount((clickCount)=> clickCount+1)
  },[]) 
  
  return (
      <div>
        <button
          type="button"
          onClick={() => setCount(count + 1)}>
          Add
        </button>
      <Counter onClick={onClick} count={double}></Counter>
      double:{double} === half: {half},  clickCount:{clickCount}
      </div>
    )

}


export default App;
