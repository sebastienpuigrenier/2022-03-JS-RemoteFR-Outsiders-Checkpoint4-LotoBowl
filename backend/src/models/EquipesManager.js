const AbstractManager = require("./AbstractManager");

class EquipesManager extends AbstractManager {
  static table = "equipes";

  insert(equipe) {
    return this.connection.query(
      `insert into ${this.table} (id, nom, coach, cote_depart, cote_actuelle, race) values (?, ?, ?, ?, ?, ?)`,
      [
        equipe.id,
        equipe.nom,
        equipe.coach,
        equipe.cote_depart,
        equipe.cote_depart,
        equipe.race,
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

module.exports = EquipesManager;
