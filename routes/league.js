var express = require('express');
var router = express.Router();

//Require controller modules.
var league_controller = require('../controller/leagueController');
// var team_controller = require('../controller/teamController');
// var player_controller = require('../controller/playerController');

//GET HOME PAGE
router.get('/', league_controller.index)
router.get('/leagues',league_controller.league_list)
router.get('/league/leagues/:id',league_controller.league_detail)


module.exports = router ;