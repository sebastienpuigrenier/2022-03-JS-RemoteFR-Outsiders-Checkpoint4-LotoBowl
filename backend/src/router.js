const express = require("express");

const { ItemController, UsersController } = require("./controllers");

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

module.exports = router;
