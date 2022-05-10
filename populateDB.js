#! /usr/bin/env node
var {faker } =require('@faker-js/faker');

console.log('This scripts populatse some test leagues teams and players in my database pass your database as arguemtn in cmd line');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);


var async = require('async');
var Player = require('./models/player')
var Team = require('./models/team')
var League = require('./models/league') 

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var leagues = [];
var teams = [];
var players = [];

//creates a new league and then appends it to the leagues array ^
function leagueCreate(name,teams, cb){
  league_detail = {name: name, teams:teams}
  var league = new League(league_detail);

  league.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New league: ' + league);
    leagues.push(league)
    cb(null, league)
  }  );
}

//create a new team then append it to one of the leagues
function teamCreate(name,players,cb){
  var team = new Team({
    name:name, 
    players: players}
  );
  team.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Team: ' + team);
    teams.push(team)
    cb(null, team)
  }  );
}
//create a new player then append it to one of the teams
function playerCreate(first_name, last_name, birthday, position,cb){
  var player = new Player({
    first_name:first_name,
    last_name: last_name,
    birthday: birthday,
    position:position
  })
  player.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New player: ' + player);
    players.push(player)
    cb(null, player)
  }  );
}

// function create players 

function createPlayers(cb){
  async.parallel([
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'cb',callback)
    },
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'m',callback)
    },
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'lb',callback)
    },
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'rb',callback)
    },
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'lw',callback)
    },
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'st',callback)
    },
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'rb',callback)
    },
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'cb',callback)
    },
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'rw',callback)
    },
    function(callback){
      playerCreate(faker.name.firstName(),faker.name.lastName(),faker.date.between('1990-01-01T00:00:00.000Z', '2001-01-01T00:00:00.000Z'),'st',callback)
    },
    
  ],cb)
}

// creates teams 
function createTeams(cb){
  async.parallel([
    function(callback){
      teamCreate(faker.animal.cat(),[players[0],players[1],players[2],],callback)
    },
    function(callback){
      teamCreate(faker.animal.cat(),[players[3],players[4],players[5],],callback)
    },
    function(callback){
      teamCreate(faker.animal.cat(),[players[6],players[7],players[8],players[9],],callback)
    },
  ],cb)
}

function createLeages(cb){
  async.parallel([
    function(callback){
      leagueCreate('champions league', [teams[0],],callback)
    },
    function(callback){
      leagueCreate('division 2 league', [teams[1],],callback)
    },
    function(callback){
      leagueCreate('division 3 league', [teams[2],],callback)
    },
  ],cb)
}



async.series([
  createPlayers,
  createTeams,
  createLeages,
],
// Optional callback
function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
  else {
      console.log(results);
      
  }
  // All done, disconnect from database
  mongoose.connection.close();
});