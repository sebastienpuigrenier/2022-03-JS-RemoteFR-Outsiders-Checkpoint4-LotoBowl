const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  static table = "users";

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (id, pseudo, email, avatar, password) values (?, ?, ?, ?, ?)`,
      [user.id, user.pseudo, user.email, user.avatar, user.password]
    );
  }

  findByEmail(userEmail) {
    return this.connection.query(
      `select id from ${this.table} where email = ?`,
      [userEmail]
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

module.exports = UsersManager;
