const models = require("../models");

class ParisController {
  static add = (req, res) => {
    const pari = {
      ...req.body,
      user_id: req.body.id,
    };
    models.paris
      .insert(pari)
      .then(([result]) => {
        res.status(201).send({ ...pari, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  /*
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

module.exports = ParisController;
