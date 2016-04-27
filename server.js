var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(express.static('public'));
mongoose.connect('mongodb://127.0.0.1:27017/test');
app.use(bodyParser.json());

// Enables CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Creates Schema for mondodb
var Schema = mongoose.Schema;
var gameSchema = new Schema({
  _id: String,
  info: {
    description: String,
    difficulty: Number,
    genre: String,
    mechanics: Array
  },
  players: {
    max: Number,
    min: Number
  },
  time: {
    hours: Number,
    minutes: Number
  },
  title: String
});

var GameModel = mongoose.model("gameModel", gameSchema);

// Sends current set of games
app.get('/games.json', function(req, res) {
  GameModel.find(function(err, games) {
    if (err) return console.log(err);
    res.send(games);
  })
});

// Handles removing and adding games
app.post('/', function(req, res, err) {
  console.log(req.body.type);

  if (req.body.type === "remove") {
    // if (err) {
    //   console.log(err)
    //   res.sendStatus(500);
    // } else {
      console.log("removing: " + req.body.toRemove);
      GameModel.find({
        _id: req.body.toRemove
      }).remove().exec();
    //   res.sendStatus(200);
    // }
    res.end();
  }


  if (req.body.type === "add") {
    console.log("Adding: " + req.body.title);
    
    req.body._id = mongoose.Types.ObjectId();
    
    
    var tempGame = new GameModel(req.body);
    tempGame.save(function(err) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
        console.log("Game Added To DB");
      }
      res.end();
    });
  }
})


// sets the server to listen at port 3000
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
