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
    Query,
} from 'matter-js';
import { Render } from "./MyRenderer.js";
import './MatterComponent.css';
import { pages } from "./pages.js"

const FONT_FAMILY = "Palatino, Verdana, Tahoma, Arial, sans-serif"; // see App.css

class MatterComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
        this.scene = createRef();
        this.isRunning = false;
    }

    getWidth() {
        console.log("getWidth: " + document.body.clientWidth) // 1280
        return document.body.clientWidth * 0.7; // set to 70% in App.css
    }

    getHeight() {
        console.log("getHeight: " + document.body.clientHeight) // 675
        return 500; // setting to 500px in MatterComponent.css
    }

    componentDidMount() {
        if (this.isRunning) { return; }
        console.log("componentDidMount");

        const cw = this.getWidth();
        const ch = this.getHeight();

        const engine = Engine.create();

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

        this.renderPageBodies(engine);

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
    
        Events.on(mouseConstraint, "mouseup", event => {
            let clicked_body = Query.point(engine.world.bodies, event.mouse.position);
            if (clicked_body.length > 0) {
                let page_key = clicked_body[0].id
                let page = pages[page_key]
                console.log("page clicked: " + page.text)
                this.props.onPageSelected(page);
            }
        });

        // run the renderer
        Render.run(render);

        // create runner
        const runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);

        this.isRunning = true;

        this.setState({
            render: render,
        })
        // render.engine.world.bodies
    }

    renderPageBodies(engine) {
        console.log("renderPageBodies");

        const cw = this.getWidth();
        const ch = this.getHeight();

        const wallSettings = {
            isStatic: true
        };

        // remove all existing bodies
        World.remove(engine.world, engine.world.bodies);

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

        for (let page_key in pages) {
            let page = pages[page_key]

            // page filtering based on category
            if (this.props.pageFilter && 
                this.props.pageFilter !== "all" && 
                this.props.pageFilter !== page.category) {
                continue;
            }

            let page_size_base = 10;
            if (page.size === "normal") {
                page_size_base = 15;
            }
            if (page.size === "large") {
                page_size_base = 20;
            }
            let bodySize = page.name.length * page_size_base;
            let x_init = Common.random(0, cw);
            let y_init = Common.random(0, ch);
            let body;
            let bodyType = Common.choose(["rectangle", "circle"]);
            if (bodyType === "rectangle") {
                bodySize = bodySize * 2;
                body = Bodies.rectangle(x_init, y_init, bodySize, bodySize, {
                    ...bodySettings,
                    id: page_key,
                    render: {
                        text:{
                            content: page.name,
                            color: "black",
                            size : 24,
                            family: FONT_FAMILY,
                        },
                    },
                });
            } else { // circle
                body = Bodies.circle(x_init, y_init, bodySize, {
                    ...bodySettings,
                    id: page_key,
                    render: {
                        text:{
                            content: page.name,
                            color: "black",
                            size : 24,
                            family: FONT_FAMILY,
                        },
                    },
                });
            }

            World.add(engine.world, body);
        }
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
        // page filtering via this.props.pageFilter
        console.log("render");
        if (this.isRunning) { this.renderPageBodies(this.state.render.engine); }

        //  style={{ height: '450px' }}

        return (
        <div className="MatterComponent">
            <div ref={this.scene}/>
        </div>
        )
    }
}

export default MatterComponent;
