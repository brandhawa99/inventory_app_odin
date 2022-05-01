var League = require('../models/league');
var Player = require('../models/player');
var Team = require('../models/team');

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
  .exec(function(err,list_league){
    if(err){return next(err);}
    res.render('league_list',{title: 'Leagues List', leagues: list_league})
  })
};  

exports.league_detail = function(req,res,next){
  res.send('Todo implement detail page')
}