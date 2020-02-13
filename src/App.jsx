import React, { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';

// function Counter (props){
//     return (
//       <h1>useContext:{props.count}</h1>
//     )
// }

function useCounter(count) { 
  const size = useSize()
  return (
    <h1>count:{count}--{size.width}x{size.heigth}</h1>
  )
}

function useCount(defaultCount) { 
  const [count, setCount] = useState(defaultCount)
  const it = useRef()
  
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

  return [count, setCount]
}

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    heigth: document.documentElement.clientHeight
  })

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      heigth: document.documentElement.clientHeight
    })
  },[])

  useEffect(() => { 
    window.addEventListener('resize', onResize, false)
    
    return () => { 
      window.removeEventListener('resize', onResize, false)
    }
  }, [onResize])
  
  return size
}

function App() {
  const [count, setCount] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()


  return (
      <div>
        <button
          type="button"
          onClick={() => setCount(count + 1)}>
          Add
        </button>
      {Counter}
      count:{count} -- {size.width}x{size.heigth}
      </div>
    )
}

export default App;
