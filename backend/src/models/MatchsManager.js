const AbstractManager = require("./AbstractManager");

class MatchsManager extends AbstractManager {
  static table = "matchs";

  insert(match) {
    return this.connection.query(
      `insert into ${this.table} (id, cote_v_equipe_1, cote_v_equipe_2, cote_egalite, equipe1_id, equipe2_id, journee_id) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        match.id,
        match.cote_v_equipe_1,
        match.cote_v_equipe_2,
        match.cote_egalite,
        match.equipe1_id,
        match.equipe2_id,
        match.journee_id,
      ]
    );
  }

  findByJournee(journee) {
    return this.connection.query(
      `SELECT matchs.*, equipe1.nom as equipe1_nom, equipe2.nom as equipe2_nom FROM matchs
      INNER JOIN equipes AS equipe1 ON equipe1.id = matchs.equipe1_id
      INNER JOIN equipes AS equipe2 ON equipe2.id = matchs.equipe2_id
      WHERE matchs.journee_id = ?`,
      [journee]
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

module.exports = MatchsManager;
