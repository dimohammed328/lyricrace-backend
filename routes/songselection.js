var express = require("express");
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
const passport = require("passport");
var { query } = require("../config/database.js");

module.exports = function() {
  router.post("/songselection", (req, res, next) => {
    db.query(
      "SELECT song,artist FROM songs",
      [req.cookies.sessionID],
      (err, result) => {
        if (err) {
          console.log("Error when selecting user on login", err);
          return next(err);
        }
        if (result.rows.length > 0) {
          req.auth = true;
          req.user = result.rows[0].sess.passport.user;
          return next();
        } else {
          req.auth = false;
          return next();
        }
      }
    );
  });
  return router;
};
