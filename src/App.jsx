import React, { Component, memo, PureComponent } from 'react';
import './App.css';

// const Foo = memo(function Foo(props) {
//   console.log('Foo Render')
//   return <div>{props.person.name}</div>
// })

// function Foo(props) {
//   console.log('Foo Render')
//   return <div>{props.person.name}</div>
// }

class Foo extends PureComponent { 
  
}
 

class App extends Component { 
  state = {
    count: 1,
    person: {
      name: 'xiaoguoping',
      age: 18
    }
  }

  render() { 
    const { person, count } = this.state
    
    return (
      <div>
        <button
          type="button"
          onClick={() => this.setState({ count: this.state.count + 1 })}>
          Add
        </button>
        {count}
        <Foo person={person}></Foo>
      </div>
    )
  }
  
}


export default App;
