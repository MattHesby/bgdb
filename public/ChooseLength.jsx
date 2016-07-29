//* ChooseLength.jsx *//
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')

module.exports = React.createClass({
  render: function() {
    return (
  
      <div className="col-md-2">
        <p>
          Length?
        </p>
        <select className="form-control" defaultValue={this.props.gLength} onChange={this.props.handler}>
          <option value="Any">
            Any
          </option>
          <option value="30">
            30 Minutes or Less
          </option>
          <option value="60">
            30 Minutes - 1 Hour
          </option>
          <option value="90">
            1 - 2 Hours
          </option>
          <option value="240">
            2 - 4 Hours
          </option>
          <option value="300">
            4+ Hours
          </option>
        </select>
      </div>

    )
  }
})
