'use strict'
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
var bbRequest = Promise.promisifyAll(require('request'));
var parseString = require('xml2js').parseString;
var entities = require('entities');

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
    title: {
        type: String,
        unique: true
    }
});

var GameModel = mongoose.model("gameModel", gameSchema);
GameModel.collection.drop();

// Sends current set of games - No Longer used
app.get('/games.json', function(req, res) {
    GameModel.find(function(err, games) {
        if (err) return console.log(err);
        res.send(games);
    })
});

app.get('/*', function(req, res) {
    res.redirect('/')
})


// Removes games to the DB - No Longer used
function removeFromDb(data, cb) {
    console.log("removing: " + data);
    GameModel.find({
        _id: data
    }).remove().exec();
    cb();
}

// Adds games from the DB - No Longer used
function addToDB(data, cb) {
    console.log("Adding: " + data.title);

    data._id = mongoose.Types.ObjectId();

    var tempGame = new GameModel(data);
    tempGame.save(cb);
}

// Handles removing and adding games
app.post('/', function(req, res, err) {

    // - No Longer used
    if (req.body.type === "remove") {
        removeFromDb(req.body.toRemove, res.end.bind(res));
    }

    // - No Longer used
    if (req.body.type === "add") {
        addToDB(req.body, function(err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
                console.log("Game Added To DB");
            }
            res.end();
        })
    }


    if (req.body.type === "bggUser") {

        var data = processBgguser(0, 'collection?username=', req.body.bggUser + '&own=1', (success, error) => {
            if (error) {
                console.log('error processing request. Sending status code 500. Error:', error)
                res.status(500);
                res.send();
                return res.end();
            }
            console.log('Sending status code 200 and data.')
            res.status(200);
            res.send(success);
            res.end();
        });
    }
})

// Lots of global variables TODO: fix it so they're not global
// var idArray = [];
// var collectionArray = [];
// var gameArray = [];
// var wholeXml;
// var wholeBGXml = [];
// var gameId = [];
// var gameTitle = [];
// var gameDescriptions = [];
// var gameMinPlayers = [];
// var gameMaxPlayers = [];
// var gameTime = []
// var gameDifficulty = [];
const MAX_RETRIES = 1;
// var processData.totalResolved = 0;

function processBgguser(attempt, type, user, cb) {
  var processData = {
    idArray: [],
    collectionArray: [],
    gameArray: [],
    wholeXml: String,
    wholeBGXml: [],
    gameId: [],
    gameTitle: [],
    gameDescription: [],
    gameMinPlayers: [],
    gameMaxPlayers: [],
    gameTime: [],
    gameDifficulty: [],
    totalResolved: 0
  }

    getUser(user, MAX_RETRIES, processData).then(getIds).then(getAllGames).then(parseAllGames).then(addAllToDb).then(resetData).then((data) => {
        cb(data)
    }).catch((err) => cb(undefined, err));
}

function resetData(data) {
    processData.idArray.length = 0;
    processData.collectionArray.length = 0;
    processData.gameArray.length = 0;
    processData.wholeXml = "";
    wholeBGXml.length = 0;
    processData.gameId.length = 0;
    processData.gameTitle.length = 0;
    processData.gameDescriptions.length = 0;
    processData.gameMinPlayers.length = 0;
    processData.gameMaxPlayers.length = 0;
    processData.gameTime.length = 0;
    processData.gameDifficulty.length = 0;
    processData.totalResolved = 0;
    return data;
}

// function sentToClient(data){
//   GameModel.collection.drop();
//   // res.send(data);
//   return data;
// }

function addAllToDb(data) {
    for(var i = 0; i < data.length; i++){
        data[i].save();
    }
    return data;
}

function parseAllGames(data) {
    var allGames = [];
    // Parse Games
    for (var game in data) {
        if (data[game].constructor.name === "model") {
            allGames.push(data[game]);
        } else {
            parseString(data[game], function(err, result) {
                var gameData = result.items.item[0]
                var tempMinutes = parseInt(gameData.playingtime[0].$.value)
                var tempDescription = entities.decodeHTML(gameData.description);
                // To be used later
                var tempThumbnail = gameData.thumbnail

                // Creates temp game with data from parsed XML
                var tempGame = {}
                tempGame._id = gameData.$.id;

                tempGame.info = {
                    description: tempDescription,
                    difficult: null,
                    genre: null,
                    mechanics: null
                }
                tempGame.players = {
                    max: parseInt(gameData.maxplayers[0].$.value),
                    min: parseInt(gameData.minplayers[0].$.value)
                }
                tempGame.time = {
                    hours: tempMinutes / 60,
                    minutes: tempMinutes
                }
                tempGame.title = gameData.name[0].$.value

                // Create mongoose model and add to All games array
                allGames.push(new GameModel(tempGame));
            })
        }
    }
    return allGames;
}

