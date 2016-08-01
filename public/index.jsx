//* index.jsx *//
'use strict';
var React = require('react')
var ReactDOM = require('react-dom')

// window.ReactDOM = ReactDOM;
var BGDisplay = require('./BGDisplay.jsx')
var Home = require('./Home.jsx')
var AddGame = require('./AddGame.jsx')
ReactDOM.render( <Home/>, document.getElementById('content'))
