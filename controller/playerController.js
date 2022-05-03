

var Player = require('../models/player')

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
  res.send("need to implement")
}

exports.player_create_post = function(req,res,next){
  res.send('need to implement')
}

exports.player_delete_get = function(req,res,next){
  res.send('need to implement')
}

exports.player_delete_post = function(req,res,next){
  res.send('need to implement')
}