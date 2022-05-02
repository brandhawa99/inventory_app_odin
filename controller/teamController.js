var Team = require('../models/team')

exports.team_list = function(req,res,next){
  Team.find()
  .exec(function (err,list_team){
    if(err){return next(err)}
    res.render('team_list',{title: 'Teams List', teams: list_team})
  })
}