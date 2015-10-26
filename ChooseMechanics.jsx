'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var Select = require('react-select');
var SelectPopover  = require("react-select-popover")
var selectFieldName = "my-select";
var selectPlaceholder = "Choose Game Mechanics";

module.exports = React.createClass({
  render: function(){
    return(
<div className="container">
	<p> Mechanics? </p>
	<Select
	name="form-field-name"
	value="Any"
	options={this.props.MECHANICS}
	onChange={this.props.handler}
  multi={true}
	/>
</div>
)
}
})
