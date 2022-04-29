#! /usr/bin/env node
import {faker} from '@faker-js/faker'

console.log('This scripts populatse some test leagues teams and players in my database pass your database as arguemtn in cmd line');

//Get arguments passed on command line
var userArgs = process.argv


var async = require('async');
var Player = require('./models/player')
var Team = require('./models/team')
var League = require('./models/league') 

var mongoose = require('mongoose');
var mongoDB = userArgs[0]
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology:true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB conection error:"));

var leagues = [];
var teams = [];
var players = [];

//creates a new league and then appends it to the leagues array ^
function leagueCreate(name){
  league_detail = {name: name}
  var league = new League(league_detail);

  league.save(function(err){
    if(err){
      cb(err,null)
      return
    }
    console.log('New League:' + league)
    leagues.push(league)
  })
}

//create a new team then append it to one of the leagues
function teamCreate(name,cb){
  var team = new Team({name:name});

  team.save(function(err){
    if(err){
      cb(err,null);
      return
    }
    console.log('New Team: '+team)
    teams.push(team);
    cb(null,team);
  })
}

//create a new player then append it to one of the teams

function playerCreate(first_name, last_name, )