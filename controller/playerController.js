
var Team = require('../models/team')
var Player = require('../models/player')
const {body, validationResult} = require('express-validator');
var async = require('async');
require('dotenv').config();


exports.player_list = function(req,res,next){
  Player.find()
  .exec(function (err,list_player){
    if(err){return next(err)}
    res.render('player_list',{title: 'Players List', players: list_player})
  })
}

exports.player_detail= function(req,res,next){
  Player.findById(req.params.id)
  .exec(function(err, player){
    if(err){return next(err)}
    res.render('player_detail',{player:player})
  })
}

exports.player_create = function(req,res,next){
  Team.find()
    .exec(function(err,results){
      if(err){return next}
      res.render('player_form',{title:'Create a new Player', teams:results})
    })
}

exports.player_create_post = [
  //validate and sanitize 
  body('first_name').trim().isLength({min:1}).escape().withMessage("First name required.")
    .isAlphanumeric().withMessage("First name has non-alphanumeirc characters."),
  body('last_name').trim().isLength({min:1}).escape().withMessage("Last name required")
    .isAlphanumeric().withMessage("First name has non-alphanumeirc characters."),
  body('teams.*',"Must select a team").equals(undefined).escape(),
    body('date_of_birth','Invalid date of brith').optional({checkFalsy:true}).isISO8601().toDate(),
  body('position').trim().isLength({min:1}).escape().withMessage("Position required").isLength({max:3})
    .withMessage("position field too long")
    .isAlphanumeric().withMessage("Position field has non-alphanumeric characters"),
  body('goals').trim().escape().isNumeric().withMessage('Must be a number'),

  (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      res.render('player_form',{title: 'Create a new player', player: req.body, erors: errors.array()})
    }else{
      var player = new Player({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthday: req.body.date_of_birth,
        position: req.body.position,
        goals: req.body.goals,
      }); 
      console.log(req.body.teams);
      player.save(function(err){
        if(err){return next(err)}
        Team.findByIdAndUpdate(req.body.teams,{$push:{'players':player}},()=>{
          if(err){return next(err)}
          res.redirect(player.url)
        })
      })
    }
  }
]

exports.player_delete_get = function(req,res,next){
  Player.findById(req.params.id)
    .exec(function(err,results){
      if(err){return(next)}
      if(results.player === null){
        res.redirect('/league/players')
      }
      res.render('player_delete', {title: 'Delete Player', player:results})
    })
}

exports.player_delete_post = [
  body('password', 'Admin password required.').trim().equals(process.env.ADMIN_PASS).escape(),
  (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      Player.findById(req.params.id)
        .exec(function(err, results){
          if(err){
            console.log(err)
            return next
          }
          res.render('player_delete', {title: 'Delete Player', player:results})
        })
    }else{
      Player.findByIdAndDelete(req.body.playerid)
        .exec(function(err, results){
          if(err){
            console.log(err)
            return next
          }
          res.redirect('/league/players');
        })
    }
  }
]

exports.player_update_get = function (req, res, next){

  async.parallel({
    player : function(callback){
      Player.findById(req.params.id)
        .exec(callback)
    },

    teams: function(callback){
      Team.find()
        .populate('players')
        .exec(callback)
    },
  }, function(err, results){
      const playerID = results.player._id

      let player_team = undefined
      
      for(let i = 0 ; i<results.teams.length ; i++){
        for(let j = 0; j<results.teams[i].players.length ;j++){
          if(results.teams[i].players[j]._id+"" == playerID+""){
            player_team = results.teams[i];
            break;
          }
        }
      }

      if(err){ return next(err)}
      if(results.player==null){
        var err = new Error('Player not found');
        err.status =404;
        return next(err)
      } 
      if(results.teams==null){
        console.log(results.teams)
        var err = new Error("Team not found");
        err.status = 404;
        return next(err);
      }
      let player_birthday = results.player.birthday.toISOString().split("T")[0]
      res.render('player_form',{title: 'Update Player', teams:results.teams, player: results.player, birthday: player_birthday, player_team: player_team })
  })
}

exports.player_update_post = function (req, res, next){
  res.send('need to implement');
}