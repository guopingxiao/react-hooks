import React, { Component, lazy, Suspense } from 'react';
import './App.css';


const About = lazy(()=> import(/*webpackChunkName:"about"*/'./About'))
class App extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError() { 
    return {
      hasError: true
    }
  }

  render() { 
    if (this.state.hasError) { 
      return (<div>error</div>)
    }
    return (
      <div>
        <Suspense fallback={<div>loading</div>}>
          <About></About>
        </Suspense>
      </div>
    )
  }
  
}


export default App;
