'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var Select = require('react-select');
var SelectPopover  = require("react-select-popover")

module.exports = React.createClass({
  render: function(){
    return(<div className="container">
	   <p> Genre? </p>
	    <select defaultValue={this.props.gGenre}
	    onChange={this.props.handler}
	    >
	    {this.props.GENRES}
	    </select>
    </div>
  )
  }
})
