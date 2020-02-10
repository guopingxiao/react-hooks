function Foo(props){
  const [size, setSize] = useState([widow.innerWidth, window.innerHeight])

  useEffect(()=>{
    document.title = size.join('x')
  })

  const onResize = ()=>{
    setSize([widow.innerWidth, window.innerHeight])
  }

  useEffect(()=>{
    window.addEventListener('resize', onResize)

    return ()=>{
      window.removeEventListener('resize', onResize)
    }
  })

  return (
    <div>
    {size.width}x{size.height}
    </div>
  )
}