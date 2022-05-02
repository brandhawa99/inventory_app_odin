

var Player = require('../models/player')

exports.player_list = function(req,res,next){
  Player.find()
  .exec(function (err,list_player){
    if(err){return next(err)}
    res.render('player_list',{title: 'Players List', players: list_player})
  })
}