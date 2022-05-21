
### Notes for website

#### Using Matter.js for Physics rendering
// https://brm.io/matter-js/
// https://github.com/liabru/matter-js

#### I tried to render svg's with the Matter.js library but it did not work well

```
// can maybe do svg's
// I did get a poc like this working but the text doesn't look good due to no support for bodies with holes.
// https://dev.to/thormeier/throwing-around-text-kinetic-typography-part-2-it-defies-gravity-itself-thanks-to-matterjs-239e

// https://mitsuyawatanabe.medium.com/physics-of-text-using-matter-js-f2b7a6ed3f3b
// ref: https://www.fabiofranchino.com/blog/how-to-use-matter-js-in-react-functional-component/
// ref: https://pusher.com/tutorials/react-native-pong-game/
// ref: https://github.com/liabru/matter-js/blob/master/examples/svg.js
// https://morioh.com/p/0b2784e4ca94
// https://github.com/liabru/matter-js/blob/master/examples/svg.js
// https://brm.io/matter-js/docs/classes/Svg.html
// https://github.com/liabru/matter-js/blob/master/examples/constraints.js
// https://brm.io/matter-js/docs/classes/Constraint.html
// https://github.com/liabru/matter-js/blob/master/examples/ballPool.js

// font to svg example / impl
// https://danmarshall.github.io/google-font-to-svg-path/
// roboto, 500, Separate characters

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

```

https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics

#### dev location on my laptop
```
cd /Users/leo_landau/documents/leolandau.com/ll-website
npm start
```


