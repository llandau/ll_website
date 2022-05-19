import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World, Runner } from 'matter-js'
import './MatterComponent.css';

// ref: https://www.fabiofranchino.com/blog/how-to-use-matter-js-in-react-functional-component/
// ref: https://pusher.com/tutorials/react-native-pong-game/
// ref: https://github.com/liabru/matter-js/blob/master/examples/svg.js

function MatterComponent (props) {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  const ballSettings = {
    inertia: 0,
    friction: 0,
    frictionStatic: 0,
    frictionAir: 0,
    restitution: 1
  };

  const wallSettings = {
    isStatic: true
  };

  useEffect(() => {
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight

    console.log("cw: " + cw) // 896
    console.log("ch: " + ch) // 509

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    const ball = Bodies.circle(200, 200, 25, {...ballSettings})

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, {...wallSettings}),
      Bodies.rectangle(-10, ch / 2, 20, ch, {...wallSettings}),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, {...wallSettings}),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, {...wallSettings}),
      boxA,
      boxB,
      ball, 
    ])

    Engine.run(engine.current)
    Render.run(render)

    // const runner = Runner.create()
    // Runner.run(runner, engine)

    return () => {
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = e => {
    if (isPressed.current) {
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff'
          }
        })
      World.add(engine.current.world, [ball])
    }
  }

  return (
    <div
      className="MatterComponent"
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseMove={handleAddCircle}
    >
      <div ref={scene} style={{ height: '450px' }} />
    </div>
  )
}

export default MatterComponent
