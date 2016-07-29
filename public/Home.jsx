//* ChooseGenre.jsx *//
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var AddGame = require('./AddGame.jsx');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var ChooseBGGUser = require('./ChooseBGGUser.jsx');

module.exports = React.createClass({
  loadGamesFromServer: function () {
    $.ajax({
      url: '/games.json',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ bgObj: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {

    return (
      <div>

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand" href="#">
              Board Game Picker
            </Link>
          </div>
        </div>
      </nav>



      <ChooseBGGUser loadGamesFromServer={this.loadGamesFromServer}/>


      </div>
    )
  }
})


          // <Link to="/see-games" style={leftButton} type="button" className="navbar-toggle" data-toggle="offcanvas" data-target="#myNavmenu" data-canvas="body">
          //   Add A Game
          // </Link>
