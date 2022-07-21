const AbstractManager = require("./AbstractManager");

class JourneesManager extends AbstractManager {
  static table = "journees";

  insert(journee) {
    return this.connection.query(
      `insert into ${this.table} (id, numero, is_closed, nom) values (?, ?, ?, ?)`,
      /* eslint-disable */
      [journee.id, journee.numero, journee.is_closed, journee.nom]
      /* eslint-enable */
    );
  }

  close(journeeId) {
    return this.connection.query(
      `UPDATE ${this.table} SET is_closed = 1
       WHERE id = ?`,
      journeeId
    );
  }

  /*
  update(item) {
    return this.connection.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
  */
}

module.exports = JourneesManager;
