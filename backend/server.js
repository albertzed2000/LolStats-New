'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var cors = require('cors');
var axios = require("axios")
require('dotenv').config();
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 
var Schema = mongoose.Schema;
// ES modules
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Basic Configuration 
var port = process.env.PORT || 5000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});



// create scheme representing the data in a single match
// includes player items, kda, game type, champion, game duration, when they played, summoner spells, region
var matchSchema = new Schema({
  "region": {type: String, required: true},
  "userName": {type: String, required: true},
  "matchId": {type: Number, required: true},
  "champion": {type: String, required: true},
  "time": {type: Number, required: true},
  "duration": {type: String, required: true},
  "queueId": {type: Number, required: true},
  "mapId": {type: Number, required: true},
  "win": {type: Boolean, required: true},
  "kills": {type: Number, required: true},
  "deaths": {type: Number, required: true},
  "assists": {type: Number, required: true},
  "item0": {type: Number, required: true},
  "item1": {type: Number, required: true},
  "item2": {type: Number, required: true},
  "item3": {type: Number, required: true},
  "item4": {type: Number, required: true},
  "item5": {type: Number, required: true},
  "item6": {type: Number, required: true},
  "spell2Id": {type: Number, required: true},
  "spell1Id": {type: Number, required: true},
});

//create models based on schema
const User = mongoose.model("Uzer", userSchema);
const Match = mongoose.model("Match", matchSchema);


//add a new match w/matchdata to database
app.post("/matches/new/", function(req, res){
  
  // loop over list of matches, and save each to database

  for(let i = 0; i < req.body["matches"].length; i++){

    //create a new match object
    let newMatch = {
      "region": req.body["matches"][i]["region"],
      "userName": req.body["matches"][i]["userName"],
      "matchId": req.body["matches"][i]["matchId"],
      "champion": req.body["matches"][i]["champion"],
      "time": req.body["matches"][i]["time"],
      "duration": req.body["matches"][i]["duration"],
      "queueId": req.body["matches"][i]["queueId"],
      "mapId": req.body["matches"][i]["mapId"],
      "win": req.body["matches"][i]["win"],
      "kills": req.body["matches"][i]["kills"],
      "deaths": req.body["matches"][i]["deaths"],
      "assists": req.body["matches"][i]["assists"],
      "item0": req.body["matches"][i]["item0"],
      "item1": req.body["matches"][i]["item1"],
      "item2": req.body["matches"][i]["item2"],
      "item3": req.body["matches"][i]["item3"],
      "item4": req.body["matches"][i]["item4"],
      "item5": req.body["matches"][i]["item5"],
      "item6": req.body["matches"][i]["item6"],
      "spell2Id": req.body["matches"][i]["spell2Id"],
      "spell1Id": req.body["matches"][i]["spell1Id"],
    }
  
    newMatch.save()
    .then(() => console.log(newMatch["matchId"].toString() + ' match added'))
    .catch(err => res.status(400).json('Error: ' + err))
  }


})

//given a list of match ids and player's username, 
//look for these matches in database and return their data
app.get("/matches/find/byUser/:user/:match", function(req, res){
  let matches = Match.find({"userName": req.params.user, "matchId": {$gte: req.params.match}})
  .catch(err => res.status(400).json('Error: ' + err));

  res.json({"matches": matches})

})


app.listen(port, function () {
  console.log('Node.js listening ...');
});