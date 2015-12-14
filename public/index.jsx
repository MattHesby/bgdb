//* index.jsx *//
'use strict';
var React = require('react')
var ReactDOM = require('react-dom')
// window.ReactDOM = ReactDOM;
var BGDisplay = require('./BGDisplay.jsx')
// var AddGame = require('./AddGame.jsx')
ReactDOM.render(<BGDisplay/>, document.getElementById('content'))
