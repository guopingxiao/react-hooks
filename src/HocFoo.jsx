import React, { Component } from "react"

// 这个和属性渲染的区别是，这里是一个函数，不在是一个组件，这个函数在运行时 动态创建一个包装类组件；
// 这包装类组件有两个任务：1.维护state状态 2.确定resize的第一个组件参数Child
function resizable(Child){
  return class Resizable extends Component{
    state = {
      size: [widow.innerWidth, window.innerHeight]
    }

    onResize = ()=>{
      this.setState({
        size: [widow.innerWidth, window.innerHeight]
      })
    }

    componentDidMount(){
      window.addEventListener("resize", this.onResize)
    }

    componentWillUpdate(){
      window.removeEventListner('resize', this.onResize)
    }

    render(){
      const size = this.props.size
      return <Child size={size} />
    }
  }
}

class Foo extends Component{
  render(){
    const [width, height] = this.props.size
    return (
      <div>
      {width}x{height}
      </div>
    )
  }
}

const WrapperFoo = resizable(Foo)
