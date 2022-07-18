const { v4: uuidv4 } = require("uuid");
const {
  hashPassword,
  verifPassword,
  JWTTokenCreator,
} = require("../services/services");
const models = require("../models");

class UsersController {
  static add = (req, res) => {
    const hashedPassword = hashPassword(req.body.password);
    req.body = {
      ...req.body,
      password: hashedPassword,
      id: uuidv4(),
    };
    const user = req.body;
    models.users
      .insert(user)
      .then(([result]) => {
        res.status(201).send({ ...user, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static session = (req, res) => {
    models.users
      .find(req.body.id)
      .then((resUser) => {
        return resUser[0][0];
      })
      .then((user) => {
        if (verifPassword(req.body.password, user.password)) {
          const token = JWTTokenCreator(user.email, user.pseudo);
          res
            .status(201)
            .cookie("lotobowl_user", token, {
              httpOnly: true,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            })
            .json({
              message: "Le mot de passe est correct",
              cookie: token,
              email: user.email,
              pseudo: user.pseudo,
            });
        } else {
          res.status(401).send("Email ou mot de passe incorect");
        }
      })
      .catch(() => {
        res.status(401).send("Email ou mot de passe incorect");
      });
  };

  /*
  static browse = (req, res) => {
    models.users
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.users
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const users = req.body;

    // TODO validations (length, format...)

    users.id = parseInt(req.params.id, 10);

    models.users
      .update(users)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };



  static delete = (req, res) => {
    models.users
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  */
}

module.exports = UsersController;
