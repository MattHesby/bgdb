/** @jsx React.DOM */
'use strict'
var React = require('react')
var Hello = require('./Hello')
var GamesToPlay = require('./GamesToPlay')
var BGDisplay = require('./BGDisplay')
React.renderComponent(<BGDisplay />, document.getElementById('content'))
