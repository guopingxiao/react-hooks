import React, { Component } from "react";

class Foo extends Component { 
  state = {
    size: [window.innerWidth, window.innerHeight]
  }

  onResize = ()=>{
    this.setState({
      size: [window.innerWidth, window.innerHeight]
    })
  }

  componentDidMount(){
    window.addEventListener("resize", this.onResize)
    document.title = this.props.size.join('x')
  }

  // 每次重渲染后 都更新document.title
  componentDidUpdate(){
    document.title = this.props.size.join('x')
  }

  componentWillUpdate(){
    window.removeEventListner('resize', this.onResize)
  }
  render() { 
    return (<h1>About</h1>)
  }
}