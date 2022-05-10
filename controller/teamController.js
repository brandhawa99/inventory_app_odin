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
  //sanitize
  body('name').trim().isLength({min:1}).escape().withMessage("First name required.")
    .isAlphanumeric().withMessage("First name has non-alphanumeirc characters."),
  body('leagues.*',"Must select a League").equals(undefined).escape(),
  body('wins').trim().escape().isNumeric().withMessage('Must be a number'),
  body('losses').trim().escape().isNumeric().withMessage('Must be a number'),

  (req,res,next) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
      res.render('team_form',{title: 'Create Team', team: req.body, erors: errors.array()})
    }else{
      var team = new Team({
        name: req.body.name,
        players:[],
        wins: req.body.wins,
        loss: req.body.losses,

      })
      team.save(function(err){
        if(err){return next(err)}
        League.findByIdAndUpdate(req.body.leagues,{$push:{'teams':team}},()=>{
          if(err){return next(err)}
          res.redirect(team.url);
        })
      })

    }

  }

]

exports.team_delete_get = function(req,res,next){
  Team.findById(req.params.id)
    .exec(function(err,results){
      if(err){return next(err)}
      res.render('team_delete',{title: "Delete this team",team:results})
    })
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