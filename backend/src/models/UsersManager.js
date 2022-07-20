const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  static table = "users";
/* eslint-disable */
  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (id, pseudo, email, avatar, password, isadmin) values (?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        user.pseudo,
        user.email,
        user.avatar,
        user.password,
        user.isadmin,
      ]
    );
  }

  findByEmail(user) {
    return this.connection.query(
      `SELECT * from users WHERE email = ?`,
      user
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
 /* eslint-enable */
}

module.exports = UsersManager;
