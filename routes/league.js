var express = require('express');
var router = express.Router();

//Require controller modules.
var league_controller = require('../controller/leagueController');
// var team_controller = require('../controller/teamController');
// var player_controller = require('../controller/playerController');

//GET HOME PAGE
router.get('/', league_controller.index)


module.exports = router ;