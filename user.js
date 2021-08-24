var db = require("./database");

// Set up User class
var User = function (user) {
  var that = Object.create(User.prototype);

  that.id = user.id;
  that.email = user.email;
  that.password = user.password;

  return that;
};

// List all users
// callback(err, users)
const listUsers = function () {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", [], function (err, rows) {
      if (err) return reject(err);

      return resolve(rows);
    });
  });
};

exports.listUsers = listUsers;
