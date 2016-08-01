//* ChooseGenre.jsx *//
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')

module.exports = React.createClass({
  render: function() {

    return (
      <nav className="navbar navbar-default">
          <div className="container-fluid">
              <div className="navbar-header">
                  <a href="." className="navbar-brand">
                      Board Game Picker
                  </a>
              </div>
          </div>
      </nav>
    )
  }
})
