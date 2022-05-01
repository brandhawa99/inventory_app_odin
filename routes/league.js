var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();

//Require controller modules.
var league_controller = require('../controller/leagueController');
// var team_controller = require('../controller/teamController');
// var player_controller = require('../controller/playerController');

//GET HOME PAGE
router.get('/', league_controller.index)

router.post('/leagues/:id/delete', league_controller.league_delete_post)

router.get('/leagues/:id/delete',league_controller.league_delete_get)

router.post('/leagues/create',league_controller.league_create_post)

router.get('/league/create',league_controller.league_create_get)

router.post('/leagues/:id/update',league_controller.league_update_post)

router.get('/leagues/:id/update',league_controller.league_update_get)

router.get('/leagues/:id',league_controller.league_detail)

router.get('/leagues',league_controller.league_list)

module.exports = router ;