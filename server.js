var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/test');

// Enables CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))



});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  id:  Number,
  info: {description: String, difficulty: Number, genre: String, mechanics: Array},
  players: {max: Number, min: Number},
  time: {hours: Number, minutes: Number},
  title: String
});

var GameModel = mongoose.model("gameModel", gameSchema);

var carcassonne = new GameModel({"id":1,"title":"Carcassonne","info":{"difficulty":1,"description":"Carcassonne is a tile-placement game in which the players draw and place a tile with landscape on it.The player can then decide to place one of his meeples on one of the areas on it.","genre":"Abstract","mechanics":["placement, area control"]},"players":{"min":2,"max":5},"time":{"minutes":120,"hours":2}})
console.log(carcassonne);


// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) // ...
//   console.log('meow');
// });


app.get('/games.json', function (req, res) {
  console.log("derp" + req.url)
  GameModel.find(function(err, games){
    if(err) return console.log(err);
    res.send(games);
  })
});

app.post('/', function(req, res){
  console.log(req);
  // req.body.save();
})



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
