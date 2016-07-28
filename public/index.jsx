//* index.jsx *//
'use strict';
var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link

import { browserHistory} from 'react-router'

// window.ReactDOM = ReactDOM;
var BGDisplay = require('./BGDisplay.jsx')
var Home = require('./Home.jsx')
// var AddGame = require('./AddGame.jsx')
ReactDOM.render(
  <Router history={browserHistory} >
    <Route path="/" component={Home}/>
    <Route path="/see-games" component={BGDisplay} />
  </Router>
    , document.getElementById('content'))



// //* index.jsx *//
// 'use strict';
// var React = require('react')
// var ReactDOM = require('react-dom')
// var Router = require('react-router').Router
// var Route = require('react-router').Route
// var Link = require('react-router').Link
//
// // window.ReactDOM = ReactDOM;
// var BGDisplay = require('./BGDisplay.jsx');
// var Home = require('./Home.jsx');
// // var AddGame = require('./AddGame.jsx')
// ReactDOM.render((
//   <Router>
//     <Route path='/' component={Home} />
//
//   </Router> ),
//   document.getElementById('content'))
