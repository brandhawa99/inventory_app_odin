var League = require('../models/league');
var Player = require('../models/player');
var Team = require('../models/team');
const {body, validationResult} = require('express-validator');

var async = require('async');

exports.index = function(req,res){
  async.parallel({
    leagues : function(callback){
      League.countDocuments({}, callback)
    },
    players : function(callback){
      Player.countDocuments({}, callback);
    },
    teams : function(callback){
      Team.countDocuments({}, callback);
    }
  },  
    function(err, results){
      res.render('index', {title: 'Coolest Soccer Leagues Home', error: err, data: results})
    }
  )

}


exports.league_list = function(req,res,next){
  League.find()
  .sort({name:1})
  .exec(function(err,list_league){
    if(err){return next(err);}
    res.render('league_list',{title: 'Leagues List', leagues: list_league})
  })
};  

exports.league_detail = function(req,res,next){
  console.log(req.params.id)
  League.findById(req.params.id)
  .populate('teams')
  .exec(function( err, results){
    if(err){return next(err)}
    res.render('league_detail',{title: results.name, teams: results.teams, league: results})
  })
}

exports.league_create_post = [
  //validate and sanitize the name field
  body('name', "League name required").trim().isLength({min:1}).escape(),
  //process request after validation and sanitization
  (req,res,next)=>{
    //Extract the validation errors from a request
    const errors = validationResult(req);
    // create a league object with escaped and trimmed data

    var league = new League(
      {name: req.body.name}
    );
    
    if(!errors.isEmpty()){
      //There are erros. Render the form again with sanitized data values/error messages.
      res.render('league_form',{title:'Create New League', league: league,errors: errors.array()})
      return;
    }
    else{
      //Data from from is valid 
      //check if genre with same name already exists
      League.findOne({'name': req.body.name})
        .exec(function(err, found_league){
          if(err){return next(err)}
          if(found_league){
            res.redirect(found_league.url)
          }else{
            league.save(function(err){
              if(err) {return next(err)}
              res.redirect(league.url);
            })
          }
        })
    }
  }

]

exports.league_create_get = function(req,res, next){
  res.render('league_form',{title: 'Create New League'})
}

exports.league_delete_get = function(req,res,next){
  League.findById(req.params.id)
  .exec(function(err,result){
    if(err){return next(err)}
    res.render('league_delete',{title:'Delete this league', league: result})
  })
}

exports.league_delete_post = function(req,res, next){
  res.send('Need to be completed')
}

exports.league_update_get = function(req,res, next){
  res.send('Need to be completed')
}

exports.league_update_post = function(req,res, next){
  res.send('Need to be completed')
}