//* BGDisplay.jsx *//
/////// Figure out how to use this as a REQUIRE////
var dataBlock = {
  color: "green"
}
var container = {
  border: "2px solid black"
}
/////////////////////////////////////////////

'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var boardGameObj = [];

// REACT COMPONENTS //
var GamesToPlay = require('./GamesToPlay.jsx');
var ChooseLength = require('./ChooseLength.jsx');
var ChooseGenre = require('./ChooseGenre.jsx');
var ChooseDifficulty = require('./ChooseDifficulty.jsx');
var ChoosePlayers = require('./ChoosePlayers.jsx')
var ChooseMechanics = require('./ChooseMechanics.jsx');
var AddGame = require('./AddGame.jsx');
var bs = require('react-bootstrap');
var ChooseBGGUser = require('./ChooseBGGUser.jsx');


module.exports = React.createClass({

  getInitialState: function () {
    return { bgObj: boardGameObj, gNumPlayers: "Any", gDifficulty: "Any", gLength: "Any", gGenre: "Any", gMechanics: "Any" }
  },
  // Handlers for each of the different values
  handlePlayers: function (e) {
    this.setState({ gNumPlayers: e.target.value });
  },
  handleDifficulty: function (e) {
    this.setState({ gDifficulty: e.target.value });
  },
  handleLength: function (e) {
    this.setState({ gLength: e.target.value })
  },
  handleGenre: function (e) {
    this.setState({ gGenre: e.target.value })
  },
  handleMechanics: function (val) {

    this.setState({ gMechanics: val });
  },
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


  componentDidMount: function () {
    this.loadGamesFromServer();
  },

  render: function () {
    //sets up Genre Options
    var GENRES = ["Any"]
    for (var game in this.state.bgObj) {
      if (boardGameObj.hasOwnProperty(game)) {
        var curGame = boardGameObj[game];
        GENRES.push(curGame.info.genre);
      }
    }
    for (var i = 0; i < GENRES.length; i++) {
      GENRES[i] = <option value={GENRES[i]}>
        {GENRES[i]}
      </option>
    }
    // Sets up Mechanics Options
    var MECHANICS_OPTIONS = [
      {
        label: "Any",
        value: "Any"
      }, {
        label: "Area Control",
        value: "area-control"
      }, {
        label: "Worker Placement",
        value: "worker-placement"
      }, {
        label: "Trading",
        value: "trading"
      }
    ];

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

    //
    // var MECHANICS = [{label: "Any", value: "Any"}];
    // for (var game in this.state.bgObj) {
    //     if (boardGameObj.hasOwnProperty(game)) {
    //         var curGame = boardGameObj[game];
    //         MECHANICS.push(curGame.info.mechanics);
    //     }
    // }
    // for (var i = 0; i < MECHANICS.length; i++) {
    //     MECHANICS[i] = {label: {MECHANICS[i]}, value: [MECHANICS[i] }
    // }

    // Removed Mechanics and Genre
    // <ChooseMechanics MECHANICS_OPTIONS={MECHANICS_OPTIONS} handler={this.handleMechanics}/>
    // <ChooseGenre GENRES={GENRES} gGenre={this.state.gGenre} handler={this.handleGenre}/>


    // <div className="selection">
    //   <div className="navbar navbar-default">
    //       <a className="navbar-brand"> Board Game Database </a>
    //   </div>
    // </div>


    var bggUserStyle = {
      float:"right"
    }

    return (



      <div>
        <div className="container">


          <nav style={addGameWidth} id="myNavmenu" className="navmenu navmenu-default navmenu-fixed-left offcanvas" role="navigation">

            <ul className="nav navmenu-nav">
              <AddGame  loadGamesFromServer={this.loadGamesFromServer}/>
            </ul>

          </nav>

          <div className="navbar navbar-default navbar-fixed-top">
            <button style={leftButton} type="button" className="navbar-toggle" data-toggle="offcanvas" data-target="#myNavmenu" data-canvas="body">
              Add A Game

            </button>

            <ul style={bggUserStyle}>
              <ChooseBGGUser loadGamesFromServer={this.loadGamesFromServer}/>
              </ul>
          </div>

        </div>

        <div className="container" style={mainStyle}>


          <h1 className="title text-center"> Choose your Boardgame Type</h1>

          <div className="row">
            <ChoosePlayers gNumPlayers={this.state.gNumPlayers} handler={this.handlePlayers}/>
            <ChooseDifficulty gDifficulty={this.state.gDifficulty} handler={this.handleDifficulty}/>
            <ChooseLength gLength={this.state.gLength} handler={this.handleLength}/>
          </div>

          <div>
            <GamesToPlay loadGamesFromServer={this.loadGamesFromServer} bgObj={this.state.bgObj} genre={this.state.gGenre} mechanics={this.state.gMechanics} players={this.state.gNumPlayers} difficulty={this.state.gDifficulty} gLength={this.state.gLength}/>
          </div>
        </div>
      </div>
    )
  }
});
