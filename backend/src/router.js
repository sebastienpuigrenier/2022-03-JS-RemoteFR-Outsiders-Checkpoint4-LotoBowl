const express = require("express");

const {
  UsersController,
  EquipesController,
  JourneesController,
  MatchsController,
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
router.post("/create_team", EquipesController.add);

router.post("/create_journee", JourneesController.add);

router.get("/view_match/:journee", MatchsController.browsebyjournee);
router.post("/create_match", MatchsController.add);

module.exports = router;
