var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();

//Require controller modules.
var league_controller = require('../controller/leagueController');
var team_controller = require('../controller/teamController');
var player_controller = require('../controller/playerController');

//GET HOME PAGE
router.get('/', league_controller.index)


//GET and POST REQUESTS FOR LEAGUE
router.post('/leagues/:id/delete', league_controller.league_delete_post)

router.get('/leagues/:id/delete',league_controller.league_delete_get)

router.post('/leagues/create',league_controller.league_create_post)

router.get('/league/create',league_controller.league_create_get)

router.post('/leagues/:id/update',league_controller.league_update_post)

router.get('/leagues/:id/update',league_controller.league_update_get)

router.get('/leagues/:id',league_controller.league_detail)

router.get('/leagues',league_controller.league_list)

//GET AND POST REQUESTS FOR TEAMS
router.get('/teams',team_controller.team_list)

//GET AND POST REQUESTS FOR PLAYERS
router.get('/players',player_controller.player_list)


module.exports = router ;