///* AddGame.jsx *///
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var LinkedStateMixin = require('react-addons-linked-state-mixin');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      // id:  'id',
      info: {description: 'description', difficulty: 'difficulty', genre: 'genre', mechanics: 'mechanics'},
      players: {max: 'max players', min: 'min players'},
      time: {hours: 'hours', minutes: 'minutes'},
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
  handleTitle: function(evt){
    this.setState({title: evt.target.value});
  },
  submitHandler: function(evt){
    var _this = this;
    // console.log(this.state);
    var data = JSON.stringify(this.state);
    // console.log(data);
    evt.preventDefault();
    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/',
      dataType: 'json',
      contentType : 'application/json',
      processData: true,
      data: data,
      complete: function(){
        console.log("complete?");
        _this.props.loadGamesFromServer();
      },
      success: function(data){
        console.log("success?");

      },
      error: function(err){

        console.log("error");
      }
    });

  },
  render: function() {
    // var value = this.state.value;
    return(
      <div>
        <input type="text" value={this.state.title} onChange={this.handleTitle} />
        <input type="text" value={this.state.info.description} onChange={this.handleDescription} />;
        <input type="text" value={this.state.info.difficulty} onChange={this.handleDifficulty} />;
        <input type="text" value={this.state.info.genre} onChange={this.handleGenre} />;
        <input type="text" value={this.state.info.mechanics} onChange={this.handleMechanics} />;
        <input type="text" value={this.state.players.max} onChange={this.handleMax} />;
        <input type="text" value={this.state.players.min} onChange={this.handleMin} />;
        <input type="text" value={this.state.time.minutes} onChange={this.handleTime} />;
        <button onClick={this.submitHandler} > Add Game </button>
      </div>
    );
  }
})
