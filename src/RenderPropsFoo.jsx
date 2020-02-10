import React, { Component } from "react"

// 抽离渲染的逻辑到Resiable, 渲染父组件传入的size 和render来渲染
class Resizable extends Component{
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
    return this.props.render(this.props.size)
  }
}


// 这样父组件就简单很多了,再也不用关心窗口resize的问题了，只是从传入组件中获取；
// 这样这个Resizable组件就能复用了，想使用这个功能，直接用Resize组件报一下就可以了
// 用一个函数组件的渲染结果来当自己的渲染结果，这相当于父组件进入了Resize组件，有点类似闭包的感觉；
// 高阶组件就是这个思想；异曲同工之妙，都是一层组件的包装；
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

<Resizable render={size => <Foo size={size} /> />
