import React, { Component, useState, useEffect } from 'react';
import './App.css';

class App2 extends Component { 
  state = {
    count: 0,
    size: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }

  onResize = ()=>{
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    })
  }

  componentDidMount(){
    window.addEventListener('resize', this.onResize, false)
    document.title = this.state.count
  }

  // 每次重渲染后 都更新document.title
  componentDidUpdate() {
    document.title = this.state.count
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.onResize, false)
  }

  render() { 
    const {count, size } = this.state 
    return (
      <div>
          <button
            type="button"
            onClick={() => this.setState({count: count + 1})}>
            Add
          </button>
          count:{count},  size:{size.width}x{size.height}
      </div>
    )
  }
} 

function App(){
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })


  const onResize = () => { 
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  useEffect(() => {
    console.log('count', count)
    document.title = count
  }, [count])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      document.removeEventListener('resize', onResize, false)
    };
  }, [])


  const onClick = () => { 
    console.log('click')
  }

  // 这个一个典型的需要频繁清理状态的副作用；
  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick)
    
    return () => {
      document.querySelector('#size').addEventListener('click', onClick)
    };
  })

  
  
  return (
      <div>
        <button
          type="button"
          onClick={() => setCount(count + 1)}>
          Add
        </button>
        count:{count}
      {
        count % 2
          ? <span id="size">size:{size.width}x{size.height}</span>
          : <p id="size">size:{size.width}x{size.height}</p>
      }
      </div>
    )

}


export default App;
