
// https://brm.io/matter-js/
// https://github.com/liabru/matter-js
// https://brm.io/matter-js/docs/
// https://github.com/liabru/matter-js/wiki/Tutorials

// https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics

// can maybe do svg's

// ref: /Users/leo_landau/Documents/MacBook Pro/2018/2018 02 February/leolandau.com
// ref: /Users/leo_landau/Documents/MacBook Pro/2019/2019 08 August/leolandau.com

// cd /Users/leo_landau/documents/leolandau.com/ll-website

// https://danmarshall.github.io/google-font-to-svg-path/
// roboto, 500, Separate characters

// https://dev.to/thormeier/throwing-around-text-kinetic-typography-part-2-it-defies-gravity-itself-thanks-to-matterjs-239e

// https://mitsuyawatanabe.medium.com/physics-of-text-using-matter-js-f2b7a6ed3f3b

// ref: https://www.fabiofranchino.com/blog/how-to-use-matter-js-in-react-functional-component/
// ref: https://pusher.com/tutorials/react-native-pong-game/
// ref: https://github.com/liabru/matter-js/blob/master/examples/svg.js
// https://morioh.com/p/0b2784e4ca94

// https://github.com/liabru/matter-js/issues/427:  I'm going to guess the solution is going to involve something like Matter.Mouse.setElement(mouseConstraint.mouse, canvasRef.current) inside a React useEffect?

// https://reactjs.org/docs/refs-and-the-dom.html


// _____
// https://github.com/liabru/matter-js/blob/master/examples/ballPool.js
// https://github.com/liabru/matter-js/blob/master/examples/svg.js
// https://brm.io/matter-js/docs/classes/Svg.html
// _____


// https://github.com/liabru/matter-js/blob/master/examples/constraints.js
// https://brm.io/matter-js/docs/classes/Constraint.html

// tried stenciled fonts here: https://www.1001fonts.com/stenciled+google-web-fonts.html
// didn't work well

// tried to have multiple letters in a single svg-path; didn't work with Matter's rendering

// can use Maker.js to render fonts to svg paths:
// https://maker.js.org/
// https://github.com/danmarshall/google-font-to-svg-path/blob/master/index.js
// but it does not looks good on the screen

// => do not use svg's, use shapes with text on top

// used this to support text on shapes in MyRenderer: 
// https://github.com/liabru/matter-js/issues/321

