import { PureComponent, createRef } from 'react';
import { 
    Engine, 
    Runner,
    MouseConstraint,
    Mouse,
    Bodies, 
    World,
} from 'matter-js';
import { Render } from "./MyRenderer.js";
import './MatterComponent.css';

class MatterComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
        this.scene = createRef();
        this.isRunning = false
    }

    componentDidMount() {
        if (this.isRunning) { return; }
        console.log("componentDidMount")

        const engine = Engine.create();

        const cw = document.body.clientWidth
        const ch = document.body.clientHeight
    
        console.log("cw: " + cw) // 896
        console.log("ch: " + ch) // 509

        const render = Render.create({
            element: this.scene.current,
            engine: engine,
            options: {
                width: cw,
                height: ch,
                wireframes: false,
                background: "transparent",
            }
        });

        const ballSettings = {
            inertia: 0,
            friction: 0,
            frictionStatic: 0,
            frictionAir: 0,
            restitution: 1, // try: 0.5
        };
        
        const wallSettings = {
            isStatic: true
        };

        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        const ballA = Bodies.circle(200, 200, 25, {...ballSettings})
        const ballB = Bodies.circle(250, 50, 25, {
            ...ballSettings,
            restitution:0.95,
            friction:0.05,
            density:0.0005,
            render: {
                fillStyle: "#C44D58",
                text:{
                    content: "Test",
                    color: "black",
                    size : 24,
                    family: "Roboto",
                },
            },
        });

        World.add(engine.world, [
          // walls
          Bodies.rectangle(cw / 2, -10, cw, 20, wallSettings),
          Bodies.rectangle(-10, ch / 2, 20, ch, wallSettings),
          Bodies.rectangle(cw / 2, ch + 10, cw, 20, wallSettings),
          Bodies.rectangle(cw + 10, ch / 2, 20, ch, wallSettings),
        ]);
    
        World.add(engine.world, [boxA, boxB, ballA, ballB]);
    
        // add mouse control
        const mouse = Mouse.create(render.canvas),
          mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
              stiffness: 0.2,
              render: {
                visible: false
              }
            }
          });
    
        World.add(engine.world, mouseConstraint);
    
        // Events.on(mouseConstraint, "mousedown", function(event) {
        //   World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
        // });
    
        // run the renderer
        Render.run(render);

        // create runner
        const runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);

        this.isRunning = true;

        this.setState({
            render: render
        })
        // render.engine.world.bodies
    }

    render() {
        return (
        <div className="MatterComponent">
            <div ref={this.scene} style={{ height: '450px' }} />
        </div>
        )
    }
}

export default MatterComponent;
