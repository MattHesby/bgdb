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
module.exports = React.createClass({
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
