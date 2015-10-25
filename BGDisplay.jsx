////// THIS WILL BE GRABBED FROM SERVER
// Add Description, minPlayer => minPlayers, difficulty is 1 - 5, length is in minutes, gameplay mechanics
var BgArray = ['{"id":1,"title":"Carcassonne","info":{"difficulty":1,"description":"Carcassonne is a tile-placement game in which the players draw and place a tile with landscape on it.The player can then decide to place one of his meeples on one of the areas on it.","genre":"Abstract","mechanics":"placement, area control"},"players":{"min":2,"max":5},"time":{"minutes":120,"hours":2}}', '{"id":2,"title":"asdf","info":{"difficulty":5,"description":"asdf","genre":"asdf","mechanics":"asdf"},"players":{"min":2,"max":3},"time":{"minutes":60,"hours":1.0}}']
// var incBgObj = '{"game1":{"title":"Catan","maxPlayers":2,"minPlayer":6,"difficulty":"medium","length":"normal"},"game2":{"title":"Galaxy","maxPlayers":4,"minPlayers":5,"difficulty":"hard","length":"long"},"game3":{"title":"Trucker","maxPlayers":2,"minPlayers":4,"difficulty":"medium","length":"normal"}}'
var boardGameObj = [];
for (var i = 0; i < BgArray.length; i++) {
    boardGameObj.push(JSON.parse(BgArray[i]));
    console.log(boardGameObj[i]);
}
/////////////////////////////////////////////

/////// Figure out how to use this as a REQUIRE////
var dataBlock = {
    color: "green",
}
var container = {
    border: "2px solid black",
}
/////////////////////////////////////////////


'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var Select = require('react-select');
var SelectPopover  = require("react-select-popover")
var GamesToPlay = require('./GamesToPlay.jsx')
module.exports = React.createClass({

    getInitialState: function() {
        return {
            gNumPlayers: "Any",
            bgObj: boardGameObj,
            // vGames: viableGames,
            gDifficulty: "Any",
            gLength: "Any",
            gGenre:"Any",
            gMechanics:"Any",
        }
    },
    handlePlayers: function(e) {
        this.setState({gNumPlayers: e.target.value});
    },
    handleDifficulty: function(e){
        this.setState({gDifficulty: e.target.value});
    },
    handleLength: function(e){
        this.setState({gLength: e.target.value})
    },
    handleGenre: function(e){
        this.setState({gGenre: e.target.value})
    },
    handleMechanics: function(val){

            this.setState({gMechanics: val});
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
        console.log("THIS IS!" + GENRES)
        for (var i = 0; i < GENRES.length; i++) {
            GENRES[i] = <option value={GENRES[i]}> { GENRES[i] } </option>
        }

        // Sets up Mechanics Options
        var MECHANICS = [
            {label: "Any", value: "Any"},
            {label: "Area Control", value: "area-control"},
            {label: "Worker Placement", value: "worker-placement"},
            {label: "Trading", value: "trading"},
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









        var selectFieldName = "my-select";
        var selectPlaceholder = "Choose Game Mechanics";

        return (

        <div>
            <div className="container">
              <p> How Many Players? </p>
              <select defaultValue={this.state.gNumPlayers}
              onChange={this.handlePlayers}
              >
                <option value="Any"> Any </option>
                <option value="1"> 1 </option>
                <option value="2"> 2 </option>
                <option value="3"> 3 </option>
                <option value="4"> 4 </option>
                <option value="5"> 5 </option>
                <option value="6"> 6 </option>
                <option value="more"> more </option>
              </select>
            </div>

            <div className="container">
              <p> Complexity? </p>
              <select defaultValue={this.state.gDifficulty}
              onChange={this.handleDifficulty}
              >
                <option value="Any"> Any </option>
                <option value="1"> very easy </option>
                <option value="2"> easy </option>
                <option value="3"> medium </option>
                <option value="4"> hard </option>
                <option value="5"> very hard </option>
              </select>
            </div>

            <div className="container">
              <p> Genre? </p>
              <select defaultValue={this.state.gGenre}
              onChange={this.handleGenre}
              >
              {GENRES}
              </select>
            </div>

            <div className="container">
              <p> Length? </p>
              <select defaultValue={this.state.gLength}
              onChange={this.handleLength}>
                <option value="Any"> Any </option>
                <option value="30"> 30min or less </option>
                <option value="60"> 30min - 1hr </option>
                <option value="90"> 1hr - 2hr </option>
                <option value="240"> 2hr - 4hr </option>
                <option value="300"> 4hr + </option>
              </select>
            </div>

            <div className="container">
              <p> Mechanics? </p>
              <Select
              name="form-field-name"
              value="Any"
              options={MECHANICS}
              onChange={this.handleMechanics}
              multi={true}
              />
            </div>

            <div>
              <GamesToPlay bgObj={this.state.bgObj} genre={this.state.gGenre} mechanics={this.state.gMechanics}  players={this.state.gNumPlayers} difficulty={this.state.gDifficulty} gLength={this.state.gLength} />
            </div>
      </div>
        )
    }
});
