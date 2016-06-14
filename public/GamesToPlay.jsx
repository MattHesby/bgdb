//* GamesToPlay.jsx *//
/*
 *
 * Props: bgObj, genre, mechanics, players, difficulty, gLength
 *
 */
'use strict'
var React = require('react');
var bs = require('react-bootstrap');
import Dimensions from 'react-dimensions';
import ReactDOM from 'react-dom';
module.exports = React.createClass({
    getInitialState: function() {
        return {}
    },
    componentDidMount: function() {
        var _this = this;
        function grab(cb) {
            var theDivs = ReactDOM.findDOMNode(_this).getElementsByClassName("well");
            cb(theDivs);
        }

        setTimeout(function() {
            grab(function(items) {
                for (var i = 0; i < items.length - 1; i+=2) {

                    var leftHeight = items[i].clientHeight;
                    var rightHeight = items[i + 1].clientHeight;
                    console.log(items[i].clientHeight);
                    // console.log(leftHeight);
                    if (leftHeight > rightHeight) {
                        items[i + 1].style.height = leftHeight + "px";
                    } else {
                        items[i].style.height = rightHeight + "px";
                    }
                }
            })
        }, 50);
    },
    componentDidUpdate: function(){
      var _this = this;
      function grab(cb) {
          var theDivs = ReactDOM.findDOMNode(_this).getElementsByClassName("well");
          cb(theDivs);
      }

      setTimeout(function() {
          grab(function(items) {
              for (var i = 0; i < items.length - 1; i+=2) {

                  var leftHeight = items[i].clientHeight;
                  var rightHeight = items[i + 1].clientHeight;
                  console.log(items[i].clientHeight);
                  // console.log(leftHeight);
                  if (leftHeight > rightHeight) {
                      items[i + 1].style.height = leftHeight + "px";
                  } else {
                      items[i].style.height = rightHeight + "px";
                  }
              }
          })
      }, 50);
    },
    removeGamesFromServer(evt) {

        var _this = this;
        // console.log(this);
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
    render : function() {
        var tempGames = JSON.parse(JSON.stringify(this.props.bgObj));
        var viableGameTitles = [];
        var viableGameDescriptions = [];
        var viableGameRow = [];
        var viableGameId = [];

        var containerOfBoxes = {
            // height:"400px",

        }
        var box1 = {
          "marginRight": "40px"
            // overflow: "hidden"
        }
        var box2 = {


            // overflow: "hidden"
        }

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
            // console.log(Dimensions.get(this.refs.test).height);
            viableGameRow.push(
                <div className="row" style={containerOfBoxes}>

                    <div ref="joy" style={box1} className="col-md-offset-2 col-md-2 well">
                        {viableGameTitles[i]}
                    </div>



                    <div style={box2} className="well col-md-6">
                        {viableGameDescriptions[i]}
                    </div>
                    <bs.Button data-_id={viableGameId[i]} name={viableGameTitles[i]} onClick={this.removeGamesFromServer} className="height-center btn btn-lg btn-danger">
                        Remove
                    </bs.Button>
                </div>
            )

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
