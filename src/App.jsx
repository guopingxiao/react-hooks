import React, { Component, useState } from 'react';
import './App.css';

//   

function App(props){
  // const defaultValue = props.defaultValue || 0, 每次渲染都会执行，没必要
  const [count, setCount] = useState(()=>{
    console.log('init default value')
    return props.defaultValue || 1
  })
  const [name, setName] = useState('xiaoguoping')
  
  return (
      <div>
        <button
          type="button"
          onClick={() => setCount(count + 1)}>
          Add
        </button>
        count:{count},  name:{name}
      </div>
    )

}


export default App;
