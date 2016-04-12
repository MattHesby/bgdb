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
            30min or less
          </option>
          <option value="60">
            30min - 1hr
          </option>
          <option value="90">
            1hr - 2hr
          </option>
          <option value="240">
            2hr - 4hr
          </option>
          <option value="300">
            4hr +
          </option>
        </select>
      </div>
    )
  }
})