function sendGameInfo(data) {

}

// Data is the ID of each game to get
function getAllGames(data, promise) {
    var gamePromises = [];
    for (let i = 0; i < data.length; i++) {
        gamePromises.push(getGame(data[i], MAX_RETRIES, i * 1000));
    }
    console.log("resolving all promises");
    return Promise.all(gamePromises);
}

function getGame(game, maxRetries, wait, promise) {
    return new Promise((resolve, reject) => {
        var gameQuery = GameModel.findOne({
            _id: game
        }, (err, foundGame) => {
            if (foundGame) {
                processData.totalResolved += 1;
                wholeBGXml.push(foundGame);
                resolve(foundGame)
            } else {
                setTimeout(() => {
                    request.get('https://www.boardgamegeek.com/xmlapi2/thing?id=' + game, function(error, response, body) {
                        // if (error) return console.log(error);
                        if (!error && response.statusCode == 200) {
                            processData.totalResolved += 1;
                            console.log('total resolved: ' + processData.totalResolved);
                            processData.wholeBGXml.push(body);
                            resolve(body);
                        } else if (maxRetries > 0) {
                            setTimeout(function() {
                                getGame(game, maxRetries - 1).then((v) => resolve(v)).catch((err) => reject(err));
                            }, 60000)
                        } else {
                            reject('max attempts reached. Error:' + error + 'Body:' + body);
                        }
                    })
                }, wait)
            }
        })

    })
}

function getUser(user, maxRetries) {
    return new Promise((resolve, reject) => {
        console.log("doing request for: " + user);
        request.get('https://www.boardgamegeek.com/xmlapi2/' + 'collection?username=' + user, function(error, response, body) {
            // if (error) return console.log(error);
            if (!error && response.statusCode == 200) {
                processData.wholeXml = body;
                console.log("finished CollectionRequest");
                resolve(body);
            } else if (maxRetries > 0) {
                console.log("retrying.  attemps left:" + maxRetries);
                setTimeout(function() {
                    getUser(user, maxRetries - 1).then((v) => resolve(v)).catch((err) => reject(err));
                }, 2500)
            } else {
                console.log("final failure", arguments);
                reject(arguments);
            }
        })
    });
}


function collectionRequest(type, item) {
    console.log("running");
    return new Promise(function(resolve, reject) {
        console.log("going to get");
        var body;

        request.get('https://www.boardgamegeek.com/xmlapi2/' + type + item, function(error, response, body) {
            // if (error) return console.log(error);
            if (!error && response.statusCode == 200) {
                processData.wholeXml = body;
                console.log("finished CollectionRequest");
                resolve();
            } else {
                reject(arguments);
            }
        })
    })
}

function getIds() {
    // var xml = "<root>Hello xml2js!</root>"
    return new Promise(function(resolve, reject) {
        parseString(processData.wholeXml, function(err, result) {
            //NEED TO PULL OUT IDS HERE
            // console.log(util.inspect(result, false, null))
            for (var i = 0; i < result.items.item.length; i++) {
                processData.idArray.push(result.items.item[i].$.objectid);
            }
            // console.log(result.items.item[0].$.objectid)
            console.log("finished getIds");
            resolve(processData.idArray);
        });
    })
}

function boardgameRequest() {
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < processData.idArray.length; i++) {
            console.log("getting boardgame")
            request.get('https://www.boardgamegeek.com/xmlapi2/thing?id=' + processData.idArray[i],
                function(error, response, body) {
                    // if (error) return console.log(error);
                    if (!error && response.statusCode == 200) {
                        wholeBGXml.push(body);
                    } else {
                        reject(arguments);
                    }
                })
        }
    })
}

function parseGameInfo() {
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


// sets the server to listen at port 3000
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

// Helper Functions
