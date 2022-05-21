import { PureComponent, createRef } from 'react';
import { 
    Engine, 
    Render, 
    Runner,
    Common,
    Composite,
    MouseConstraint,
    Mouse,
    Vertices,
    Bodies, 
    World,
    Svg,
    Constraint
    // Events 
} from 'matter-js';
import './MatterComponent.css';
import { letterSvgPaths } from "./constants.js"

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
        const ball = Bodies.circle(200, 200, 25, {...ballSettings})

        World.add(engine.world, [
          // walls
          Bodies.rectangle(cw / 2, -10, cw, 20, wallSettings),
          Bodies.rectangle(-10, ch / 2, 20, ch, wallSettings),
          Bodies.rectangle(cw / 2, ch + 10, cw, 20, wallSettings),
          Bodies.rectangle(cw + 10, ch / 2, 20, ch, wallSettings),
        ]);
    
        World.add(engine.world, [boxA, boxB, ball]);
    
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

        this.addStrSvgToWorld(engine.world, "abcde");
    }
    
    addStrSvgToWorld(world, str) {
        // required for using Bodies.fromVerticies
        Common.setDecomp(require('poly-decomp'));

        // required for using Svg.pathToVerticies: https://github.com/progers/pathseg
        require("pathseg");

        const color = Common.choose(['#fff', '#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);

        // let body = this.charToMatterBody(str, color)
        // Composite.add(world, body)

        let bodies = []
        let constraints = []
        for (let i=0; i<str.length; i++) {
            let body = this.charToMatterBody(str[i], color)
            bodies.push(body)
            // if i==0, add to bodies array, don't add contraint yet
            if (i === 0) {
                continue
            }
            // add constraints to all prev chars in str
            for (let j=i-1; j>=0; j--) {
                let constraint = Constraint.create({
                    bodyA: bodies[j],
                    bodyB: body,
                    length: 42 * (i-j), // multiply by 'distance' from i to j
                    render: { anchors: false, lineWidth: 0, visible: false },
                });
                constraints.push(constraint)
            }
        }

        Composite.add(world, [...bodies, ...constraints])
    }

    charToMatterBody = (str, color) => {
        const pathEl = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        )
        if (letterSvgPaths[str] === undefined) {
            console.log(str)
            throw "str not found in letterSvgPaths"
        }

        const letterPath = letterSvgPaths[str];
        pathEl.setAttribute('d', letterPath)
        
        const verticies = Svg.pathToVertices(pathEl, 2)

        return Bodies.fromVertices(50, 50, Vertices.scale(verticies, 0.8, 0.8), {
          render: {
            fillStyle: color,
            strokeStyle: color,
            lineWidth: 1,
          }
        })
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
