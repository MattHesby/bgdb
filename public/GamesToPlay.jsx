//* GamesToPlay.jsx *//
/*
 *
 * Props: bgObj, genre, mechanics, players, difficulty, gLength
 *
 */
'use strict'
var React = require('react');
var bs = require('react-bootstrap');
module.exports = React.createClass({
  getInitialState: function() {
    return {}
  },
  removeGamesFromServer(evt){


    var _this = this;
    console.log(this);
    this.state.type = "remove";
    this.state.toRemove = evt.target.dataset._id;
    var data = JSON.stringify(this.state);
    evt.preventDefault();
    $.ajax({
      type: "POST",
      url: '/',
      dataType: 'json',
      contentType: 'application/json',
      processData: true,
      data: data,
      complete: function() {
        console.log("complete?");
        _this.props.loadGamesFromServer();
        _this.render();
      },
      success: function(data) {
        console.log("success?");

      },
      error: function(err) {

        console.log("error");
      }
    });
  },
  render: function() {
    var tempGames = JSON.parse(JSON.stringify(this.props.bgObj));
    var viableGameTitles = [];
    var viableGameDescriptions = [];
    var viableGameRow = [];
    var viableGameId = [];

    for (var game in this.props.bgObj) {
      if (this.props.bgObj.hasOwnProperty(game)) {
        var curGame = this.props.bgObj[game];
        // console.log(curGame.time.minutes)
        // console.log(this.props.gLength)
        // console.log(curGame.time.minutes <= this.props.gLength + 20)
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
                viableGameId.push(curGame._id);
              }
            }
          }
        }
      }
    }
    for (var i = 0; i < viableGameTitles.length; i++) {
      viableGameRow.push(<div className="row"> <div className="col-md-offset-2 col-md-2 "> <div className="well"> {viableGameTitles[i]} </div></div> <div className="col-md-6"> <div className="well"> {viableGameDescriptions[i]}</div> </div>  <bs.Button data-_id={viableGameId[i]} name={viableGameTitles[i]} onClick={this.removeGamesFromServer} className="height-center btn btn-lg btn-danger"> Remove </bs.Button> </div> )

    }

// REMOVED TITLE + DESCRIPTOIN
    // <div className="row">
    //   <div className="col-md-offset-2 col-md-1">
    //     {viableGameTitles}
    //   </div>
    //   <div className="col-md-7 gameDescription">
    //     {viableGameDescriptions}
    //   </div>
    // </div>

    return (
      <div>
        <h1 className="text-center title">
          Games That Match Your Needs!
        </h1>

        {viableGameRow}


      </div>
    )
  }
})
