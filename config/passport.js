var LocalStrategy = require("passport-local").Strategy;
var db = require("./database.js");
var bcrypt = require("bcrypt-nodejs");

module.exports = passport => {
  passport.use(
    new LocalStrategy((username, password, cb) => {
<<<<<<< HEAD
      query(
=======
      db.query(
>>>>>>> parent of d309126... authorization successful
        "SELECT id, username, password, type FROM users WHERE username=$1",
        [username],
        (err, result) => {
          if (err) {
            console.log("Error when selecting user on login", err);
            return cb(err);
          }

          if (result.rows.length > 0) {
            const first = result.rows[0];
            bcrypt.compare(password, first.password, function(err, res) {
              if (res) {
                cb(null, {
                  id: first.id,
                  username: first.username,
                  type: first.type
                });
              } else {
                cb(null, false);
              }
            });
          } else {
            cb(null, false);
          }
        }
      );
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    db.query(
      "SELECT id, username, type FROM users WHERE id = $1",
      [parseInt(id, 10)],
      (err, results) => {
        if (err) {
          console.log("Error when selecting user on session deserialize", err);
          return cb(err);
        }

        cb(null, results.rows[0]);
      }
    );
  });
};
