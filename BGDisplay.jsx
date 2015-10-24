'use strict'
// var React = require('react')
var SelectPopover  = require("react-select-popover")
var GamesToPlay = require('./GamesToPlay.jsx')
module.exports = React.createClass({

    getInitialState: function() {
        return {
            gNumPlayers: "any",
            bgObj: boardGameObj,
            // vGames: viableGames,
            gDifficulty: "any",
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
            {label: "Any", value: "any"},
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
                <option value="any"> Any </option>
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
                <option value="any"> Any </option>
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
                <option value="any"> Any </option>
                <option value="easy"> easy </option>
                /*MAKE OPTIONS ACCORDING TO AVAILABLE THINGS*/
            </select>

          <div>
          </div>
        <p> Mechanics? </p>
        <SelectPopover
        options={MECHANICS}
        name={selectFieldName}
        selectPlaceholder={selectPlaceholder}
        onChange={ this.handleMechanics }
    />

          <div>
            <p> Length? </p>
            <select defaultValue={this.state.gLength}
            onChange={this.handleLength}>
                <option value="any"> Any </option>
                <option value="30"> 30min or less </option>
                <option value="60"> 30min - 1hr </option>
                <option value="90"> 1hr - 2hr </option>
                <option value="240"> 2hr - 4hr </option>
                <option value="300"> 4hr + </option>
            </select>
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
                if((curGame.players.min <= this.props.players && curGame.players.max >= this.props.players) || this.props.players === "any"){
                    // if(( ) || () || () || () || () ){
                            viableGameTitles.push(curGame.title);
                            viableGameDescriptions.push(curGame.info.description)
                    // }
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
