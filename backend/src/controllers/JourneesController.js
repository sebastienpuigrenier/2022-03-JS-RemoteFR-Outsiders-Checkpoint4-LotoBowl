const { v4: uuidv4 } = require("uuid");

const models = require("../models");

class JourneesController {
  static add = (req, res) => {
    req.body = {
      ...req.body,
      id: uuidv4(),
      is_closed: 0,
    };
    const journee = req.body;
    models.journees
      .insert(journee)
      .then(([result]) => {
        res.status(201).send({ ...journee, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static browse = (req, res) => {
    models.journees
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static browseOne = (req, res) => {
    const journeeId = req.params.id;
    models.journees
      .find(journeeId)
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static close = (req, res) => {
    const { id } = req.params;
    models.journees
      .close(id)
      .then(([rows]) => {
        res.send(rows);
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

module.exports = JourneesController;
