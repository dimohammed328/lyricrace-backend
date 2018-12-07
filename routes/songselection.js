var express = require("express");
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
const passport = require("passport");
var { query } = require("../config/database.js");

module.exports = function() {
  router.get("/", (req, res, next) => {
    db.query(
      "SELECT song,artist FROM songs",
      [],
      (err, result) => {
        if (err) {
          console.log("Error", err);
          return next(err);
        }
        else{
          res.send(results)
        }

      }
    );
  });
  return router;
};
