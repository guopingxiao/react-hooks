import React, { useState, useMemo, useRef, useCallback, useEffect, PureComponent } from 'react';
import './App.css';

// const Counter = memo(function Counter(props) {
//   console.log('Counter click')
//   return (
//     <h1 onClick={props.onClick}>useContext:{props.count}</h1>
//   )
// })

class Counter extends PureComponent { 

  speak() { 
    console.log(`now count is ${this.props.count}`)
  }
  render() { 
    const { props } = this
    return (
      <h1 onClick={props.onClick}>useContext:{props.count}</h1>
    )
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  // 只有在count===3前后两次变化的时候依赖项才会变化，double才会重新计算
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const double = useMemo(() => count * 2, [count === 3])
  
  const counterRef = useRef()
  let it = useRef()

  const onClick = useCallback(() => { 
    console.log('click')
    // 一般事件都会改变状态的
    setClickCount((clickCount) => clickCount + 1)
    // console.log(counterRef.current)
    counterRef.current.speak()
  }, [counterRef]) 
  
  useEffect(() => {
    it.current = setInterval(() => { 
      setCount(count=> count + 1)
    },1000)
  }, [])

  useEffect(() => { 
    if (count >= 10) {
      clearInterval(it.current)
    }
  })
  
  return (
      <div>
        <button
          type="button"
          onClick={() => setCount(count + 1)}>
          Add
        </button>
      <Counter ref={counterRef} onClick={onClick} count={double}></Counter>
      count:{count}, double:{double},  clickCount:{clickCount}
      </div>
    )

}


export default App;
