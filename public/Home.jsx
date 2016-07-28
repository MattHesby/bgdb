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

    var leftButton = {
      float: "left",
      display: "block",
    }
    var mainStyle = {
      paddingTop: "50px",
    }

    var addGameWidth = {
      width: "400px",
    }
    var bggUserStyle = {
      float:"right"
    }

    return (
      <div className="container">
        <nav style={addGameWidth} id="myNavmenu" className="navmenu navmenu-default navmenu-fixed-left offcanvas" role="navigation">
          <ul className="nav navmenu-nav">
            <AddGame  loadGamesFromServer={this.loadGamesFromServer}/>
          </ul>
        </nav>

        <div className="navbar navbar-default navbar-fixed-top">

          <Link to="/see-games" style={leftButton} type="button" className="navbar-toggle" data-toggle="offcanvas" data-target="#myNavmenu" data-canvas="body">
            Add A Game
          </Link>

          <ul style={bggUserStyle}>
            <ChooseBGGUser loadGamesFromServer={this.loadGamesFromServer}/>
          </ul>
        </div>
      </div>
    )
  }
})
