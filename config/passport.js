var LocalStrategy = require("passport-local").Strategy;
var query = require("./database.js");
var bcrypt = require("bcrypt-nodejs");

module.exports = passport => {
  passport.use(
    "local-login",
    new LocalStrategy((username, password, cb) => {
      query(
        "SELECT id, username, password FROM users WHERE username=$1",
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
                  username: first.username
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
  passport.use(
    "local-signup",
    new LocalStrategy((username, password, cb) => {
      query(
        "SELECT * FROM users where username=$1",
        [username],
        (err, result) => {
          if (err) {
            cb(err, false, { message: "Error searching database." });
          }
          if (result.rowCount > 0) {
            cb(null, false, { message: "Username already exists." });
          } else {
            var hash = bcrypt.hashSync(password);
            query(
              "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;",
              [username, hash],
              (err, response) => {
                if (err) {
                  cb(err, false, { message: "Error adding user." });
                } else {
                  cb(
                    null,
                    {
                      username: response.rows[0].username,
                      id: response.rows[0].id
                    },
                    { message: "Successfully added user." }
                  );
                }
              }
            );
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
      "SELECT id, username FROM users WHERE id = $1",
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
