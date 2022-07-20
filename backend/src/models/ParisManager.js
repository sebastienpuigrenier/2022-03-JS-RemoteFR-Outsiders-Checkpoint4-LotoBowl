const AbstractManager = require("./AbstractManager");

class ParisManager extends AbstractManager {
  static table = "paris";

  insert(pari) {
    return this.connection.query(
      `insert into ${this.table} (user_id, match_id, somme, pari_victoire_e1, pari_victoire_e2, pari_egalite) values (?, ?, ?, ?, ?, ? )`,
      [
        pari.user_id,
        pari.match_id,
        pari.somme,
        pari.pari_victoire_e1,
        pari.pari_victoire_e2,
        pari.pari_egalite,
      ]
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

module.exports = ParisManager;
