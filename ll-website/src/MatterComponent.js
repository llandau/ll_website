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
    // Events 
} from 'matter-js';
import './MatterComponent.css';
import l_svg from './images/L.svg';

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


        //////
        // required for using Bodies.fromVerticies
        Common.setDecomp(require('poly-decomp'));

        // required for using Svg.pathToVerticies: https://github.com/progers/pathseg
        require("pathseg");
        //////


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

        ///////

        this.addSvgToWorld(engine.world, l_svg);

        ///////
    }

    toVertices = path => {
        const pathEl = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        )
        pathEl.setAttribute('d', path)
        return Svg.pathToVertices(pathEl, 2)
    }
    
    toBody = function (letter) {
        const vertices = this.toVertices(letter)
      
        return Bodies.fromVertices(0, 0, Vertices.scale(vertices, 0.8, 0.8), {
          render: {
            fillStyle: '#fff',
            strokeStyle: '#fff',
            lineWidth: 1,
          }
        })
    }
    
    getLetter(letter) {
        const letters = {
            "A": 'M 18 114 46 114 70 37 81 74 57 74 51 94 87 94 93 114 121 114 81 7 57 7 z',
            "U": 'M 16 7 16 82 C 17 125 101 125 99 82 L 99 82 99 7 74 7 74 82 C 73 100 41 99 41 82 L 41 82 41 7 16 7 z',
            "W": 'M 6 7 29 114 56 114 70 53 84 114 111 114 134 7 108 7 96 74 81 7 59 7 44 74 32 7 6 7 z',
            "N": 'M 16 114 16 7 42 7 80 74 80 7 106 7 106 114 80 114 42 48 42 114 16 114 z',
            "P": 'M 20 8 20 114 46 114 46 28 66 28 C 83 28 83 59 66 58 L 66 58 46 58 46 78 67 78 C 116 78 116 7 65 8 L 65 8 z',
            "D": 'M 19 7 57 7 C 120 13 120 109 57 114 L 57 114 45 114 45 94 56 94 C 85 93 86 30 56 27 L 56 27 45 27 45 114 19 114 19 7 z',
            "O": 'M 13 59 C 9 -12 109 -12 107 59 L 107 59 80 59 C 84 14 34 14 39 59 L 39 59 C 33 107 86 107 80 59 L 80 59 107 59 C 109 133 9 133 13 59 L 13 59 z',
            "R": 'M 21 114 21 7 64 7 C 122 8 105 67 85 69 L 85 69 107 113 80 113 61 76 47 76 47 56 65 56 C 84 57 84 26 65 27 L 65 27 47 27 47 114 z',
            "L": "M 12.354 0 L 12.354 61.23 L 44.629 61.23 L 44.629 71.094 L 0 71.094 L 0 0 L 12.354 0 Z",
        }
        return letters[letter.toUpperCase()];
    }

    addSvgToWorld(world, svg) {
        const color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
        // const svg_dom = new window.DOMParser().parseFromString(svg, 'image/svg+xml');
        // const paths = Array.prototype.slice.call(svg_dom.querySelectorAll('path'));
        // const vertexSets = paths.map((path) => Svg.pathToVertices(path, 30) );

        // const W = 'M 6 7 29 114 56 114 70 53 84 114 111 114 134 7 108 7 96 74 81 7 59 7 44 74 32 7 6 7 z'
        // const l_set = [l]
        // const vertexSets = l_set.map((path) => Svg.pathToVertices(path, 30) );

        // const bodies = Bodies.fromVertices(400, 80, vertexSets, {
        //     render: {
        //         fillStyle: color,
        //         strokeStyle: color,
        //         lineWidth: 1
        //     }
        // }, true);
        // Composite.add(world, bodies);

        Composite.add(world, this.toBody(this.getLetter("O")))
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
