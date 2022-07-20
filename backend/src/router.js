const express = require("express");

const {
  UsersController,
  EquipesController,
  JourneesController,
  MatchsController,
  ParisController,
} = require("./controllers");

const router = express.Router();

const {
  /* fileMiddleware, */
  idFromEmailMiddleware,
} = require("./middlewares/middlewares");

router.post("/create_user", UsersController.add);
router.post("/login", idFromEmailMiddleware, UsersController.session);
router.post("/logout", UsersController.logout);

router.get("/browse_team", EquipesController.browse);
router.get("/browse_one_team/:id", EquipesController.browseOne);
router.post("/create_team", EquipesController.add);

router.get("/browse_journee", JourneesController.browse);
router.get("/browse_one_journee/:id", JourneesController.browseOne);
router.post("/create_journee", JourneesController.add);

router.get("/view_match/:id", MatchsController.browsebyid);
router.get("/view_matchs/:journee", MatchsController.browsebyjournee);
router.post("/create_match", MatchsController.add);

router.post("/new_bet", ParisController.add);

module.exports = router;
