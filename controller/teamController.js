var Team = require('../models/team')
var League = require('../models/league')
const {body, validationResult} = require('express-validator');
require('dotenv').config();

exports.team_list = function(req,res,next){
  Team.find()
  .exec(function (err,list_team){
    if(err){return next(err)}
    res.render('team_list',{title: 'Teams List', teams: list_team})
  })
}


exports.team_detail = function (req,res,next){
  Team.findById(req.params.id)
  .populate('players')
  .exec(function(err, team_details){
    if(err){return next(err)}
    res.render('team_detail', {title: team_details.name, players: team_details.players, team:team_details})
  })
}

exports.team_create = function(req,res,next){
  League.find()
    .exec(function(err,results){
      if(err){return next(err)}

      res.render('team_form',{title:'Create Team', leagues:results})
    })
}

exports.team_create_post = [

]

exports.team_delete_get = function(req,res,next){
  res.send('need to implmenet')
}

exports.team_delete_post= function (req,res,next){
  res.send('need to implement');
}

exports.team_update_get = function(req,res,next){
  res.send('need to implement')
}

exports.team_update_post = function(req,res,next){
  res.send("need to implement");
}