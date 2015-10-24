'use strict'

console.log('foo')
console.log("bar")

var React = require('react')
var ReactDOM = require('react-dom')
// window.ReactDOM = ReactDOM;


// var Hello = require('./Hello.jsx')
// var GamesToPlay = require('./GamesToPlay.jsx')
var BGDisplay = require('./BGDisplay.jsx')
ReactDOM.render(<BGDisplay />, document.getElementById('content'))
