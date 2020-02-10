import React, { Component, createContext } from 'react';
import './App.css';

const BatteryContext = createContext()
const OnlineContext = createContext()

class Leaf extends Component { 
  render() { 
    return (
      <BatteryContext.Consumer>
        {
          battery => (
            <OnlineContext.Consumer>
              {
                online => <h1>Battery: {battery}, Online: {String(online)}</h1>
              }
            </OnlineContext.Consumer>
          )
        }
      </BatteryContext.Consumer>
    )
  }
}

class Middle extends Component { 
  render() { 
    return <Leaf />
  }
}

class App extends Component { 
  state = {
    online: false,
    battery: 60
  }

  render() { 
    const { battery, online } = this.state
    
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={() => this.setState({ battery: battery + 1 })}>
            Add
          </button>

          <button
            type="button"
            onClick={() => this.setState({ online: !online })}>
            Switch
          </button>

          <Middle></Middle>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }
  
}


export default App;
