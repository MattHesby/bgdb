var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var parseString = require('xml2js').parseString;
var requestify = require('requestify');
var http = require('http');
var Promise = require('bluebird');
var request = require('request');
var util = require('util');


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

    if (req.body.type === "bggUser") {




        processBgguserPromise('collection?username=', req.body.bggUser + '&own=1')


    }
})

// function processBggUser(type, item){
//   var idArray = [];
//   var collectionArray = [];
//   var gameArray = [];
//   var wholeXml;
//   collectionRequest(type, item, function(){
//     getIds(function(){
//       boardgameRequest()
//     })
//   })
// }

var idArray = [];
var collectionArray = [];
var gameArray = [];
var wholeXml;
var wholeBGXml = [];
var gameId = [];
var gameTitle = [];
var gameDescriptions = [];
var gameMinPlayers = [];
var gameMaxPlayers = [];
var gameTime = []
var gameDifficulty = [];

function processBgguserPromise(type, item) {

    console.log("gogogo")
    collectionRequest(type, item).then(function() {
        // console.log(wholeXml);
        getIds()

    }).then(function() {
        boardgameRequest();
        console.log(wholeBGXml);
    }).then(function() {
        parseGameInfo();
    })

}

function collectionRequest(type, item) {
    console.log("running");
    return new Promise(function(resolve, reject) {
        console.log("going to get");
        var body;
        request.get('https://www.boardgamegeek.com/xmlapi2/' + type + item, function(error, response, body) {
            if (error) return console.log(error);
            if (!error && response.statusCode == 200) {
                wholeXml = body;
                console.log("finished CollectionRequest");
                resolve();
            }
        })
    })
}

function getIds() {
    // var xml = "<root>Hello xml2js!</root>"
    return new Promise(function(resolve, reject) {

        parseString(wholeXml, function(err, result) {


            //NEED TO PULL OUT IDS HERE
            // console.log(util.inspect(result, false, null))
            for (var i = 0; i < result.items.item.length; i++) {
                idArray.push(result.items.item[i].$.objectid);
            }
            // console.log(result.items.item[0].$.objectid)
            console.log("finished getIds");
            resolve();
        });
    })
}

function boardgameRequest() {
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < idArray.length; i++) {
              request.get('https://www.boardgamegeek.com/xmlapi2/thing?id=' + idArray[i],
                function(error, response, body) {
                    if (error) return console.log(error);
                    if (!error && response.statusCode == 200) {
                        wholeBGXml.push(body);
                    }
                })
      }
        console.log("finished bgRequest");
        resolve();
    })
}

function parseGameInfo(){
  return new Promise(function(resolve, reject) {

      parseString(wholeBGXml, function(err, result) {
          console.log(result);

          //NEED TO PULL OUT IDS HERE
          // console.log(util.inspect(result, false, null))
          for (var i = 0; i < 0; i++) {

          }
          // console.log(result.items.item[0].$.objectid)

          resolve();
      });
  })

}

function addGameInfo() {


}



// sets the server to listen at port 3000
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
