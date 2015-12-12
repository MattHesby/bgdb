/*
 *
 * Props: bgObj, genre, mechanics, players, difficulty, gLength
 *
 */
'use strict'
var React = require('react')
module.exports = React.createClass({
  getInitialState: function() {
    return {}
  },
  render: function() {
    var tempGames = JSON.parse(JSON.stringify(this.props.bgObj));
    var viableGameTitles = ["Game"];
    var viableGameDescriptions = ["Description"];

    for (var game in this.props.bgObj) {
      if (this.props.bgObj.hasOwnProperty(game)) {
        var curGame = this.props.bgObj[game];
        console.log(curGame.time.minutes)
        console.log(this.props.gLength)
        console.log(curGame.time.minutes <= this.props.gLength + 20)
        // Handles Player #
        if ((curGame.players.min <= this.props.players && curGame.players.max >= this.props.players) || this.props.players === "Any") {
          // Handles Length
          if (this.props.gLength == 'Any' || (this.props.gLength == 30 && curGame.time.minutes <= 30) || (this.props.gLength == 60 && curGame.time.minutes >= 30 && curGame.time.minutes <= 60) || (this.props.gLength == 90 && curGame.time.minutes >= 60 && curGame.time.minutes <= 120) || (this.props.gLength == 240 && curGame.time.minutes >= 120 && curGame.time.minutes <= 240) || (this.props.gLength == 300 && curGame.time.minutes >= 240)) {
            // Handles Difficulty
            if (this.props.difficulty == curGame.info.difficulty || this.props.difficulty === 'Any') {
              // Handles Genre
              if (this.props.genre === curGame.info.genre || this.props.genre === 'Any') {
                viableGameTitles.push(curGame.title);
                viableGameDescriptions.push(curGame.info.description)
              }
            }
          }
        }
      }
    }
    for (var i = 0; i < viableGameTitles.length; i++) {
      viableGameTitles[i] = <div className="gameTitle">
        {viableGameTitles[i]}
      </div>
      viableGameDescriptions[i] = <div className="gameTitle">
        {viableGameDescriptions[i]}
      </div>
    }
    return (
      <div>
        <div className="column">
          {viableGameTitles}
        </div>
        <div className="column">
          {viableGameDescriptions}
        </div>
      </div>
    )
  }
})
