'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var Select = require('react-select');
var SelectPopover  = require("react-select-popover")

module.exports = React.createClass({
  render: function(){
    return(

<div className="container">
	<p> Complexity? </p>
	<select defaultValue={this.props.gDifficulty}
	onChange={this.props.handler}
	>
		<option value="Any"> Any </option>
		<option value="1"> very easy </option>
		<option value="2"> easy </option>
		<option value="3"> medium </option>
		<option value="4"> hard </option>
		<option value="5"> very hard </option>
	</select>
</div>

)
}
})
