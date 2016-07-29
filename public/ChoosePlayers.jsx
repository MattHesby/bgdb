//* ChoosePlayers *//
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')

module.exports = React.createClass({
  render: function() {
    return (

      <div className="col-md-2 col-md-offset-4 ">
        <p>
          How Many Players?
        </p>
        <select className="form-control" defaultValue={this.props.gNumPlayers} onChange={this.props.handler}>
          <option value="Any">
            Any
          </option>
          <option value="1">
            1
          </option>
          <option value="2">
            2
          </option>
          <option value="3">
            3
          </option>
          <option value="4">
            4
          </option>
          <option value="5">
            5
          </option>
          <option value="6">
            6
          </option>
          <option value="more">
            more
          </option>
        </select>
      </div>


    )
  }
})
