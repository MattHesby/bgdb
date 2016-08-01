//* ChooseGenre.jsx *//
'use strict'
var React = require('react')
var ReactDOM = require('react-dom')
var AddGame = require('./AddGame.jsx');
var ChooseBGGUser = require('./ChooseBGGUser.jsx');
var BGDisplay = require('./BGDisplay.jsx');
var Navbar = require('./Navbar.jsx')


module.exports = React.createClass({
  getInitialState: function(){
    return {
      bggUser: "None",
    }
  },
  bggUserHandler: function(event) {
      var user = this.state.bggUser;
      user = event.target.value;
      this.setState({bggUser: user});
  },
  submitHandler: function(evt) {
      var chooser = document.getElementById("choosebgguserdiv");
      var displayer = document.getElementById('bgdisplaydiv');
      var spinner = document.getElementById("meepleLoader")



      var _this = this;
      this.state.type = "bggUser";
      var data = JSON.stringify(this.state);
      console.log(data);
      evt.preventDefault();
      spinner.className += "spinner"
      $.ajax({
          type: "POST",
          url: '/',
          dataType: 'json',
          contentType: 'application/json',
          processData: true,
          data: data,
          complete: function() {
              console.log("complete?");
              spinner.className = ""
          },
          success: function(data) {
              console.log(data);
              _this.setState({bgObj: data[0]});
              chooser.className = "hidden";
              displayer.className = "";
              console.log("success?");
              console.log("state: ", _this.state.bgObj)
          },
          error: function(err) {
              console.log("error");
          }
      });
  },
  render: function() {

    return (
      <div>

        <Navbar/>
        <ChooseBGGUser bggUserHandler={this.bggUserHandler} submitHandler={this.submitHandler}/>
        <div id="meepleContainer">
          <img id="meeple" src="images/black-meeple.png" id="meepleLoader" />
        </div>
        <BGDisplay bgObj={this.state.bgObj} />
      </div>
    )
  }
})
