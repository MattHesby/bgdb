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

          },
          success: function(data) {
              console.log(data);
              _this.setState({bgObj: data[0]});
              document.getElementById("choosebgguserdiv").className = "hidden";
              document.getElementById('bgdisplaydiv').className = "";
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
        <BGDisplay bgObj={this.state.bgObj} />
      </div>
    )
  }
})


          // <Link to="/see-games" style={leftButton} type="button" className="navbar-toggle" data-toggle="offcanvas" data-target="#myNavmenu" data-canvas="body">
          //   Add A Game
          // </Link>
