var db = require("../config/database");

// fetch the list of users
const listUsers = async () => {
  const user_level_1 = db.query("SELECT * FROM users")
  const user_level_2 = db.query("SELECT * FROM users where id = ?", [1])
  const result = await Promise.all([user_level_1, user_level_2])
  return result;
};

exports.listUsers = listUsers;
