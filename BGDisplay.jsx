////// THIS WILL BE GRABBED FROM SERVER
// Add Description, minPlayer => minPlayers, difficulty is 1 - 5, length is in minutes, gameplay mechanics
var BgArray = ['{"id":1,"title":"Carcassonne","info":{"difficulty":1,"description":"Carcassonne is a tile-placement game in which the players draw and place a tile with a piece of southern French landscape on it. The tile might feature a city, a road, a cloister, grassland or some combination thereof, and it must be placed adjacent to tiles that have already been played, in such a way that cities are connected to cities, roads to roads, etcetera. Having placed a tile, the player can then decide to place one of his meeples on one of the areas on it: on the city as a knight, on the road as a robber, on a cloister as a monk, or on the grass as a farmer. When that area is complete, that meeple scores points for its owner.","genre":"Abstract","mechanics":"placement, area control"},"players":{"min":2,"max":5},"time":{"minutes":120,"hours":2}}', '{"id":2,"title":"asdf","info":{"difficulty":5,"description":"asdf","genre":"asdf","mechanics":"asdf"},"players":{"min":2,"max":3},"time":{"minutes":60,"hours":1.0}}']
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
    handleMechanics: function(obj){
            console.log("EVENT", obj.event); // "added" or "removed"
            console.log("ITEM", obj.item);   // item that has been added/removed { label: '...', value: '...' }
            console.log("VALUE", obj.value); // [{label: '...', value: '...'}, {label: '...', value: '...'}]
            var temp = [];
            for(i = 0; i < obj.value.length; i++){
                temp.push(obj.value[i].value);
            }
            console.log(temp);
            this.setState({gMechanics: temp});
    },

    render: function() {



        var MECHANICS = [
            {label: "Any", value: "Any"},
            {label: "Area Control", value: "area-control"},
            {label: "Worker Placement", value: "worker-placement"},
            {label: "Trading", value: "trading"},
        ];
        var selectFieldName = "my-select";
        var selectPlaceholder = "Choose Game Mechanics";

        return (

        <div>
            <div>
            <div>
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

<div>
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
        <p> Genre? </p>
        <select defaultValue={this.state.gGenre}
            onChange={this.handleGenre}
            >
                <option value="Any"> Any </option>
                <option value="easy"> easy </option>
                /*MAKE OPTIONS ACCORDING TO AVAILABLE THINGS*/
            </select>

<div>
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



          <div>

        <p> Mechanics? </p>
        <SelectPopover
        options={MECHANICS}
        name={selectFieldName}
        selectPlaceholder={selectPlaceholder}
        onChange={ this.handleMechanics }
    />
        </div>

        </div>
        <GamesToPlay bgObj={this.state.bgObj} genre={this.state.gGenre} mechanics={this.state.gMechanics}  players={this.state.gNumPlayers} difficulty={this.state.gDifficulty} gLength={this.state.gLength} />
      </div>
        )
    }
});

/*
 *
 * Props: bgObj, genre, mechanics, players, difficulty, gLength
 *
 */
var GamesToPlay = React.createClass({
    getInitialState: function() {


        return{
        }
    },
    render: function() {
        var tempGames = JSON.parse(JSON.stringify(this.props.bgObj));
        var viableGameTitles = [];
        var viableGameDescriptions= [];

        for (var game in this.props.bgObj) {
            if (boardGameObj.hasOwnProperty(game)) {
                var curGame = boardGameObj[game];
                console.log(curGame.time.minutes)
                console.log(this.props.gLength)
                console.log(curGame.time.minutes <= this.props.gLength + 20)
                // Handles Player #
                if((curGame.players.min <= this.props.players && curGame.players.max >= this.props.players) || this.props.players === "Any"){
                    // Handles Length
                    if(this.props.gLength == 'Any' || (this.props.gLength == 30 && curGame.time.minutes <= 30) || (this.props.gLength == 60 && curGame.time.minutes >= 30 && curGame.time.minutes <= 60) || (this.props.gLength == 90 && curGame.time.minutes >= 60 && curGame.time.minutes <= 120) || (this.props.gLength == 240 && curGame.time.minutes >= 120 && curGame.time.minutes <= 240) || (this.props.gLength == 300 && curGame.time.minutes >= 240)){
                        // Handles Difficulty
                        if(this.props.difficulty == curGame.info.difficulty || this.props.difficulty === 'Any'){
                          // Handles Genre
                            if(this.props.genre === curGame.info.genre || this.props.genre === 'Any'){
                              viableGameTitles.push(curGame.title);
                              viableGameDescriptions.push(curGame.info.description)
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < viableGameTitles.length; i++) {
            viableGameTitles[i] = <li style={dataBlock}>  { viableGameTitles[i] } </li>
            console.log(viableGameTitles[i]);
        }
        return(<div>
                {viableGameTitles}
            </div>)
    }
})
