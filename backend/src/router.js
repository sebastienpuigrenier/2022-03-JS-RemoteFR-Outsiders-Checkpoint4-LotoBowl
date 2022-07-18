const express = require("express");

const {
  ItemController,
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

router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

router.post("/create_user", UsersController.add);
router.post("/login", idFromEmailMiddleware, UsersController.session);

router.post("/create_team", EquipesController.add);

router.post("/create_journee", JourneesController.add);

router.get("/view_match/:journee", MatchsController.browse);
router.post("/create_match", MatchsController.add);

module.exports = router;
