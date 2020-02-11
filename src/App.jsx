import React, { useState, createContext, Component, useContext } from 'react';
import './App.css';

const CountContext = createContext()

class Foo extends Component { 
  render() { 
    return (
      <CountContext.Consumer>
        {
          count => <h1>Consumer:{count}</h1>
        }
      </CountContext.Consumer>
    )
  }
}

class Bar extends Component { 
  static contextType = CountContext
  render() { 
    const count = this.context
    return (
          <h1>contextType:{count}</h1>
    )
  }
}

function Counter() { 
  const count = useContext(CountContext)
  return (
    <h1>useContext:{count}</h1>
  )
}

function App() {
  
  const [count, setCount] = useState(0)
  
  return (
      <div>
        <button
          type="button"
          onClick={() => setCount(count + 1)}>
          Add
        </button>
      <CountContext.Provider value={count}>
        <Foo></Foo>
        <Bar></Bar>
        <Counter></Counter>
        </CountContext.Provider>
      </div>
    )

}


export default App;
