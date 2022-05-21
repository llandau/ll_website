import { PureComponent, createRef } from 'react';
import { 
    Common,
    Composite, 
    Engine, 
    Runner,
    MouseConstraint,
    Mouse,
    Body,
    Bodies, 
    World,
    Events,
} from 'matter-js';
import { Render } from "./MyRenderer.js";
import './MatterComponent.css';
import { pages } from "./pages.js"

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

        const wallSettings = {
            isStatic: true
        };

        World.add(engine.world, [
            // walls, width is 40, with -20 'outside' the bounds
            Bodies.rectangle(cw / 2, -20, cw, 40, wallSettings),
            Bodies.rectangle(-20, ch / 2, 40, ch, wallSettings),
            Bodies.rectangle(cw / 2, ch + 20, cw, 40, wallSettings),
            Bodies.rectangle(cw + 20, ch / 2, 40, ch, wallSettings),
        ]);

        const bodySettings = {
            inertia: 0,
            friction: 0.01,
            frictionStatic: 0,
            frictionAir: 0.01,
            restitution: 0.9,
            density: 0.0005,
        };

        for (let page of pages) {
            console.log(page.name);
            let bodyType = Common.choose(["rectangle", "circle"]);
            let bodySize = page.name.length * 10;
            let x_init = Common.random(0, cw);
            let y_init = Common.random(0, ch);
            let body;
            if (bodyType === "rectangle") {
                bodySize = bodySize * 2;
                body = Bodies.rectangle(x_init, y_init, bodySize, bodySize, {
                    ...bodySettings,
                    id: page.id,
                    render: {
                        text:{
                            content: page.name,
                            color: "black",
                            size : 24,
                            family: "Roboto",
                        },
                    },
                });
            } else { // circle
                body = Bodies.circle(x_init, y_init, bodySize, {
                    ...bodySettings,
                    id: page.id,
                    render: {
                        text:{
                            content: page.name,
                            color: "black",
                            size : 24,
                            family: "Roboto",
                        },
                    },
                });
            }

            World.add(engine.world, body);
        }

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

    explosion = function(engine) {
        var bodies = Composite.allBodies(engine.world);

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (!body.isStatic && body.position.y >= 500) {
                var forceMagnitude = 0.05 * body.mass;

                Body.applyForce(body, body.position, {
                    x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
                    y: -forceMagnitude + Common.random() * -forceMagnitude
                });
            }
        }
    };

    render() {
        return (
        <div className="MatterComponent">
            <div ref={this.scene} style={{ height: '450px' }} />
        </div>
        )
    }
}

export default MatterComponent;
