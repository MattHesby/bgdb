///* AddGame.jsx *///
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var bs = require('react-bootstrap')
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
import { browserHistory } from 'react-router'

module.exports = React.createClass({
    getInitialState: function() {
        return {bggUser: "None"};
    },
    handleBbgUser: function(event) {
        var user = this.state.bggUser;
        user = event.target.value;
        this.setState({bggUser: user});
    },
    submitHandler: function(evt) {
        var _this = this;
        this.state.type = "bggUser";
        var data = JSON.stringify(this.state);
        console.log(data);
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
                browserHistory.push('/see-games');
            },
            success: function(data) {
              console.log(data);
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
            <div className="container">

              <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <h1> Welcome to Board Game Picker </h1>
                <p> Board Game Picker will help you determine which of your owned board games you want to play based on how many people you have with you and how much time you have available. </p>
                <p> You will need a <a href="https://boardgamegeek.com/"> boardgamegeek </a> account with the games you own added to the account</p>
                <p> If you're here to try it out, you can use 'necodamus' or look for a random account on <a href="https://boardgamegeek.com/"> boardgamegeek </a> to see how the website handles longer load times when pulling games from the xml data instead of finding them already stored in the database </p>
                <p> Enter your username below and click Submit.  If you have a lot of games, it may take a while depending on what is already stored in the database </p>
                </div>
              </div>
                <div className="row">
                    <div className="col-md-offset-2 col-md-3 navbar-brand">
                        <div>
                            <bs.Input type="text" placeholder="Boardgamegeek Username" onChange={this.handleBbgUser}/>
                        </div>
                    </div>

                    <div className="navbar-brand col-md-1">
                        <button type="button" className="btn btn-primary" onClick={this.submitHandler}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
})
