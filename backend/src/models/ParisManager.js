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

  browseJourneeUser(parisToShow) {
    return this.connection.query(
      `SELECT paris.*, matchs.*, journees.nom AS nom_journee, journees.numero AS numero_journee, equipe1.nom AS nom_equipe1, equipe1.coach AS coach_equipe1, equipe2.nom AS nom_equipe2, equipe2.coach AS coach_equipe2 FROM paris 
      INNER JOIN matchs ON paris.match_id = matchs.id
      INNER JOIN journees ON journees.id = matchs.journee_id
      INNER JOIN equipes AS equipe1 ON matchs.equipe1_id = equipe1.id
      INNER JOIN equipes AS equipe2 ON matchs.equipe2_id = equipe2.id
      WHERE paris.user_id = ? AND journees.id = ?`,
      [parisToShow.user_id, parisToShow.journee_id]
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
