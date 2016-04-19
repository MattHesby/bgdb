///* AddGame.jsx *///
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var bs = require('react-bootstrap')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      // id:  'id',
      info: {
        description: 'description',
        difficulty: '1',
        genre: 'genre',
        mechanics: 'mechanics'
      },
      players: {
        max: '1',
        min: '1'
      },
      time: {
        hours: '0.5',
        minutes: '30'
      },
      title: 'title'
    };
  },
  handleDescription: function (event) {

    var info = this.state.info;
    info.description = event.target.value;
    // console.log(this.state.info.description);
    this.setState({ info: info });
  },
  handleDifficulty: function (event) {
    var info = this.state.info;
    info.difficulty = event.target.value;
    // console.log(this.state.info.difficulty);
    this.setState({ info: info });
  },
  handleGenre: function (event) {
    var info = this.state.info;
    info.genre = event.target.value;
    // console.log(this.state.info.genre);
    this.setState({ info: info });
  },
  handleMechanics: function (event) {
    var info = this.state.info;
    info.mechanics = event.target.value;
    // console.log(this.state.info.mechanics);
    this.setState({ info: info });
  },
  handleMax: function (event) {

    var players = this.state.players;
    players.max = event.target.value;
    // console.log(this.state.players.max);
    this.setState({ players: players });
  },
  handleMin: function (event) {

    var players = this.state.players;
    players.min = event.target.value;
    // console.log(this.state.players.min);
    this.setState({ players: players });
  },
  handleTime: function (event) {

    var time = this.state.time;
    time.minutes = event.target.value;
    time.hours = time.minutes / 60;
    // console.log(this.state.time.minutes);
    this.setState({ time: time });
  },
  handleTitle: function (evt) {
    this.setState({ title: evt.target.value });
  },
  submitHandler: function (evt) {
    var _this = this;
    this.state.type = "add";
    var data = JSON.stringify(this.state);
    evt.preventDefault();
    $.ajax({
      type: "POST",
      url: '/',
      dataType: 'json',
      contentType: 'application/json',
      processData: true,
      data: data,
      complete: function () {
        console.log("complete?");
        _this.props.loadGamesFromServer();
      },
      success: function (data) {
        console.log("success?");

      },
      error: function (err) {

        console.log("error");
      }
    });

  },
  render: function () {
    // var value = this.state.value;

    // removed genre and mechanics
    // <input type="text" value={this.state.info.genre} onChange={this.handleGenre} />;
    // <input type="text" value={this.state.info.mechanics} onChange={this.handleMechanics} />;

    return (
      <div>
        <h1 className="title text-center">
          Add a Game!
        </h1>
        <div className="row">
          <div className="text-center">
            Game Title
          </div>

          <div className="col-md-10 col-md-offset-1">
            <bs.Input type="text" placeholder={this.state.title} onChange={this.handleTitle}/>
          </div>

          <div className="text-center">
            Difficulty
          </div>

          <div className="col-md-10 col-md-offset-1">
            <select className="form-control" value={this.state.info.difficulty} onChange={this.handleDifficulty}>
              <option value="1">
                Very Easy
              </option>
              <option value="2">
                Easy
              </option>
              <option value="3">
                Medium
              </option>
              <option value="4">
                Hard
              </option>
              <option value="5">
                Very Hard
              </option>
            </select>
          </div>
          
          <div className="text-center col-md-offset-1 col-md-10">
            Min Players
          </div>

          <div className="col-md-10 col-md-offset-1">
          <select className="form-control" value={this.state.players.min} onChange={this.handleMin}>
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="3">
              3
            </option>
            <option value="4">
              4
            </option>
            <option value="5">
              5
            </option>
            <option value="6">
              6
            </option>
            <option value="7">
              more
            </option>
          </select>
          </div>
          <div className="text-center col-md-10 col-md-offset-1">
            Max Players
          </div>

<div className="col-md-10 col-md-offset-1">
          <select className="form-control" type="text" value={this.state.players.max} onChange={this.handleMax}>
            <option value="1">
              1
            </option>
            <option value="2">
              2
            </option>
            <option value="3">
              3
            </option>
            <option value="4">
              4
            </option>
            <option value="5">
              5
            </option>

            <option value="6">
              6
            </option>
            <option value="7">
              more
            </option>
          </select>
          </div>
          <div className="text-center">
            Length
          </div>

          <div className="col-md-10 col-md-offset-1">
          <select className="form-control" type="text" value={this.state.time.minutes} onChange={this.handleTime}>
            <option value ="29"> 30 Minutes or Less </option>
            <option value ="50"> 30 Minutes - 1 Hour </option>
            <option value ="90"> 1 - 2 Hours </option>
            <option value ="180"> 2 - 4 Hours </option>
            <option value ="250"> 4+ Hours </option>
          </select>
          </div>
        </div>


        <div className="col-md-10 col-md-offset-1">
          <div className="text-center">
            Description
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <bs.Input className="" type="text" placeholder={this.state.info.description} onChange={this.handleDescription}/>
          </div>
          <button className="col-md-6 col-md-offset-3 btn btn-primary" onClick={this.submitHandler}>
            Add Game
          </button>
        </div>

      </div>
    );
  }
})
