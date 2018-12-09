var express = require("express");
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
const passport = require("passport");
var { query } = require("../config/database.js");

module.exports = function() {
  router.get("/", (req, res, next) => {
    query(
      `SELECT users.username, songs.title, scores.timesec, songid FROM scores JOIN users ON users.id=scores.userid JOIN songs ON scores.songid=songs.id where ${
        req.params.id
      }=songid ORDER BY scores.timesec DESC`,
      [],
      (err, result) => {
        if (err) {
          console.log("Error", err);
          return next(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  return router;
};
