///* AddGame.jsx *///
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var bs = require('react-bootstrap')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      // id:  'id',
      info: {
        description: 'description',
        difficulty: 'difficulty',
        genre: 'genre',
        mechanics: 'mechanics'
      },
      players: {
        max: 'max players',
        min: 'min players'
      },
      time: {
        hours: 'hours',
        minutes: 'minutes'
      },
      title: 'title'
    };
  },
  handleDescription: function(event) {
    var info = this.state.info;
    info.description = event.target.value;
    // console.log(this.state.info.description);
    this.setState({info: info});
  },
  handleDifficulty: function(event) {
    var info = this.state.info;
    info.difficulty = event.target.value;
    // console.log(this.state.info.difficulty);
    this.setState({info: info});
  },
  handleGenre: function(event) {
    var info = this.state.info;
    info.genre = event.target.value;
    // console.log(this.state.info.genre);
    this.setState({info: info});
  },
  handleMechanics: function(event) {
    var info = this.state.info;
    info.mechanics = event.target.value;
    // console.log(this.state.info.mechanics);
    this.setState({info: info});
  },
  handleMax: function(event) {
    var players = this.state.players;
    players.max = event.target.value;
    // console.log(this.state.players.max);
    this.setState({players: players});
  },
  handleMin: function(event) {
    var players = this.state.players;
    players.min = event.target.value;
    // console.log(this.state.players.min);
    this.setState({players: players});
  },
  handleTime: function(event) {
    var time = this.state.time;
    time.minutes = event.target.value;
    time.hours = time.minutes / 60;
    // console.log(this.state.time.minutes);
    this.setState({time: time});
  },
  handleTitle: function(evt) {
    this.setState({title: evt.target.value});
  },
  submitHandler: function(evt) {
    var _this = this;
    // console.log(this.state);
    var data = JSON.stringify(this.state);
    // console.log(data);
    evt.preventDefault();
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/',
      dataType: 'json',
      contentType: 'application/json',
      processData: true,
      data: data,
      complete: function() {
        console.log("complete?");
        _this.props.loadGamesFromServer();
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
    // var value = this.state.value;

    // removed genre and mechanics
    // <input type="text" value={this.state.info.genre} onChange={this.handleGenre} />;
    // <input type="text" value={this.state.info.mechanics} onChange={this.handleMechanics} />;

    return (
      <div>
      <h1 className="title text-center"> Add a Game! </h1>
        <div className="row">
          <div className="col-md-offset-3 col-md-2">
            <bs.Input type="text" placeholder={this.state.title}  onChange={this.handleTitle}/>
          </div>

          <div className="col-md-1">
            <select className="form-control" placeholder={this.state.info.difficulty} onChange={this.handleDifficulty.bind(this)}>
              <option value="1"> Very Easy </option>
              <option value="2"> Easy </option>
              <option value="3"> Medium </option>
              <option value="4"> Hard </option>
              <option value="5"> Very Hard </option>
            </select>
          </div>

          <div className="col-md-1">

            <bs.Input type="text" placeholder={this.state.players.min} onChange={this.handleMin}/>
          </div>
          <div className="col-md-1">

            <bs.Input type="text" placeholder={this.state.players.max} onChange={this.handleMax}/>
          </div>
          <div className="col-md-1">

            <bs.Input type="text" placeholder={this.state.time.minutes} onChange={this.handleTime}/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-offset-3 col-md-4">
            <bs.Input className="" type="text" placeholder={this.state.info.description} onChange={this.handleDescription}/>
          </div>
          <button className="btn btn-primary" onClick={this.submitHandler}>
            Add Game
          </button>
        </div>

      </div>
    );
  }
})
