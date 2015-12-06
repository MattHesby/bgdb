'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var LinkedStateMixin = require('react-addons-linked-state-mixin');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      id:  'id',
      info: {description: 'description', difficulty: 'difficulty', genre: 'genre', mechanics: 'ignoreme'},
      players: {max: 'max players', min: 'min players'},
      time: {hours: 'hours', minutes: 'minutes'},
      title: 'title'
    };
  },
  handleDescription: function(event) {
    this.setState({value: event.target.value});
  },
  submitHandler: function(evt){
    console.log(this.state);
  },
  render: function() {
    var value = this.state.value;
    return(
      <div>
        <input type="text" valueLink={this.linkState('title')} />
        <input type="text" valueLink={this.linkState('info.description')} />
        <input type="text" valueLink={this.linkState('info.difficulty')} />
        <input type="text" valueLink={this.linkState('info.genre')} />
        <input type="text" valueLink={this.linkState('info.mechanics')} />
        <input type="text" valueLink={this.linkState('players.min')} />
        <input type="text" valueLink={this.linkState('players.max')} />
        <input type="text" valueLink={this.linkState('time.minutes')} />
        <button onClick={this.submitHandler} > click me  </button>
      </div>
    );
  }
})
