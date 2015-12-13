////// THIS WILL BE GRABBED FROM SERVER
// Add Description, minPlayer => minPlayers, difficulty is 1 - 5, length is in minutes, gameplay mechanics
// var BgArray = ['{"id":1,"title":"Carcassonne","info":{"difficulty":1,"description":"Carcassonne is a tile-placement game in which the players draw and place a tile with landscape on it.The player can then decide to place one of his meeples on one of the areas on it.","genre":"Abstract","mechanics":"placement, area control"},"players":{"min":2,"max":5},"time":{"minutes":120,"hours":2}}', '{"id":2,"title":"asdf","info":{"difficulty":5,"description":"asdf","genre":"asdf","mechanics":"asdf"},"players":{"min":2,"max":3},"time":{"minutes":60,"hours":1.0}}']

// var BgArray = [];
var boardGameObj = [];
// fetch('http://localhost:3000/games.json')
//   .then(function(response) {
//     console.log(response);
//     return response.json();
//   }).then(function(json) {
//     console.log(module.exports());
//     module.exports.setState({bgObj:[json]});
//   });
// var incBgObj = '{"game1":{"title":"Catan","maxPlayers":2,"minPlayer":6,"difficulty":"medium","length":"normal"},"game2":{"title":"Galaxy","maxPlayers":4,"minPlayers":5,"difficulty":"hard","length":"long"},"game3":{"title":"Trucker","maxPlayers":2,"minPlayers":4,"difficulty":"medium","length":"normal"}}'

/////////// PARSES JSON FROM SERVER//////////////////
// var boardGameObj = [];
// for (var i = 0; i < BgArray.length; i++) {
//   boardGameObj.push(JSON.parse(BgArray[i]));
//   console.log(boardGameObj[i]);
// }
/////////////////////////////////////////////

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

// REACT COMPONENTS //
var GamesToPlay = require('./GamesToPlay.jsx')
var ChooseLength = require('./ChooseLength.jsx')
var ChooseGenre = require('./ChooseGenre.jsx')
var ChooseDifficulty = require('./ChooseDifficulty.jsx')
var ChoosePlayers = require('./ChoosePlayers.jsx')
var ChooseMechanics = require('./ChooseMechanics.jsx');
var AddGame = require('./AddGame.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {bgObj: boardGameObj, gNumPlayers: "Any", gDifficulty: "Any", gLength: "Any", gGenre: "Any", gMechanics: "Any"}
  },
  // Handlers for each of the different values
  handlePlayers: function(e) {
    this.setState({gNumPlayers: e.target.value});
  },
  handleDifficulty: function(e) {
    this.setState({gDifficulty: e.target.value});
  },
  handleLength: function(e) {
    this.setState({gLength: e.target.value})
  },
  handleGenre: function(e) {
    this.setState({gGenre: e.target.value})
  },
  handleMechanics: function(val) {

    this.setState({gMechanics: val});
  },
  loadGamesFromServer: function() {
    $.ajax({
      url: 'http://localhost:3000/games.json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({bgObj: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function(){
    this.loadGamesFromServer();
  },

  render: function() {
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

    return (
      <div>
        <div className="selection">
          <AddGame  loadGamesFromServer={this.loadGamesFromServer}/>
          <ChoosePlayers gNumPlayers={this.state.gNumPlayers} handler={this.handlePlayers}/>
          <ChooseDifficulty gDifficulty={this.state.gDifficulty} handler={this.handleDifficulty}/>
          <ChooseGenre GENRES={GENRES} gGenre={this.state.gGenre} handler={this.handleGenre}/>
          <ChooseLength gLength={this.state.gLength} handler={this.handleLength}/>
          <ChooseMechanics MECHANICS_OPTIONS={MECHANICS_OPTIONS} handler={this.handleMechanics}/>
        </div>
        <div>
          <GamesToPlay bgObj={this.state.bgObj} genre={this.state.gGenre} mechanics={this.state.gMechanics} players={this.state.gNumPlayers} difficulty={this.state.gDifficulty} gLength={this.state.gLength}/>
        </div>
      </div>
    )
  }
});
